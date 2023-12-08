import React from "react";
import Layout from "../../layout";
import { Box, Container, Grid, Title } from "@mantine/core";
import PropertyForm from "../../forms/PropertyForm";
import PageHeader from "../../components/PageHeader";

const NewPropertyPage = () => {
  
  return (
    <Layout>
      <PageHeader title={"Properties"} description={"Add a new property"} />
      <Grid>
        <Grid.Col span={6} px={"md"} py={"xl"} mx={"auto"}>
          <PropertyForm />
        </Grid.Col>
      </Grid>
    </Layout>
  );
};

export default NewPropertyPage;
