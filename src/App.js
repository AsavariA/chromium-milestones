import "./App.css";
import "./sass/index.css";
import Milestone1 from "./components/Milestone1";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import Milestone2 from "./components/Milestone2";

function App() {
  const [milestone, setMilestone] = useState("milestone1");

  return (
    <div className="App">
      <ToggleButtonGroup
        value={milestone}
        color="primary"
        exclusive
        onChange={(e, mil) => setMilestone(mil)}
        aria-label="text alignment"
      >
        <ToggleButton value="milestone1">
          <p>Milestone 1</p>
        </ToggleButton>
        <ToggleButton value="milestone2">
          <p>Milestone 2</p>
        </ToggleButton>
      </ToggleButtonGroup>
      {milestone === "milestone1" ? <Milestone1 /> : <Milestone2 />}
    </div>
  );
}

export default App;
