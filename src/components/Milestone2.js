import React from "react";
import { useEffect, useState } from "react";
import { handleReadMilestone2 } from "../services/fire_functions";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const Milestone2 = () => {
  const [aggArray, setAggArray] = useState([]);

  useEffect(() => {
    handleReadMilestone2(aggArray, setAggArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
        <Accordion>
          <AccordionSummary>
            <p>{aggArray[0]?.id}</p>
            <p>Status: Running</p>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Updated</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Milestone2;
