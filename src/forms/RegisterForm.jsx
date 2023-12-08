import {
  Title,
  Box,
  Text,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { useAppContext } from "../AppContext";
const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false);
  const { loginReducer } = useAppContext();
  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      fullName: (value) =>
        value.length < 3 ? "Name should include at least 3 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6
          ? "Password should include at least 6 characters"
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      setIsPending(true);
      const { fullName, email, password } = values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = await userCredential.user;

      // update user display name
      await updateProfile(user, {
        displayName: fullName,
      });
      // save user to firestore
      const usersCollection = collection(db, "users");

      const createdAt = serverTimestamp();
      await setDoc(doc(usersCollection, user.uid), {
        fullName,
        email,
        createdAt,
        role: "user",
      });

      toast.success("Account created successfully");

      // save user to localStorage
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const args = {
          ...userDoc.data(),
          id: user.uid,
        };
        localStorage.setItem("user", JSON.stringify(args));
        loginReducer(args);
      }

      setIsPending(false);
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };
  return (
    <form noValidate onSubmit={form.onSubmit(handleSubmit)}>
      <Title order={3} ta="center" mb="md">
        Create an account
      </Title>
      <Text ta="center" mb={"md"}>
        Complete the form below to create an account
      </Text>

      <TextInput
        {...form.getInputProps("fullName")}
        label="Full Name"
        withAsterisk
        mb="md"
      />

      <TextInput
        type="email"
        {...form.getInputProps("email")}
        label="Email"
        withAsterisk
        mb="md"
        description="We'll never share your email with anyone else."
      />

      <PasswordInput
        {...form.getInputProps("password")}
        label="Password"
        withAsterisk
        mb="md"
        description="Must include at least 6 characters"
      />

      <PasswordInput
        {...form.getInputProps("confirmPassword")}
        label="Confirm Password"
        withAsterisk
        mb="md"
        description="Must include at least 6 characters, same as password"
      />

      <Button
        loading={isPending}
        disabled={isPending}
        fullWidth
        type="submit"
        onClick={form.onSubmit(handleSubmit)}
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
