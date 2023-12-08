import { Button, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
const ResetPasswordRequestForm = () => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    try {
      setIsPending(true);
      const { email } = values;
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent successfully");
      setIsPending(false);
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };
  return (
    <form noValidate onSubmit={form.onSubmit(handleSubmit)}>
      <Title order={3} ta="center" mb="md">
        Reset Password
      </Title>
      <Text ta="center" mb={"md"}>
        Enter your email and we will send you a link to reset your password
      </Text>

      <TextInput
        label="Email"
        placeholder="Email"
        withAsterisk
        description="We'll never share your email."
        type="email"
        mb="md"
        {...form.getInputProps("email")}
      />

      <Button loading={isPending} fullWidth type="submit">
        Submit
      </Button>

      <Button component={Link} to="/auth" variant="outline" fullWidth mt="md">
        Back to Login
      </Button>
    </form>
  );
};

export default ResetPasswordRequestForm;
