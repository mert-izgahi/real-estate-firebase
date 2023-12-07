import {
  Title,
  Box,
  Text,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

const RegisterForm = () => {
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

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Box component="form">
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

      <Button fullWidth type="submit" onClick={form.onSubmit(handleSubmit)}>
        Create Account
      </Button>
    </Box>
  );
};

export default RegisterForm;
