
import { Link } from "react-router-dom";
import { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import 'react-toastify/dist/ReactToastify.css';
// Images
import bgImage from "assets/images/doctors.jpg";




function Cover() {

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const [password, setPassword] = useState('');

  const notifySuccess = () => toast.success("ajouté!");

  const notifyError = (message) => toast.error(message);

  const register = () => {
   
    
    Axios.post("http://localhost:8000/authentication/sign-up",
      {
        name: name,
        email: email,
        password:password
      }, {}).then((response) => {
        notifySuccess();
      }).catch((error)=>{
        notifyError(error.message);
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  }
  const isSubmitDisabled = !name || !email || !password;
  return (
    
    <div className="Cover">
      
      <CoverLayout image={bgImage}>
      <Card>
      <ToastContainer />
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          
          <MDTypography variant ='h4' display="block"  color="white" my={1}>
            Enter your name,email and password to register
          </MDTypography>
        </MDBox>
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
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
           
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={register} component={Link} to="/Ajouteruser"  disabled={isSubmitDisabled}>
                add
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      </CoverLayout>
    
    </div>
   
    
  );
}

export default Cover;
