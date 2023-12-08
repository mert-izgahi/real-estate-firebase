import { AppShell } from "@mantine/core";
import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import theme from "../theme";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Toaster position="top-center" />
      <AppShell header={{ height: 60 }} navbar={{}}>
        <AppShell.Header withBorder={false}>
          <Header />
        </AppShell.Header>
        <AppShell.Main>{children}</AppShell.Main>
        <AppShell.Footer withBorder={false}>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
};

export default Layout;
