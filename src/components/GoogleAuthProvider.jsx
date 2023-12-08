import { Button } from "@mantine/core";
import React from "react";
import { IoLogoGoogle } from "react-icons/io5";
import {
  GoogleAuthProvider as GoogleProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

const GoogleAuthProvider = () => {
  const onAuth = async () => {
    const provider = new GoogleProvider();

    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        // check if user exists
        let userRef = await getDoc(doc(db, "users", user.uid));

        if (!userRef.exists()) {
          // save user to firestore
          const usersCollection = collection(db, "users");
          await setDoc(doc(usersCollection, user.uid), {
            fullName: user.displayName,
            email: user.email,
            createdAt: serverTimestamp(),
          });
          toast.success("Account created successfully");
        } else {
          toast.success("Logged in successfully");
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const args = {
            ...userDoc.data(),
            id: user.uid,
          };
          localStorage.setItem("user", JSON.stringify(args));
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error(errorMessage);
      });
  };
  return (
    <Button
      type="button"
      onClick={onAuth}
      color="red.9"
      leftSection={<IoLogoGoogle />}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleAuthProvider;
