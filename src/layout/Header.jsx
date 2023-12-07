import { Box, Button, Container, Flex, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Container h={60} size="xl" component="header">
      <Flex align="center" justify="space-between">
        <Text
          component={Link}
          to="/"
          fw="bold"
          style={{ fontSize: 24, color: "var(--mantine-color-dark-9)" }}
        >
          Real-Estate
        </Text>

        <Flex align={"center"} gap="md">
          <Text component={Link} to="/">
            Home
          </Text>
          <Text component={Link} to="/about">
            About
          </Text>

          <Button component={Link} to="/login">Login</Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
