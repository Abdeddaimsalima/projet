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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";



function Add() {
 const [nameError, setNameError] = useState(false);
 const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
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
    <DashboardLayout>
      <DashboardNavbar />
    <ToastContainer />
    <div style={{width: "70%" , borderRadius: "10px",backgroundColor:"white", marginLeft: "auto", marginRight: "auto",marginTop:"30px"}}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <MDTypography variant="h4" gutterBottom padding="30px">
    Ajouter utilisateur 
  </MDTypography>
  <MDButton variant="gradient" color="info" style={{ background: "grey", marginBottom: "10px", marginRight: "20px" }} component={Link} to="/Ajouterrole">
    add role
  </MDButton>
</div>

<form>
 <MDInput
   label="Nom"
           type="text"
           name="dateconsultation"
           id="dateconsultation"
           InputLabelProps={{
            shrink: true,
          }}
           value={name}
           onChange={(e) => {
            setName(e.target.value);
           
          }}
           margin="normal"
           style={{width:"80%",marginLeft:"60px"}}
         />
          <MDInput
   label="Email"
           type="text"
           name="email"
           id="email"
           InputLabelProps={{
            shrink: true,
          }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            
          }}
           margin="normal"
           style={{width:"80%",marginLeft:"60px"}}
         />
            <MDInput
   label="mot de passe"
           type="password"
           name="mot de passe"
           id="mot de passe "
           InputLabelProps={{
            shrink: true,
          }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
           
          }}
           margin="normal"
           style={{width:"80%",marginLeft:"60px"}}
         />
  <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={handleRoleChange}
                style={{
                  color: 'black',
                  border: '2px solid blue',
                  borderRadius: '5px',
                  padding: '10px',
                  flex: 2,
                  width:"80%",
                  marginTop:"10px",
                  marginLeft:"60px"
                }}
              >
                 <option value="">-- Choisissez un role --</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.role}>
                    {role.role}
                  </option>
                ))}
              </select>
              <div style={{display: 'flex',justifyContent:'flex-end',padding:"20px"}}>
              <MDButton variant="gradient" color="info"  onClick={register} component={Link} to="/Ajouteruser"  disabled={isSubmitDisabled}>
                ajouter
              </MDButton> 
              <MDButton variant="gradient" color="error"   component={Link} to="/Ajouteruser" style={{marginLeft:"10px"}}>
                cancel
              </MDButton>
        </div>
         </form>
  </div>
    </DashboardLayout>
  );
}

export default Add;
