import React from "react";
import Layout from "../../layout";
import { Box, Button, Container, Flex, Grid, Text, Title } from "@mantine/core";
import ProfileForm from "../../forms/ProfileForm";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import DataCard from "../../components/DataCard";

const ProfilePage = () => {
  return (
    <Layout>
      <PageHeader title="Profile" description="Update your profile" />
      <Grid columns={12}>
        <Grid.Col span={6} px="xl">
          <ProfileForm />
        </Grid.Col>

        <Grid.Col span={6} px={"xl"}>
          <Flex gap="md">
            <DataCard
              label="Properties"
              description="Total properties"
              value="0"
            />

            <DataCard
              label="Customers"
              description="Total customers"
              value="0"
            />
          </Flex>
        </Grid.Col>
      </Grid>
    </Layout>
  );
};

export default ProfilePage;
