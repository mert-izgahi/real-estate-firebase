import React, { useEffect } from "react";
import Layout from "../layout";
import {
  AspectRatio,
  Box,
  Checkbox,
  Grid,
  Image,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import authImage from "../assets/auth-image.jpg";
import LoginForm from "../forms/LoginForm";
import { useToggle } from "@mantine/hooks";
import RegisterForm from "../forms/RegisterForm";
import GoogleAuthProvider from "../components/GoogleAuthProvider";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";

const AuthPage = () => {
  const [isMember, toggle] = useToggle([true, false]);
  const { isAuthenticated, isLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated]);

  return (
    <Layout>
      <Grid>
        <Grid.Col span={8}>
          <Image src={authImage} h="90vh" w="100%" alt="auth image" fit="cover"  />
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack px="md" py="xl">
            {isMember && <LoginForm />}
            {!isMember && <RegisterForm />}
            <GoogleAuthProvider />
            <Checkbox
              label={isMember ? "Not a member yet?" : "Already a member?"}
              checked={isMember}
              onChange={toggle}
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </Layout>
  );
};

export default AuthPage;
