import React from "react";
import Layout from "../../layout";
import { Box } from "@mantine/core";
import ProfileForm from "../../forms/ProfileForm";

const ProfilePage = () => {
  return (
    <Layout>
      <Box h={400} bg={"dark.7"}></Box>
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
        <ProfileForm />
      </Box>
    </Layout>
  );
};

export default ProfilePage;
