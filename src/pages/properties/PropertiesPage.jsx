import React from "react";
import Layout from "../../layout";
import PageHeader from "../../components/PageHeader";
import { Button, Container, Flex, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const PropertiesPage = () => {
  return (
    <Layout>
      <PageHeader
        title="Properties"
        description="Discover new properties, add new properties"
      />

      <Container size="xl">
        <Flex justify="flex-end">
          <Button component={Link} to="/new-property">
            Add new property
          </Button>
        </Flex>
      </Container>
    </Layout>
  );
};

export default PropertiesPage;
