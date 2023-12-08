import React from "react";
import Layout from "../layout";
import {  Grid, Image, Stack } from "@mantine/core";
import img from "../assets/reser-pass.png";
import ResetPasswordRequestForm from "../forms/ResetPasswordRequestForm";
const ResetPasswordPage = () => {
  return (
    <Layout>
      <Grid>
        <Grid.Col span={8}>
          <Image
            src={img}
            h="90vh"
            w="100%"
            alt="auth image"
            fit="cover"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack px="md" py="xl">
            <ResetPasswordRequestForm />
          </Stack>
        </Grid.Col>
      </Grid>
    </Layout>
  );
};

export default ResetPasswordPage;
