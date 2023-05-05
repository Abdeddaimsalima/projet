
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const Consultation = () => {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getConsultation = () => {
      Axios.get(`http://localhost:8000/consultation/${id}`).then((res) => {
        console.log("consultation patient", res);
        setConsultations(res.data);
        setSelectedConsultation(res.data[0]);
      });
    };
    getConsultation();
  }, []);

  const handleConsultationClick = (consultation) => {
    setSelectedConsultation(consultation);
  };


  return (
    <DashboardLayout style={{ height: "100vh", overflowY: "scroll" }}>


      <div
        style={{
          display: "flex",
          marginBottom: "50px",
          width: "90%",
          margin: "auto",
          backgroundColor: "white",
          marginTop: "50px",
        }}
      >
        <div style={{ backgroundColor: "#DCDCDC", width: "30%", margin: "15px", borderRadius: "10px" }}>
          <Table>
            <TableBody>
              {consultations.map((consultation) => (
                <TableRow
                  key={consultation.id}
                  onClick={() => handleConsultationClick(consultation)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>
                    Consultation: {consultation.dateconsultation.split("T")[0]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div style={{ width: "80%" }}>
          <Table>
            <TableBody>
              {selectedConsultation && (
                <div>
                  <div style={{ marginLeft: "240px", marginTop: "30px", marginBottom: "40px" }}>
                    <h2 style={{ color: "blue" }}>Consultation {selectedConsultation.dateconsultation.split("T")[0]}</h2>
                  </div>

                  <div style={{ marginLeft: "50px" }}>
                    <table>
                      <tbody>
                        <tr>
                          <th style={{ textAlign: "left" }}>Heure début:</th>
                          <td style={{ padding: "10px" }}>{selectedConsultation.heuredebut.slice(0, 5)}</td>
                        </tr>
                        <tr>
                          <th style={{ textAlign: "left", marginTop: "30px" }}>Heure fin:</th>
                          <td style={{ padding: "10px" }}>
                            {selectedConsultation.heurefin.slice(0, 5)}
                          </td>
                        </tr>
                        <tr>
                          <th style={{ textAlign: "left", marginTop: "30px" }}>ID médecin:</th>
                          <td style={{ padding: "10px" }}>{selectedConsultation.idmedecin}</td>
                        </tr>
                        <tr>
                          <th style={{ textAlign: "left", marginTop: "30px" }}>ID patient:</th>
                          <td style={{ padding: "10px" }}>{selectedConsultation.idpatient}</td>
                        </tr>
                        <tr>
                          <th style={{ textAlign: "left", marginTop: "30px" }}>Notes:</th>
                          <td style={{ padding: "10px" }}>{selectedConsultation.notes}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div style={{ padding: "20px", marginLeft: "650px" }}>

              </div>
            </TableBody>
          </Table>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default Consultation;