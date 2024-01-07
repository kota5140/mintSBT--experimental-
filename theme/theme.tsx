import { createTheme } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[900],
    },
    action: {
      hover: deepPurple[100], // ホバー時の色
      active: deepPurple[300], // クリック時の色
    },
    background: {
      default: deepPurple[50],
    },
    secondary: {
      main: deepPurple[500],
    },
  },
});

export default theme;
