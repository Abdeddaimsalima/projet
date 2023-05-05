import MDButton from "components/MDButton";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import MDBox from "components/MDBox";
import { width } from "@mui/system";


const Examens = () => {
    const [Questions, setQuestions] = useState([]);
    const [Reponses, setReponses] = useState([]);
    const [reponseQuestion, setReponseQuestion] = useState([]);
    const { id } = useParams();
    const { idpatient } = useParams();
    const [liste, setListe] = useState([]);
    const [idPatient, setIdpatient] = useState("");


    useEffect(() => {
        Axios.get(`http://localhost:8000/Examens/${idpatient}/${id}`)
            .then((res) => {
                setQuestions(res.data.objNomQuestion);
                setReponses(res.data.objQuestion.map((question) =>
                    question.map((reponse) => ({
                        ...reponse,
                        selectedreponse: "",
                    }))
                ));
            })
            .catch((err) => {
                console.error(err);
            });
    }, [idpatient, id]);

    const sendReponses = (rep) => {
        Axios.post(`http://localhost:8000/Examens/${idpatient}`, { rep })
            .then((res) => {
                console.log("response:", res.data);
                setIdpatient("");
            })
            .catch((err) => {
                console.error("error:", err);
            });
    };
    const saveExamen = (reponseQuestion) => {
        sendReponses(reponseQuestion, idpatient);
    };

    const handleChampInputChange = (event, key1, idrep, idqst, key2) => {
        const updatedReponses = [...Reponses];
        const rep = [...reponseQuestion];
        rep.push({ id_question: idqst, id_reponse: idrep, id_examen: id })
        setReponseQuestion(rep)
        updatedReponses[key1][key2].reponse = event.target.value;
        setReponses(updatedReponses);
    };

    const handleRadioInputChange = (event, key1, idrep, idqst, key2) => {
        const updatedReponses = [...Reponses];
        updatedReponses[key1][key2].selectedreponse = event.target.value;

        const rep = [...reponseQuestion];
        rep.push({ id_question: idqst, id_reponse: idrep, id_examen: id })
        setReponseQuestion(rep)
        setReponses(updatedReponses);
    };

    const handleCheckboxInputChange = (event, key1, idrep, idqst, key2) => {
        const updatedReponses = [...Reponses];
        if (event.target.checked) {
            updatedReponses[key1][key2].selectedreponse = event.target.value;
        } else {
            updatedReponses[key1][key2].selectedreponse = "";
        }

        const rep = [...reponseQuestion];
        rep.push({ id_question: idqst, id_reponse: idrep, id_examen: id })
        setReponseQuestion(rep)
        setReponses(updatedReponses);
    };
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <form >
                <TableContainer style={{ marginTop: "20px" }}>
                    <Table>

                        <TableBody>
                            {Reponses.map((rep, key) => (
                                <TableRow key={key}>
                                    <TableCell>{Questions[key]}</TableCell>
                                    {rep.map((r, key2) => (
                                        <TableCell key={key2}>
                                            {r.typereponse === "champ" ? (
                                                <input
                                                    type="text"
                                                    value={r.reponse}
                                                    onChange={(event) => handleChampInputChange(event, key, r.idrep, r.idqst, key2)}
                                                />
                                            ) : r.typereponse === "radio" ? (
                                                <input
                                                    type="radio"
                                                    value={r.reponse}
                                                    checked={r.reponse === Reponses[key][key2].selectedreponse}
                                                    onChange={(event) => handleRadioInputChange(event, key, r.idrep, r.idqst, key2)}
                                                />
                                            ) : (
                                                <input
                                                    type="checkbox"
                                                    value={r.reponse}
                                                    checked={r.reponse === Reponses[key][key2].selectedreponse}
                                                    onChange={(event) => handleCheckboxInputChange(event, key, r.idrep, r.idqst, key2)}
                                                />
                                            )}
                                            {r.reponse}

                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}

                        </TableBody>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <div style={{ padding: "15px", display: 'flex', justifyContent: 'flex-end', marginRight: "10px" }}>
                            <MDButton type="button" variant="contained" color="primary" onClick={(event) => saveExamen(reponseQuestion, idpatient)}>
                                Submit
                            </MDButton></div>
                    </Table>
                </TableContainer>


            </form>
        </DashboardLayout>
    );
}

export default Examens;