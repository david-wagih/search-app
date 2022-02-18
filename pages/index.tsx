import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
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
  data: any;
}

const employeesArray: employee[] = [];

const Home: NextPage = (props) => {
  const [employees, setEmployees] = useState<employee[]>();

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/employees")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setEmployees(data);
  //       employeesArray.push(data);
  //       console.log(employeesArray);
  //     }),
  //     [];
  // });

  const GetAllEmployees = async () => {
    await fetch("http://localhost:3000/api/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        console.log(data.data);
      });
  };
  const SearchById = async () => {
    await fetch("http://localhost:3000/api/employees/1")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
  };
  const InsertNewEmployee = async () => {
    await fetch("http://localhost:3000/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "John Doe",
        name: "" + Math.random() + "@gmail.com",
      }),
    });
  };
  const DeleteEmployee = async () => {
    await fetch("http://localhost:3000/api/employees/1", {
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
            className="searchId"
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
            className="InsertID"
            id="outlined-basic"
            label="Id"
            variant="outlined"
            type={`number`}
          />
          <TextField
            className="InsertName"
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
            className="DeleteID"
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
                <TableRow key={employee.data.id}>
                  <TableCell>{employee.data.id}</TableCell>
                  <TableCell>{employee.data.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const res = await fetch("http://localhost:3000/api/employees");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default Home;
