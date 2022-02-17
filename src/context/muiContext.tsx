import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";

const MuiContextProvider: React.FC = ({ children }) => {
  let darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: [
        "Poppins",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
        "sans-serif",
      ].join(","),
      h1: {
        fontSize: "60px",
        fontWeight: "600",
        letterSpacing: "0em",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: "1.5rem",
            minWidth: "135px",
            borderWidth: "2px",
          },
          outlined: {
            borderWidth: "2px",
            borderColor: "white",
            color: "white",
          },
          contained: {
            color: "#000",
            backgroundColor: "#fff",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
            width: "500px",
            padding: "24px",
            border: "2px solid #efefef",
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            minHeight: "100px",
            color: "#000",
            fontFamily: "'Indie Flower', cursive",
            fontSize: 55,
            padding: "16px 0 0 0 !important",
            textAlign: "center",
          },
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            border: "2px solid #efefef",
            objectFit: "cover",
            objectPosition: "top center",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          body1: {
            fontSize: 40,
            fontWeight: 600,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderWidth: "2px",
            borderColor: "#fff",
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: "#fff",
            fontWeight: 500,
          },
        },
      },
    },
  });
  darkTheme = responsiveFontSizes(darkTheme)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiContextProvider;
