import { Button } from "@mantine/core";
import React from "react";
import { IoLogoGoogle } from "react-icons/io5";

const GoogleAuthProvider = () => {
  return (
    <Button color="red.9" leftSection={<IoLogoGoogle />}>
      Sign in with Google
    </Button>
  );
};

export default GoogleAuthProvider;
