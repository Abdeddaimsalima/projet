import MDButton from "components/MDButton";
import { useNavigate,Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Grid from "@mui/material/Grid";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import { ToastContainer, toast } from 'react-toastify';
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import MDBox from "components/MDBox";
import { width } from "@mui/system";
const Details = () => {
    const [patients, setPatients] = useState([]);
    const { id } = useParams();
    useEffect(() => {

      const getPatient = () => {
        Axios.get(`http://localhost:8000/details/${id}`).then((res) => {
          console.log('detailspatient', res);
          setPatients(res.data);
        });
      };
    
        getPatient();
    
      }, []);

      const handleBilaninitialeClick = (id) => {
        navigate(`/Bilaninitiale/${id}`);
      };
     
      return (    
        <DashboardLayout style={{ height: '100vh', overflowY: 'scroll' }}>
        {patients.map(patient => (
          <div key={patient.id} className="patient-container">
            <div  style={{marginTop: "10px"}}></div>
         <TableContainer style={{marginBottom:'50px',width:'100%', margin:'auto', display:'block'}}>
  <h2 style={{color:'blue', fontSize:'24px', padding:'10px', marginLeft:'10px'}}>informations du patient : </h2>
</TableContainer>
<div  style={{marginTop: "20px"}}></div>
<TableContainer style={{marginBottom:'10px',width:'100%', margin:'auto', display:'block'}}>
<Table style={{tableLayout: 'fixed'}}>
    <TableBody>
      <TableRow>
        <TableCell style={{width: '40%'}}><strong>Numero :</strong></TableCell>
        <TableCell style={{width: '60%'}}>{patient.numeroPatient}</TableCell>
      </TableRow>
      <TableRow>
<TableCell>
  <strong>Nom et Prenom</strong>
</TableCell>
<TableCell>{patient.nomPatient} {patient.prenomPatient}</TableCell>
      </TableRow>
                  <TableRow>
                  <TableCell><strong>Date de naissance :</strong></TableCell>
                    <TableCell>{patient.date_naissance}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell><strong>Adresse :</strong></TableCell>
                    <TableCell>{patient.adresse}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell><strong>Numero de telephone:</strong></TableCell>
                    <TableCell>{patient.numtelephone}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell><strong>Sexe :</strong></TableCell>
                    <TableCell>{patient.sexe}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell><strong>Situation familiale :</strong></TableCell>             
                         <TableCell>{patient.situationfamiliale}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell><strong>Antecedants medicaux :</strong></TableCell>
                    <TableCell>{patient.antécédentsmedicaux}</TableCell>
                  </TableRow>
                  <MDButton variant="gradient" color="info" style={{ marginLeft: '10px'  }}  
            >
                      Bilan initiale
</MDButton>
<MDButton variant="gradient" color="info" style={{ marginLeft: '10px' }}  
            >
                      Bilan suivie
</MDButton>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </DashboardLayout>               
      );
         
}
 
export default Details;