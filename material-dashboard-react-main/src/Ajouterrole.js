import React, { useState, useEffect } from 'react';
import MDBox from 'components/MDBox';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import MDInput from "components/MDInput";
import Axios from 'axios';
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";


const Ajouterrole = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:8000/Ajouterrole')
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const addRole = () => {
    Axios.post('http://localhost:8000/addrole', {
      role: newRole
    })
      .then((response) => {
        setRoles([...roles, { id: response.data.insertId, role: newRole }]);
        setNewRole("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleNewRoleChange = (event) => {
    setNewRole(event.target.value);
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'white',
        padding: '20px',
        marginTop: '20px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <MDTypography variant="h3" fontWeight="medium" style={{ marginRight: '10px' }}>
          Liste
        </MDTypography>
        <MDTypography variant="h3" fontWeight="medium">
          des roles
        </MDTypography>
        <form onSubmit={(e) => { e.preventDefault(); addRole(); }}>


          <input
            placeholder="Entrer un role"
            type="text"
            value={newRole}
            onChange={handleNewRoleChange}
            style={{
              background: "white",
              color: "black",
              border: "2px solid blue",
              borderRadius: "5px",
              padding: "10px",
              flex: 2,
              marginRight: '10px',
              marginLeft: '640px',
            }} />

          <MDButton type="submit" variant="contained" color="primary">Ajouter</MDButton>
        </form>

      </div>
      <TableContainer style={{ width: '100%', marginTop: "20px" }}>
        <Table >
          <TableBody>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>


            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.role}</TableCell>
                <TableCell ><MDButton variant="contained" color="info" style={{ marginRight: "10px" }}>modifier</MDButton>
                  <MDButton variant="contained" color="error">supprimer</MDButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>




    </DashboardLayout>
  );
};

export default Ajouterrole;