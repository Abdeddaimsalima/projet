import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import MDButton from "components/MDButton";
import Table from "@mui/material/Table";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { ToastContainer, toast } from 'react-toastify';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";



const notifySuccess = () => {
  toast.success("updated successfully");
};



const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    Axios.get(`http://localhost:8000/Ajouteruser/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => console.error(error));
  }, [id, token]);

  const handleUpdate = (event) => {
    event.preventDefault();
    Axios.put(`http://localhost:8000/Ajouteruser/update/${id}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        notifySuccess();
        navigate("/Ajouteruser");
      })
      .catch((error) => console.error(error));
  };

  return (

    <DashboardLayout>
      <DashboardNavbar />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <ToastContainer />

        <div style={{ maxWidth: '400px' }}>

          <TableContainer style={{ width: '100%', margin: 'auto' }}>
            <Table style={{ tableLayout: 'fixed' }}>

              <TableRow >
                <TableCell>
                  <label htmlFor="name" style={{ padding: "0.5rem" }}>Name</label>
                </TableCell>
              </TableRow>

              <TableRow style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TableCell><input
                  type="text"
                  id="name"
                  value={user.name}
                  onChange={(event) => setUser({ ...user, name: event.target.value })}
                  style={{ padding: "0.7rem", borderRadius: "0.25rem", border: "none", boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)" }}
                />
                </TableCell>
              </TableRow>
              <TableRow style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TableCell>
                  <label htmlFor="email" style={{ padding: "0.5rem" }}>Email</label>
                </TableCell></TableRow>


              <TableRow style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TableCell>
                  <input
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(event) => setUser({ ...user, email: event.target.value })}
                    style={{ padding: "0.7rem", borderRadius: "0.25rem", border: "none", boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)" }}
                  />
                </TableCell>
              </TableRow>



              <TableRow style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TableCell>
                  <label htmlFor="password" style={{ padding: "0.5rem" }}>Password</label></TableCell></TableRow>

              <TableRow style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TableCell>
                  <input
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(event) => setUser({ ...user, password: event.target.value })}
                    style={{ padding: "0.7rem", borderRadius: "0.25rem", border: "none", boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)" }}
                  />
                </TableCell>
              </TableRow>


            </Table>
            <TableRow>
              <TableCell>
                <TableRow>
                  <MDButton gradient="variant" color="info" type="submit" onClick={handleUpdate} style={{ marginRight: "20px", marginLeft: "70px", fontSize: "1rem" }}>
                    Update
                  </MDButton>
                  <MDButton variant="gradient" color="error" onClick={() => navigate('/Ajouteruser')} style={{ fontSize: "1rem" }} >
                    Cancel
                  </MDButton>
                </TableRow>
              </TableCell>
            </TableRow>


          </TableContainer>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default UpdateUser;