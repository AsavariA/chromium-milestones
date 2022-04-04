import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { handleDocIdsMilestone2 } from "../services/fire_functions";

import JobDetailsM2 from "./JobDetailsM2";

const Milestone2 = () => {
  const [idArray, setIdArray] = useState([]);

  useEffect(() => {
    handleDocIdsMilestone2(setIdArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      {idArray.map((x) => {
        return (
          <Grid item xs={12} key={x} sm={12} md={6}>
            <JobDetailsM2 id={x} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Milestone2;
