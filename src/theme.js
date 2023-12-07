import { createTheme } from "@mantine/core";

const theme = createTheme({
  components: {
    Button: {
      defaultProps: {
        color: "dark",
      },
    },
  },
});


export default theme;