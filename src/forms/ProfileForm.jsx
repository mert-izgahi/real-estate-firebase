import { Button, Text, TextInput, Title } from "@mantine/core";
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
    },

    validate: {
      fullName: (value) =>
        value.length < 3 ? "Name should include at least 3 characters" : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      setIsPending(true);
      const { fullName } = values;

      const userDoc = await getDoc(doc(db, "users", user.id));

      if (userDoc.exists()) {
        const args = {
          ...userDoc.data(),
          id: user.id,
          fullName,
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
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Title order={3} ta="center" mb="md">
        Profile
      </Title>
      <Text ta="center" mb={"md"}>
        Update your profile
      </Text>
      <TextInput
        label="Full Name"
        description="Your full name"
        type="text"
        placeholder="Full Name"
        withAsterisk
        mb="md"
        {...form.getInputProps("fullName")}
      />
      <Button loading={isPending} type="submit" fullWidth>
        Update
      </Button>
    </form>
  );
};

export default ProfileForm;
