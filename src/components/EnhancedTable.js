import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { handleRead, sortDocs } from "../services/fire_functions";
import { time_since } from "../services/time_since";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Edit from "./Edit";
import Delete from "./Delete";
import Add from "./Add";

const headCells = [
  {
    id: "id",
    label: "S. No",
  },
  {
    id: "message",
    label: "Message",
  },
  {
    id: "result",
    label: "Result",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "created",
    label: "Created",
  },
  {
    id: "updated",
    label: "Updated",
  },
  {
    id: "edit",
    label: "Edit",
  },
  {
    id: "delete",
    label: "Delete",
  },
];

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== "created" &&
            headCell.id !== "updated" &&
            headCell.id !== "status" ? (
              <p>{headCell.label}</p>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { filterFields, setFilterFields } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
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

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Jobs Control Plane
      </Typography>
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
      <>
      <Add />
      <Tooltip title="Filter list">
        <IconButton onClick={handleOpen}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      </>
    </Toolbar>
  );
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("created");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [filterFields, setFilterFields] = React.useState([
    "Scheduled",
    "Running",
    "Finished",
    "Failed",
  ]);

  React.useEffect(() => {
    handleRead(setRows);
    console.log(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    sortDocs(setRows, property, order);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          filterFields={filterFields}
          setFilterFields={setFilterFields}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .filter((x) => filterFields.includes(x.status))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell component="th" scope="row" padding="normal">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">{row.message}</TableCell>
                      <TableCell align="left">{row.result}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="left">
                        {time_since(row.created.toDate())}
                      </TableCell>
                      <TableCell align="left">
                        {time_since(row.updated.toDate())}
                      </TableCell>
                      <TableCell align="left">
                        <Edit job={row} />
                      </TableCell>
                      <TableCell align="left">
                        <Delete id={row.id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
