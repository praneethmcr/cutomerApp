import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import LastPageIcon from "@mui/icons-material/LastPage";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function TableComponent() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    date: "asc",
    time: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/customer/data");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column) => {
    const newSortOrder = { ...sortOrder };
    newSortOrder[column] = sortOrder[column] === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    const sortedCustomers = [...customers].sort((a, b) => {
      if (sortOrder[column] === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setCustomers(sortedCustomers);
  };
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value === "") {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/customer/data"
          );
          setCustomers(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();

      return;
    }
    const filteredCustomers = customers.filter(
      (customer) =>
        customer.customer_name.toLowerCase().includes(value.toLowerCase()) ||
        customer.location.toLowerCase().includes(value.toLowerCase())
    );

    setCustomers(filteredCustomers);
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" marginTop={5}>
        <h2>Customers Data</h2>
        <TextField
          sx={{ width: "17.5rem" }}
          placeholder="Search by Customer Name or Location"
          variant="standard"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Stack>
      <TableContainer component={Paper} sx={{ marginTop: "0.5rem" }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Age</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>
                Date{" "}
                <IconButton onClick={() => handleSort("date")}>
                  {sortOrder.date === "asc" ? (
                    <ArrowDownwardIcon style={{ color: "white" }} />
                  ) : (
                    <ArrowUpwardIcon style={{ color: "white" }} />
                  )}
                </IconButton>
              </StyledTableCell>
              <StyledTableCell>
                Time{" "}
                <IconButton onClick={() => handleSort("time")}>
                  {sortOrder.time === "asc" ? (
                    <ArrowDownwardIcon style={{ color: "white" }} />
                  ) : (
                    <ArrowUpwardIcon style={{ color: "white" }} />
                  )}
                </IconButton>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? customers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : customers
            ).map((customer, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {customer.sno}
                </TableCell>
                <TableCell>{customer.customer_name}</TableCell>
                <TableCell>{customer.age}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>{customer.date}</TableCell>
                <TableCell>{customer.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 20, { value: -1, label: "All" }]}
                colSpan={8}
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableComponent;
