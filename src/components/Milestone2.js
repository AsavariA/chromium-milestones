import { Grid, Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import { handleDocIdsMilestone2 } from "../services/fire_functions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";

import JobDetailsM2 from "./JobDetailsM2";

const Milestone2 = (props) => {
  const [idArray, setIdArray] = useState([]);
  const [dataPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [filterFields, setFilterFields] = useState([
    "Scheduled",
    "Running",
    "Finished",
    "Failed",
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e, statusName) => {
    if (!e.target.checked) {
      setFilterFields(filterFields.filter((item) => item !== statusName));
    } else {
      setFilterFields((filterFields) => [...filterFields, statusName]);
    }
  };

  const indexOfLastJob = currentPage * dataPerPage;
  const indexOfFirstJob = indexOfLastJob - dataPerPage;
  const currentData = idArray.slice(indexOfFirstJob, indexOfLastJob);

  useEffect(() => {
    handleDocIdsMilestone2(setIdArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePagination = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Tooltip title="Filter list">
        <IconButton onClick={handleOpen}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterFields.includes("Scheduled")}
                onChange={(e) => handleChange(e, "Scheduled")}
              />
            }
            label="Scheduled"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterFields.includes("Running")}
                onChange={(e) => handleChange(e, "Running")}
              />
            }
            label="Running"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterFields.includes("Finished")}
                onChange={(e) => handleChange(e, "Finished")}
              />
            }
            label="Finished"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterFields.includes("Failed")}
                onChange={(e) => handleChange(e, "Failed")}
              />
            }
            label="Failed"
          />
        </MenuItem>
      </Menu>
      <Grid container spacing={2}>
        {currentData.map((x) => {
          return (
            <Grid item xs={12} key={x} sm={12} md={6}>
              <JobDetailsM2 filterFields={filterFields} id={x} />
            </Grid>
          );
        })}
      </Grid>
      <div className="pagination">
        <Pagination
          count={Math.ceil(idArray.length / dataPerPage)}
          variant="outlined"
          color="primary"
          shape="rounded"
          page={currentPage}
          onChange={handleChangePagination}
        />
      </div>
    </>
  );
};

export default Milestone2;
