import { Button, Text, TextInput, Textarea, Title } from "@mantine/core";
import React, { useState } from "react";
import { useAppContext } from "../AppContext";
import { useForm } from "@mantine/form";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const ProfileForm = () => {
  const [isPending, setIsPending] = useState(false);
  const { user } = useAppContext();
  const form = useForm({
    initialValues: {
      fullName: user?.fullName,
      about: user.about || "",
      address: "",
    },

    validate: {
      fullName: (value) =>
        value.length < 3 ? "Name should include at least 3 characters" : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      setIsPending(true);
      const { fullName, about } = values;

      const userDoc = await getDoc(doc(db, "users", user.id));

      if (userDoc.exists()) {
        const args = {
          ...userDoc.data(),
          id: user.id,
          fullName,
          about,
          address
        };
        localStorage.setItem("user", JSON.stringify(args));
        updateProfile(user, {
          displayName: fullName,
        });

        await setDoc(doc(db, "users", user.id), {
          ...args,
          updatedAt: serverTimestamp(),
        });
        toast.success("Profile updated successfully");
        setIsPending(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };
  return (
    <form noValidate onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Full Name"
        description="Your full name"
        type="text"
        placeholder="Full Name"
        withAsterisk
        mb="md"
        {...form.getInputProps("fullName")}
      />
      <Textarea label="About" {...form.getInputProps("about")} mb="md" />
      <TextInput label="Address" {...form.getInputProps("address")} mb="md" />
      <Button loading={isPending} type="submit" fullWidth>
        Update
      </Button>
    </form>
  );
};

export default ProfileForm;
