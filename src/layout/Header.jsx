import { Button, Container, Flex, Text } from "@mantine/core";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppContext } from "../AppContext";

const Header = () => {
  const { isAuthenticated, logoutReducer, isLoading } = useAppContext();

  const onLogout = () => {
    logoutReducer();
    localStorage.removeItem("user");
  };
  return (
    <Container h={60} size="xl" component="header">
      <Flex align="center" justify="space-between">
        <Text component={Link} to="/" fw="bold" className="brand">
          Real-Estate
        </Text>

        <Flex align={"center"} gap="md" h={60}>
          <Text component={NavLink} to="/" className="nav-link">
            Home
          </Text>
          <Text component={NavLink} to="/about" className="nav-link">
            About
          </Text>

          {!isAuthenticated && (
            <Button component={Link} to="/auth">
              Login
            </Button>
          )}

          {isAuthenticated && (
            <>
              <Text component={NavLink} to="/properties" className="nav-link">
                Properties
              </Text>
              <Text component={NavLink} to="/profile" className="nav-link">
                Profile
              </Text>

              <Button variant="outline" loading={isLoading} onClick={onLogout}>
                Logout
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
