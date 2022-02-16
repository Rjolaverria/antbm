import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom'

import logo from "../../assets/stock/Welcome-main.png";
import "./style.css";
const Welcome = () => {
  const navigate = useNavigate();
  return (
    <main className="welcome-container">
      <div className="main-content">
        <h1>America’s Next Top Bot Model</h1>
        <h3>CAN YOU SPOT THE AI IN THE HUMAN HAYSTACK?</h3>
        <Button variant="outlined" size="large" onClick={() => navigate('/menu')}>Play</Button>
      </div>
      <div>
        <img src={logo} className="app-logo" alt="ANTBM logo" />
      </div>
    </main>
  );
};

export default Welcome;
