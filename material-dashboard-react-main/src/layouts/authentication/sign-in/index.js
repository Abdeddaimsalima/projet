

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// @mui icons

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Axios from "axios";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
 



// Images
import bgImage from "assets/images/doctors.jpg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import useAuth from './useAuth';



function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);



  const Login = () => {
    setUsernameError('');
    setPasswordError('');
    Axios.post('http://localhost:8000/authentication/sign-in', {
      username: username,
      password: password,
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 && response.data.auth) {
          console.log('User is authenticated');
         
          localStorage.setItem('token', response.data.token);
  
         
          try {
            const decodedToken = jwt_decode(response.data.token);
            console.log(decodedToken); ///
            if (decodedToken.role === 'admin') {
              console.log('The user is an admin!');
            }
          } catch (error) {
            console.log('Error decoding token:', error);
          }
          navigate('/dashboard');
        } else {
          console.log('Authentication failed');
          toast.error(response.data.message || 'Invalid username or password!');
          if (response.data.field === 'username') {
            setUsernameError(response.data.message);
          } else if (response.data.field === 'password') {
            setPasswordError(response.data.message);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Invalid username or password!');
      });
  };


  return (
    <div className="Basic">
      <ToastContainer />
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Sign in
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="username"
                  fullWidth
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError('');
                  }}
                  error={Boolean(usernameError)}
                  helperText={usernameError}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="password"
                  fullWidth
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                />
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Remember me
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={Login}>
                  sign in
                </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>
    </div>
  );
}

export default Basic;
