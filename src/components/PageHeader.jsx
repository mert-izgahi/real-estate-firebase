import { Box, Container, Flex, Text, Title } from "@mantine/core";
import React from "react";

const PageHeader = ({ title, description }) => {
  return (
    <Box bg="gray.1">
      <Container size="xl">
        <Flex
          direction="column"
          justify="flex-start"
          align="flex-start"
          p="xl"
          mb="xl"
        >
          <Title mb="md">{title}</Title>
          <Text>{description}</Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default PageHeader;
