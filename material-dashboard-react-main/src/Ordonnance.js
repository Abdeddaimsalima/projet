import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import { Editor } from '@tinymce/tinymce-react';
import jwt_decode from "jwt-decode";
import bgImage from "assets/images/lg.jpg";
import SignaturePad from 'react-signature-canvas'
import { ToastContainer, toast } from 'react-toastify';


const Ordonnance = () => {
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    const [date, setDate] = useState("");
    const [idmedecin, setIdmedecin] = useState(decoded.id);
    const { id } = useParams();
    const [editorContent, setEditorContent] = useState("");
    const [nomPatient, setPatientName] = useState("");
    const [name, setMedecinName] = useState("");
    const [signature, setSignature] = useState(null);
    const sigCanvasRef = useRef(null);
    useEffect(() => {
        if (id) {
            Axios.get(`http://localhost:8000/patients/${id}`)
                .then((res) => {
                    setPatientName(res.data[0].nomPatient + " " + res.data[0].prenomPatient);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            Axios.get("http://localhost:8000/med/" + decoded.id)
                .then((res) => {
                    setMedecinName(res.data.name);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [id]);
    const ajouterOrdonnance = (id) => {
        if (signature != null && date !== "" && editorContent !== "") {
            Axios.post(`http://localhost:8000/AjouterOrdonnance/${id}`, {
                date,
                description: editorContent,
                idmedecin,
                signature,
            })
                .then((res) => {

                    console.log(res);
                    setPatientName(res.data.nomPatient);
                    toast.success("Ordonnance ajoutée avec succées ");
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            toast.error("veuillez remplir tous les champs ");
        }
    };

    const Imprimer = (id) => {
        {
            Axios.post(`http://localhost:8000/generatePDF/${id}`, {
                date,
                description: editorContent,
                idmedecin,
                signature,
            })
                .then((res) => {
                    console.log(res);
                    setPatientName(res.data.nomPatient);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleEditorChange = (content, editor) => {
        setEditorContent(content);
    };


    const handleClearSignature = () => {
        if (sigCanvasRef.current) {
            sigCanvasRef.current.clear();
        }
    };
    const handleGetSignature = () => {
        if (sigCanvasRef.current) {
            const signatureImage = sigCanvasRef.current.getTrimmedCanvas().toDataURL();

            setSignature(signatureImage);
        }
    };


    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split("T")[0];
        setDate(formattedDate);
    }, []);
    return (
        <DashboardLayout style={{ height: "100vh", overflowY: "scroll" }}>
            <ToastContainer />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <form style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', width: '50%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={bgImage} alt="Logo" style={{ marginBottom: "20px" }} />
                        <div style={{ marginLeft: '80px' }}>
                            <label style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: "10px" }}> ORDONNANCE MEDICALE</label>
                            <br />
                            <label >Sfax le :</label>
                            <input
                                type="date"
                                style={{
                                    padding: "8px",
                                    border: "none",
                                    borderRadius: "4px",
                                    backgroundColor: "#f0f0f0",
                                    color: "#333",
                                    fontSize: "14px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    outline: "none",
                                    marginLeft: "10px"
                                }}
                                value={date}
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>
                    <br />
                    <p style={{ marginBottom: "10px" }}>Nom du patient : {nomPatient}</p>
                    <label>Description :</label>
                    <Editor
                        apiKey="lhpg097gn02gnva7jmvpnql794d8sviz05c1lcjmrwxpkflf"
                        init={{ plugins: 'link table', initialValue: editorContent }}
                        onEditorChange={handleEditorChange}
                    />
                    <br />
                    <p style={{ marginBottom: "10px" }}>Nom du medecin : {name}</p>
                    <label>Signature:</label>
                    <div style={{ border: "1px solid #000", padding: "10px", marginBottom: "10px" }}>

                        <SignaturePad
                            ref={sigCanvasRef}
                            canvasProps={{ className: 'signature-canvas' }}
                        />
                    </div>
                    <div  > {signature && <img src={signature} alt="Signature" />}</div>
                    <div style={{ marginTop: "20px" }}>

                        <button
                            type="button"
                            onClick={handleGetSignature}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#fff",
                                color: "#337ab7",
                                border: "1px solid #337ab7",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginRight: "10px"
                            }}
                        >
                            Verrouiller signature
                        </button>
                        <button
                            type="button"
                            onClick={handleClearSignature}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#fff",
                                color: "#337ab7",
                                border: "1px solid #337ab7",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Effacer signature
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: "10px" }}>
                        <MDButton variant="gradient" color="info" onClick={() => ajouterOrdonnance(id)} style={{ marginRight: "10px" }}>Ajouter </MDButton>
                        <MDButton variant="gradient" color="info" onClick={() => Imprimer(id)}>Imprimer </MDButton>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default Ordonnance;
