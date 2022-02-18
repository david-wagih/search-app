import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { ReactEventHandler, useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

interface employee {
  _id: number;
  id: number;
  name: string;
}

const employeesArray: employee[] = [];
const ArrayPlaceholder: employee[] = [];
const Home: NextPage = () => {
  const [employeesArray, setEmployees] = useState<employee[]>();
  const [InsertIDFieldValue, setInsertIDFieldValue] = useState<number>();
  const [SearchIDFieldValue, setSearchIDFieldValue] = useState<number>();
  const [InsertNameFieldValue, setInsertNameFieldValue] = useState<string>();
  const [DeleteIDFieldValue, setDeleteIDFieldValue] = useState<number>();
  const handleInsertIDField = (e: any) => {
    setInsertIDFieldValue(e.target.value);
  };
  const handleInsertNameField = (e: any) => {
    setInsertNameFieldValue(e.target.value);
  };
  const handleSearchIDField = (e: any) => {
    setSearchIDFieldValue(e.target.value);
  };
  const handleDeleteIDField = (e: any) => {
    setDeleteIDFieldValue(e.target.value);
  };

  const GetAllEmployees = async () => {
    await fetch("http://localhost:3000/api/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.data);
      });
  };

  const SearchById = async () => {
    await fetch(`http://localhost:3000/api/employees/${SearchIDFieldValue}`)
      .then((response) => response.json())
      .then((data) => {
        ArrayPlaceholder.push(data.data);
        setEmployees(ArrayPlaceholder);
      });
  };
  const InsertNewEmployee = async () => {
    await fetch("http://localhost:3000/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: InsertIDFieldValue,
        name: InsertNameFieldValue,
      }),
    });
  };
  const DeleteEmployee = async () => {
    await fetch(`http://localhost:3000/api/employees/${DeleteIDFieldValue}`, {
      method: "DELETE",
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Search App</title>
        <meta
          name="description"
          content="this app is for inserting and deleting employees"
        />
      </Head>
      <div className={styles.buttonsList}>
        <div>
          <Button onClick={GetAllEmployees} variant="contained">
            Get All Employees
          </Button>
        </div>
        <div>
          <Button
            sx={{
              width: 300,
              margin: "15px",
            }}
            variant="contained"
            onClick={SearchById}
          >
            Search By ID
          </Button>
          <TextField
            value={SearchIDFieldValue}
            onChange={handleSearchIDField}
            id="outlined-basic"
            label="ID"
            variant="outlined"
            type={`number`}
          />
        </div>
        <div>
          <Button
            sx={{
              width: 300,
              margin: "15px",
            }}
            variant="contained"
            onClick={InsertNewEmployee}
          >
            Insert new Employee
          </Button>
          <TextField
            margin="normal"
            value={InsertIDFieldValue}
            onChange={handleInsertIDField}
            id="outlined-basic"
            label="Id"
            variant="outlined"
            type={`number`}
          />
          <TextField
            value={InsertNameFieldValue}
            onChange={handleInsertNameField}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type={`text`}
          />
        </div>
        <div>
          <Button
            variant="contained"
            sx={{
              width: 300,
              margin: "15px",
            }}
            onClick={DeleteEmployee}
          >
            Delete an Employee
          </Button>
          <TextField
            value={DeleteIDFieldValue}
            onChange={handleDeleteIDField}
            id="outlined-basic"
            label="ID"
            variant="outlined"
            type={`number`}
          />
        </div>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 5,
        }}
      >
        <Table sx={{ minWidth: 60 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  minWidth: 30,
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  minWidth: 30,
                }}
              >
                Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeesArray &&
              employeesArray.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
