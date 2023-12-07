import { AppShell } from "@mantine/core";
import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import theme from "../theme";
import Footer from "./Footer";
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <MantineProvider
      defaultColorScheme="light"
      theme={theme}
      withGlobalStyles
      withNormalizeCSS
    >
      <AppShell header={{ height: 60 }} navbar={{}}>
        <AppShell.Header withBorder={false} py="md">
          <Header />
        </AppShell.Header>
        <AppShell.Main>{children}</AppShell.Main>
        <AppShell.Footer withBorder={false} py="md">
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
};

export default Layout;
