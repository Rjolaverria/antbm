import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import logo from "../../assets/stock/Welcome-main.png";
import "./style.css";
const Welcome = () => {
  const navigate = useNavigate();
  return (
    <main className="welcome-container">
      <Grid container direction="row" justifyContent="center">
        <Grid item md={8} sm={12} container justifyContent="center">
          <Stack spacing={4} justifyContent="center" alignItems="center">
            <Typography variant="h1">America’s Next Top Bot Model</Typography>
            <Typography variant="h3">
              CAN YOU SPOT THE AI IN THE HUMAN HAYSTACK?
            </Typography>
            <div>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/menu")}
              >
                Play
              </Button>
            </div>
          </Stack>
        </Grid>
        <Grid item md={4} sm={12}>
          <img src={logo} className="app-logo" alt="ANTBM logo" />
        </Grid>
      </Grid>
    </main>
  );
};

export default Welcome;
