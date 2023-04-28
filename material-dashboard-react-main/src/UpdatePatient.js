

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



const UpdatePatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        numeroPatient: "",
        nomPatient: "",
        prenomPatient: "",
        date_naissance: "",
        adresse: "",
        numtelephone: "",
        sexe: "",
        situationfamiliale: "",
        antécédentsmedicaux: "",
    });
 
    useEffect(() => {
        Axios.get(`http://localhost:8000/ListePatient/get/${id}`)
          .then((response) => {
            setPatient(response.data[0]);
          })
          .catch((error) => console.error(error));
      }, [id]);

      const handleUpdate = (event) => {
        event.preventDefault();
        Axios.put(`http://localhost:8000/ListePatient/update/${id}`, patient)
          .then((response) => {
           
            navigate("/ListePatient");
          })
          .catch((error) => console.error(error));
      };


      return (
        <DashboardLayout>
        <div >
          <MDBox sx={{ textAlign: "center", mb: 3 ,marginTop: '30px'}}>
          <MDTypography variant="h4" sx={{ color: 'navy', fontSize: '24px' }}>Update Patient</MDTypography>
          </MDBox>
          <div style={{ display: "flex" }}>
          <form onSubmit={handleUpdate}>
          <TableContainer style={{ width: "110%",marginLeft:"240px"}}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Numero Patient:</TableCell>
                    <TableCell>
                    <input
  type="text"
  value={patient.numeroPatient}
  onChange={(e) => setPatient({ ...patient, numeroPatient: e.target.value })}
  style={{
    backgroundColor: '#F8F8F8',
    color: '#333',
    border: '1px solid #CCC',
    borderRadius: '4px',
    padding: '5px 10px',
    marginBottom: '10px',
    width: '100%'
  }}
/>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Nom Patient:</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={patient.nomPatient}
                        onChange={(e) =>
                          setPatient({ ...patient, nomPatient: e.target.value })
                        }
                        style={{
                          backgroundColor: '#F8F8F8',
                          color: '#333',
                          border: '1px solid #CCC',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          marginBottom: '10px',
                          width: '100%'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Prenom Patient:</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={patient.prenomPatient}
                        onChange={(e) =>
                          setPatient({ ...patient, prenomPatient: e.target.value })
                        }
                        style={{
                          backgroundColor: '#F8F8F8',
                          color: '#333',
                          border: '1px solid #CCC',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          marginBottom: '10px',
                          width: '100%'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date Naissance:</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={patient.date_naissance}
                        onChange={(e) =>
                          setPatient({ ...patient, date_naissance: e.target.value })
                        }
                        style={{
                          backgroundColor: '#F8F8F8',
                          color: '#333',
                          border: '1px solid #CCC',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          marginBottom: '10px',
                          width: '100%'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Adresse:</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={patient.adresse}
                        onChange={(e) =>
                          setPatient({ ...patient, adresse: e.target.value })
                        }
                        style={{
                          backgroundColor: '#F8F8F8',
                          color: '#333',
                          border: '1px solid #CCC',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          marginBottom: '10px',
                          width: '100%'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Numéro de téléphone:</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={patient.numtelephone}
                        onChange={(e) =>
                          setPatient({ ...patient, numtelephone: e.target.value })
                        }
                        style={{
                          backgroundColor: '#F8F8F8',
                          color: '#333',
                          border: '1px solid #CCC',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          marginBottom: '10px',
                          width: '100%'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sexe:</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={patient.sexe}
                        onChange={(e) =>
                          setPatient({ ...patient, sexe: e.target.value })
                        }
                        style={{
                          backgroundColor: '#F8F8F8',
                          color: '#333',
                          border: '1px solid #CCC',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          marginBottom: '10px',
                          width: '100%'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Situation Familiale:</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={patient.situationfamiliale}
                        onChange={(e) =>
                          setPatient({
                            ...patient,
                            situationfamiliale: e.target.value,
                          })
                        }
                        style={{
                          backgroundColor: '#F8F8F8',
                          color: '#333',
                          border: '1px solid #CCC',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          marginBottom: '10px',
                          width: '100%'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Antécédents Médicaux:</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={patient.antécédentsmedicaux}
                        onChange={(e) =>
                          setPatient({
                            ...patient,
                            antécédentsmedicaux: e.target.value,
                          })
                        }
                        style={{
                          backgroundColor: '#F8F8F8',
                          color: '#333',
                          border: '1px solid #CCC',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          marginBottom: '10px',
                          width: '100%'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            
      
            
            
  <MDButton type="submit" onClick={handleUpdate} style={{ backgroundColor: '#007bff', color: '#FFFFFF',marginLeft:"250px",marginTop:"20px" }}>Update</MDButton>


          </form>
          </div>
          <ToastContainer />
        </div>
        </DashboardLayout>
      );
}
 
export default UpdatePatient;