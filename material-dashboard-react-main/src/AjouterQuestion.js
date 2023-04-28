
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';
import TableContainer from "@mui/material/TableContainer";

const AjouterQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const [libellequestion, setLibellequestion] = useState('');
    const [typereponse, setTypereponse] = useState('');
    const [idexamen, setIdexamen] = useState('');
    const [reponses, setReponses] = useState('');
    const [examens, setExamens] = useState([]);
    const [idquestion, setIdquestion] = useState('');
    const [reponse, setReponse] = useState('');
    // const [listereponses, setListereponses] = useState([]);
   
    const ajouterQuestion = (event) => {
      event.preventDefault();
      Axios.post('http://localhost:8000/AjouterQuestion', {

        libellequestion: libellequestion,
        idexamen: idexamen,
      })
        .then((res) => {
          console.log(res);
          setQuestions([
            ...questions,
            {
              libellequestion: libellequestion,
              idexamen: idexamen,
            },
          ]);
          setLibellequestion('');
          setIdexamen('');
          console.log("question ajouté")
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
      Axios.get("http://localhost:8000/ListeExamens")
        .then((res) => {
          setExamens(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);


    // useEffect(() => {
    //   Axios.get("http://localhost:8000/ListeReponses")
    //     .then((res) => {
    //       setListereponses(res.data);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }, []);
    
    
    
    useEffect(() => {
      Axios.get("http://localhost:8000/ListeQuestions")
        .then((res) => {
          setQuestions(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);
    

const ajouterReponse = (event) => {
      event.preventDefault();
      Axios.post('http://localhost:8000/AjouterReponse', {
        reponse: reponse,
        typereponse: typereponse,
        idquestion: idquestion,
      })
        .then((res) => {
          console.log(res);
          setReponses([
            ...reponses,
            {
              reponse: reponse,
        typereponse: typereponse,
        idquestion: idquestion,
            },
          ]);
          setReponse('');
          setTypereponse('');
          setIdquestion('');
          console.log("reponse ajouté")
        })
        .catch((err) => console.log(err));
    };

    return (
      <DashboardLayout>
      <div style={{marginTop:"20px",padding:"10px"}} >
        <TableContainer>
          <div style={{padding:"10px"}}> 
            <h2>Ajouter nouvelle question</h2>
            <div>
              <label htmlFor="libellequestion">Question:</label>
              <input
                type="text"
                id="libellequestion"
                name="libellequestion"
                placeholder="Entrer votre question"
                value={libellequestion}
                onChange={(e) => setLibellequestion(e.target.value)}
                style={{
                  color: 'black',
                  border: '2px solid blue',
                  borderRadius: '5px',
                  padding: '10px',
                  flex: 2,
                  marginRight: '20px',
                }}
              />
              <label htmlFor="idexamen">Examen:</label>
              <select
                id="idexamen"
                name="idexamen"
                value={idexamen}
                onChange={(e) => setIdexamen(e.target.value)}
                style={{
                  color: 'black',
                  border: '2px solid blue',
                  borderRadius: '5px',
                  padding: '10px',
                  flex: 2,
                  marginRight: '20px',
                  marginTop:"10px",
                }}
              >
                <option value="">-- Choisissez un examen --</option>
                {examens.map((examen) => (
                  <option key={examen.id} value={examen.libelle}>
                    {examen.libelle} 
                  </option>
                ))}
              </select>
              <MDButton variant="contained" color="info" onClick={ajouterQuestion}>Ajouter</MDButton>
            </div>
          </div>
        </TableContainer>
      </div>
      <div style={{marginTop:"20px",padding:"10px"}}>
        <TableContainer>
          <div style={{padding:"10px"}}>
            <h2>Ajouter reponse</h2>
            <label htmlFor="reponse">Réponse:</label>
            <input
              type="text"
              id="reponse"
              name="reponse"
              placeholder="réponse"
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              style={{
                color: 'black',
                border: '2px solid blue',
                borderRadius: '5px',
                padding: '10px',
                flex: 2,
                marginRight: '20px',
              }}
            />
           <label htmlFor="typereponse">Type de réponse:</label>
<select
  id="typereponse"
  name="typereponse"
  value={typereponse}
  onChange={(e) => setTypereponse(e.target.value)}
  style={{
    color: 'black',
    border: '2px solid blue',
    borderRadius: '5px',
    padding: '10px',
    flex: 2,
    marginRight: '20px',
    marginTop: "10px",
  }}
>
  <option value="">-- Choisissez un type de réponse --</option>
  <option value="radio">Bouton radio</option>
  <option value="checkbox">Checkbox</option>
  <option value="champ">Champ de texte</option>
</select>
             <label htmlFor="idquestion">Question:</label>
              <select
                id="idquestion"
                name="idquestion"
                value={idquestion}
                onChange={(e) => setIdquestion(e.target.value)}
                style={{
                  color: 'black',
                  border: '2px solid blue',
                  borderRadius: '5px',
                  padding: '10px',
                  flex: 2,
                  marginRight: '20px',
                  marginTop:"10px",
                }}
              >
                 <option value="">-- Choisissez un question --</option>
                {questions.map((question) => (
                  <option key={question.id} value={question.libellequestion}>
                    {question.libellequestion} 
                  </option>
                ))}
              </select>
              <MDButton variant="contained" color="info" onClick={ajouterReponse}>Ajouter</MDButton>
          </div>
        </TableContainer>
      </div>
    </DashboardLayout>
    );
  };
  
  export default AjouterQuestion;