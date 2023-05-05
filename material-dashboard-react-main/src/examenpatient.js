
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

const ExamenPatient = () => {
    const [ExamenPatient, setExamenPatient] = useState([]);

    useEffect(() => {

        const getExamens = () => {
            Axios.get("http://localhost:8000/ExamenPatient",
                {


                }).then((res) => {
                    console.log('listexamens', res);
                    setExamenPatient(res.data);
                })
        };
        getExamens();
    }, []);


    return (
        <DashboardLayout style={{ height: "100vh", overflowY: "scroll" }}>
            <DashboardNavbar />
            <TableContainer style={{ marginTop: "20px" }}>

                <TableContainer>
                    {ExamenPatient.map((ep) => (

                        <TableCell>{ep.type} {ep.libelle}</TableCell>
                    ))}

                </TableContainer>
                <TableContainer>

                    {ExamenPatient.map((epp) => (
                        <TableRow key={epp.id} >
                            <TableCell>{epp.libellequestion}</TableCell>
                            <TableCell>{epp.reponse}</TableCell>
                        </TableRow>
                    ))}
                </TableContainer>

            </TableContainer>
        </DashboardLayout>
    );
}

export default ExamenPatient;