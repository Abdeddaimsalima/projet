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
import jwt_decode from "jwt-decode";
const Resultatexamen = () => {
    const [examenPasser, setExamenPasser] = useState([]);
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    const [id, setId] = useState(decoded.id);
    useEffect(() => {
        const getExamens = () => {
            Axios.get("http://localhost:8000/Listeexamenpasser/" + decoded.id)
                .then((res) => {
                    console.log('listexamens', res);
                    setExamenPasser(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getExamens();
    }, []);

    return (
        <DashboardLayout style={{ height: "100vh", overflowY: "scroll" }}>
            <DashboardNavbar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", }}>
                <div style={{ width: "60%" }}>
                    {examenPasser.map((examen) => (
                        <div key={examen.idexamen}>
                            <TableContainer style={{ marginTop: "20px", padding: "20px" }}>
                                <MDTypography variant="h6" color="primary">
                                    {examen.libelle}
                                </MDTypography>
                            </TableContainer>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <TableContainer style={{ marginTop: "20px" }}>
                                    <Table className="table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }}> Questions </TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}> Reponses </TableCell>
                                            </TableRow>

                                            {examen.questions.map((question) => (
                                                <TableRow key={question.idqst}>
                                                    <TableCell>{question.question}</TableCell>
                                                    <TableCell>{question.response}</TableCell>
                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Resultatexamen;
