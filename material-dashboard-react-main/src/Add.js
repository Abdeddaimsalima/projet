import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "@mui/material/Select";
import  MenuItem  from "@mui/material/MenuItem" ;
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';
import TableContainer from "@mui/material/TableContainer";
import FormControl from "@mui/material/FormControl"

function Add() {
 const [nameError, setNameError] = useState(false);
 const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("medecin");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const notifySuccess = () => toast.success("ajouté!");

  const notifyError = (message) => toast.error(message);
  useEffect(() => {
    Axios.get("http://localhost:8000/Ajouterrole")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const register = () => {
    if (!name || !email || !password) {
      if (!name) {
        setNameError(true);
        toast.error("Please enter your name");
      }
      if (!email) {
        setEmailError(true);
        toast.error("Please enter your email");
      }
      if (!password) {
        setPasswordError(true);
        toast.error("Please enter your password");
      }
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError(true);
      toast.error("Invalid email format");
      return;
    }
    if (password.length < 8) {
      setPasswordError(true);
      toast.error("Password must be at least 8 characters long");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found, please log in first");
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    Axios.post(
      "http://localhost:8000/add",
      {
        name: name,
        email: email,
        password: password,
        role: selectedRole,
      },
      { headers: headers }
    )
      .then((response) => {
        notifySuccess();
      })
      .catch((error) => {
        notifyError(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };
  const isSubmitDisabled = !name || !email || !password;
  return (
    
    <div className="add">
      
      <ToastContainer />
      <MDButton
    variant="gradient"
    color="info"
    style={{
    position: "absolute",
    top: "2rem",
    right: "2rem",
    background: "grey",
    marginBottom: "10px"
         }}
    component={Link}
    to="/Ajouterrole"
     >
     add role
     </MDButton>
      <div className="Table" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
    
      <TableContainer style={{ width: '30%', marginRight:"10px" }}>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
      
          <MDBox mb={2}>
            <MDInput
          type="text"
          label="Name"
          variant="standard"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false);
          }}
          
          error={nameError}
          helperText={nameError ? "This field is required" : ""}
         />
         </MDBox>
           <MDBox mb={2}>
            <MDInput
          type="text"
          label="Email"
          variant="standard"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
          error={emailError}
          helperText={emailError ? "This field is required" : ""}
         />
            </MDBox>

            <MDBox mb={2}>
             <MDInput
          type="password"
          label="Password"
          variant="standard"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
          error={passwordError}
          helperText={passwordError ? "This field is required" : ""}
         />
          <MDBox mb={2}>
       <Select
          value={selectedRole}
          onChange={handleRoleChange}
          style={{ marginTop: "2rem" }}
          label={
          <InputLabel id="role-label">Role</InputLabel>
          }
          >
        
           {roles.map((role) => (
           <MenuItem key={role.id} value={role.role}>
          {role.role}
          </MenuItem>
           ))}
           </Select>
           </MDBox>
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
           
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth style={{marginBottom:"10px"}} onClick={register} component={Link} to="/Ajouteruser"  disabled={isSubmitDisabled}>
                add
              </MDButton> 
              <MDButton variant="gradient" color="error" fullWidth  component={Link} to="/Ajouteruser" >
                cancel
              </MDButton>
              
            </MDBox>
           
          </MDBox>
        </MDBox>
      </TableContainer>
     </div>
    
    </div>

  );
}

export default Add;
