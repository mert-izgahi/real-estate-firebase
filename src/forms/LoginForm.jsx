import {
  Title,
  Box,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Flex,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;

      setIsPending(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const args = {
          ...userDoc.data(),
          id: user.uid,
        };
        localStorage.setItem("user", JSON.stringify(args));
      }

      toast.success("Logged in successfully");

      setIsPending(false);
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };
  return (
    <Box component="form">
      <Title order={3} ta="center" mb="md">
        Login to your account
      </Title>
      <Text ta="center" mb={"md"}>
        Complete the form below to login to your account
      </Text>

      <TextInput
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

      <Flex align="center" justify="flex-end" mb="md">
        <Anchor href="#">Forgot password?</Anchor>
      </Flex>

      <Button
        loading={isPending}
        fullWidth
        type="submit"
        onClick={form.onSubmit(handleSubmit)}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
