import { createTheme } from "@mantine/core";

const theme = createTheme({
  colors: {
    primary: [
      "#ebefff",
      "#d5dafc",
      "#a9b1f1",
      "#7b87e9",
      "#5362e1",
      "#3a4bdd",
      "#2d3fdc",
      "#1f32c4",
      "#182cb0",
      "#0b259c",
    ],
  },
  components: {
    Button: {
      defaultProps: {
        color: "primary.9",
        radius: "2px",
      },
    },

    TextInput: {
      defaultProps: {
        radius: "2px",
      },
    },

    PasswordInput: {
      defaultProps: {
        radius: "2px",
      },
    },

    Checkbox: {
      defaultProps: {
        color: "primary.9",
      },
    },
  },
});

export default theme;
