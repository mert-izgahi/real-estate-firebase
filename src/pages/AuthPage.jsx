import React, { useEffect } from "react";
import Layout from "../layout";
import {
  AspectRatio,
  Box,
  Checkbox,
  Image,
} from "@mantine/core";
import authImage from "../assets/auth-image.jpg";
import LoginForm from "../forms/LoginForm";
import { useToggle } from "@mantine/hooks";
import RegisterForm from "../forms/RegisterForm";
import GoogleAuthProvider from "../components/GoogleAuthProvider";
import { useNavigate } from "react-router-dom";
const AuthPage = () => {
  const [isMember, toggle] = useToggle([true, false]);
  const navigate = useNavigate();

  useEffect(() => {
    
  })

  return (
    <Layout>
      <AspectRatio h={400} ratio={16 / 9}>
        <Image
          src={authImage}
          alt="auth-img"
          fallbackSrc="https://via.placeholder.com/400?text=Image+Not+Found"
        />
      </AspectRatio>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          backgroundColor: "var(--mantine-color-gray-1)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "var(--mantine-spacing-md)",
          boxShadow: "2px 2px 0px 0px var(--mantine-color-primary-9)",
        }}
      >
        {isMember && <LoginForm />}
        {!isMember && <RegisterForm />}

        <GoogleAuthProvider />

        <Checkbox
          label={isMember ? "Not a member yet?" : "Already a member?"}
          checked={isMember}
          onChange={toggle}
        />
      </Box>
    </Layout>
  );
};

export default AuthPage;
