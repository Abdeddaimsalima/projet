
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
import moment from 'moment';
import MDInput from "components/MDInput";



const notifySuccess = () => {
  toast.success("consultation Ajouté !");
};

const UpdateConsultation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [medecins, setMedecins] = useState([]);

  const [consultation, setConsultation] = useState(null);
  const [formState, setFormState] = useState({
  dateconsultation: '',
  heuredebut: '',
  heurefin: '',
  idmedecin: '',
  idpatient: '',
  notes: ''
  });
  useEffect(() => {
    Axios.get("http://localhost:8000/medecins")
      .then((res) => {
        setMedecins(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  

  useEffect(() => {
  Axios.get(`http://localhost:8000/consultation1/${id}`)
  .then(response => {
  setConsultation(response.data[0]);
  setFormState({
  dateconsultation: response.data[0].dateconsultation,
  heuredebut: response.data[0].heuredebut,
  heurefin: response.data[0].heurefin,
  idmedecin: response.data[0].idmedecin,
  idpatient: response.data[0].idpatient,
  notes: response.data[0].notes
  });
  })
  .catch(error => {
  console.log(error);
  });
  }, [id]);
  
  const handleInputChange = e => {
  setFormState({
  ...formState,
  [e.target.name]: e.target.value
  });
  };
  
  const handleUpdate = (event) => {
    event.preventDefault();
    Axios.put(`http://localhost:8000/consultation/update/${id}`, formState)
      .then((response) => {
        console.log("La consultation a été modifiée avec succès !");
        notifySuccess();
      })
      .catch((error) => console.error(error));
  };
  return (
   <DashboardLayout>
    <ToastContainer />
    <div style={{width: "90%" , borderRadius: "10px",backgroundColor:"white", marginLeft: "auto", marginRight: "auto",marginTop:"30px"}}>
    <div style={{}}>
      <MDTypography variant="h4" gutterBottom padding="30px">
        Modifier la consultation
      </MDTypography>
      </div>
      <form onSubmit={handleUpdate}>
   <MDInput
   label="Date de consultation"
           type="text"
           name="dateconsultation"
           id="dateconsultation"
           InputLabelProps={{
            shrink: true,
          }}
           value={formState.dateconsultation}
           onChange={handleInputChange}
           margin="normal"
           style={{width:"80%",marginLeft:"40px"}}
         />
  
  <MDInput
  label="heure debut"
           type="text"
           name="heuredebut"
           id="heuredebut"
           value={formState.heuredebut}
           onChange={handleInputChange}
             InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, 
          }}
            margin="normal"
            style={{width:"80%",marginLeft:"40px"}}
          
         />
 
  <MDInput
  label="heure fin"
           type="text"
           name="heurefin"
           id="heurefin"
           value={formState.heurefin}
           onChange={handleInputChange}
           margin="normal"
           style={{width:"80%",marginLeft:"40px"}}
         />

  <MDInput
  label="idmedecin"
           type="text"
           name="idmedecin"
           id="idmedecin"
           value={formState.idmedecin}
           onChange={handleInputChange}
            margin="normal"
            style={{width:"80%",marginLeft:"40px"}}
         />
 
 
  
  <MDInput
  label="notes"
           type="text"
           name="notes"
           id="notes"
           value={formState.notes}
           onChange={handleInputChange}
            margin="normal"
            style={{width:"80%",marginLeft:"40px"}}
          
         />
         <div style={{padding:"10px",marginLeft:"650px"}}>
        <MDButton type="submit" variant="contained" color="primary" onClick={handleUpdate} >
          Modifier
        </MDButton>
        <MDButton type ="submit" variant="contained" color="error" onClick={() => navigate('/ListePatient')}  >
         Cancel
        </MDButton>
        </div>
  </form>
  </div>
    </DashboardLayout>
  );
};

export default UpdateConsultation ;