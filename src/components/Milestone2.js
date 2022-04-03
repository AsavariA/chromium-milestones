import React from "react";
import { useEffect, useState } from "react";
import { handleReadMilestone2 } from "../services/fire_functions";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { time_since } from "../services/time_since";

const Milestone2 = () => {
  const [aggArray, setAggArray] = useState({});

  useEffect(() => {
    handleReadMilestone2(setAggArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      {Object.keys(aggArray).map((x) => {
        return (
          <Box key={x} sx={{ width: "100%", mt: 2, mb: 2 }}>
            <Accordion>
              <AccordionSummary>
                <p>{x}</p>
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
                      <TableCell align="center">Total Levels</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{aggArray[x][0].id}</TableCell>
                      <TableCell>{aggArray[x][0].message}</TableCell>
                      <TableCell>{aggArray[x][0].result}</TableCell>
                      <TableCell>{aggArray[x][0].status}</TableCell>
                      <TableCell>
                        {time_since(aggArray[x][0].created.toDate())}
                      </TableCell>
                      <TableCell>
                        {time_since(aggArray[x][0].updated.toDate())}
                      </TableCell>
                      <TableCell align="center">{aggArray[x][0].total_levels}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{aggArray[x][1].id}</TableCell>
                      <TableCell>{aggArray[x][1].message}</TableCell>
                      <TableCell>{aggArray[x][1].result}</TableCell>
                      <TableCell>{aggArray[x][1].status}</TableCell>
                      <TableCell>
                        {time_since(aggArray[x][1].created.toDate())}
                      </TableCell>
                      <TableCell>
                        {time_since(aggArray[x][1].updated.toDate())}
                      </TableCell>
                      <TableCell align="center">{aggArray[x][1].total_levels}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </Box>
  );
};

export default Milestone2;
