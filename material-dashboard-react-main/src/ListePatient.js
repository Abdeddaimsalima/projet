

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import { useNavigate,Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DateRangeIcon from '@mui/icons-material/DateRange'
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import { ToastContainer, toast } from 'react-toastify';

import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import MDBox from "components/MDBox";
import AccessTime from '@mui/icons-material/AccessTime';



const notifySuccess = () => {
  toast.success("Le patient a été supprimé avec succès !");
};

const notifyError = () => {
  toast.error("Une erreur s'est produite lors de la suppression du patient.");
};

const ListePatient = () => {
    const [patients, setPatients] = useState([]);
  
    const navigate = useNavigate();
    useEffect(() => {

        const getPatient = () => {
          Axios.get("http://localhost:8000/Listepatient",
            {
    
    
            }).then((res) => {
              console.log('listpatient', res);
              setPatients(res.data);
      })
     };
      getPatient();
     }, []);
      const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
          Axios.delete(`http://localhost:8000/ListePatient/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              setPatients(patients.filter((patient) => patient.id !== id));
              notifySuccess();
            })
            .catch((err) => {
              console.log(err);
              notifyError();
            });
        }
      };

      const handleUpdateClick = (id) => {
        navigate(`/ListePatient/update/${id}`);
      };

      const handleAppointmentClick = (id) => {
        navigate(`/Ajouterrdv/${id}`);
      };
      const handleDetailsClick = (id) => {
        navigate(`/details/${id}`);
      };
      const handleConsultationClick = (id) => {
        navigate(`/consultation/${id}`);
      };
      const handleAjouterconsultationClick = (id) => {
        navigate(`/Ajouterconsultation/${id}`);
      };
      const [searchQuery, setSearchQuery] = useState('');
      const filteredPatients = patients.filter((patient) =>
      patient.nomPatient && patient.nomPatient.toLowerCase().includes(searchQuery.toLowerCase())
    );

      return ( 
        <DashboardLayout style={{ height: '100vh', overflowY: 'scroll' }}>
           <ToastContainer />
         <div className="UserList" style={{ height: '700px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          padding: '20px',
          marginTop: '10px',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}>
          <MDTypography variant="h3" fontWeight="medium" style={{ marginRight: '10px' }}>
            Liste 
          </MDTypography>
          <MDTypography variant="h3" fontWeight="medium">
            patient
          </MDTypography>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            
            placeholder="Recherche par nom"
            style={{
              background: "white",
              color: "black",
              border: "2px solid blue",
              borderRadius: "5px",
              padding: "10px",
              flex: 2,
              marginRight: '10px',
              marginLeft: '600px',
            }}
          />
          <MDButton
            variant="gradient"
            color="success"
            component={Link}
            to="/Ajouterpatient"
          >
           ajouter patient
          </MDButton>
        </div>
       
        <MDBox py={3}>
        <div className="Table" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ maxWidth: '1200px'  }}>
            <TableContainer style={{ width: '100%', marginTop: '10px',marginRight:'20px' }}>
              <Table style={{ tableLayout: 'fixed' }}>
          <TableHead>
          <TableRow>
          <TableCell align="left"   style={{  paddingLeft: '1px' }}>Id</TableCell>
          <TableCell align="center" style={{ paddingLeft: '210px'}}>numero</TableCell>
          <TableCell align="center" style={{  paddingLeft: '170px'}}>nom</TableCell>
          <TableCell align="center" style={{  paddingLeft: '185px'}}>prenom</TableCell>
          <TableCell align="center" style={{  paddingLeft: '230px'}}>Action</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {filteredPatients.map((patient) => (
          <TableRow key={patient.id}>
          <TableCell align="left" style={{ width: '10%' }}>{patient.id}</TableCell>
          <TableCell align="left" style={{ width: '10%' }}>{patient.numeroPatient}</TableCell>
          <TableCell align="left" style={{ width: '10%' }}>{patient.nomPatient}</TableCell>
          <TableCell align="left" style={{ width: '10%' }}>{patient.prenomPatient}</TableCell>
          <TableCell>
            <MDBox display="flex" alignItems="center" >
             
              <MDButton variant="text" color="success" onClick={() => handleDetailsClick(patient.id)}>
               <Icon>
                <VisibilityIcon />
                </Icon>
               </MDButton>
              
              <MDButton variant="text" color="info" onClick={() => handleUpdateClick(patient.id)}>
                <Icon>edit</Icon>
              </MDButton>
              <MDButton variant="text" color="error" onClick={() => handleDelete(patient.id)}>
                <Icon>delete</Icon>
              </MDButton>
            
              <MDButton variant="text" color="info"  onClick={()=>handleAppointmentClick(patient.id)}
          >
                <Icon><DateRangeIcon/></Icon>
              </MDButton>
              <MDButton variant="text" color="error" onClick={() => handleConsultationClick(patient.id)}>
  <AccessTime />
</MDButton>
              <MDButton variant="text" color="error" onClick={()=>handleAjouterconsultationClick(patient.id)} >
                <Icon>Historique</Icon>
              </MDButton>
            </MDBox>
          </TableCell>
          </TableRow>
         ))}
           </TableBody>
           </Table>
           </TableContainer>
          </div>
          </div>
          </MDBox>
          </div>
          </DashboardLayout>
           );
         }
 
export default ListePatient;