import { Box, Text, Title } from "@mantine/core";
import React from "react";

const DataCard = ({ label, description, value, ...props }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--mantine-color-gray-1)",
        maxWidth: "300px",
        width: "100%",
      }}
      px="md"
      py="sm"
    >
      <Title order={3}>{label}</Title>
      <Text>{description}</Text>
      <Text>{value}</Text>
    </Box>
  );
};

export default DataCard;
