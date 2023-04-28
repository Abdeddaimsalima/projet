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
import  MenuItem  from "@mui/material/MenuItem" ;
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';
import TableContainer from "@mui/material/TableContainer";

const Ajouterpatient = () => {

    const [numeroPatient, setNumeroPatient] = useState('');
    const [nomPatient, setNomPatient] = useState('');
    const [prenomPatient, setPrenomPatient] = useState('');
    const [date_naissance, setDateNaissance] = useState('');
    const [adresse, setAdresse] = useState('');
    const [numtelephone, setNumTelephone] = useState('');
    const [sexe, setSexe] = useState('');
    const [situationfamiliale, setSituationFamiliale] = useState('');
    const [antécédentsmedicaux, setAntécédentsMedicaux] = useState('');
    const notifySuccess = () => toast.success("patient ajouté!");

    const ajouterPatient = () => {
        Axios.post('http://localhost:8000/Ajouterpatient', {
          numeroPatient,
          nomPatient,
          prenomPatient,
          date_naissance,
          adresse,
          numtelephone,
          sexe,
          situationfamiliale,
          antécédentsmedicaux,
        })
        .then(res => {
          console.log(res);
          notifySuccess();
        })
        .catch(err => {
          console.error(err);
        });
      }
 
      
      return (
      
        <DashboardLayout>
               

         <div style={{ display: 'flex', justifyContent: 'center' }}>
  <form style={{ backgroundColor: 'white', padding: '50px', borderRadius: '10px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', width: '50%', marginTop: '5px' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Ajouter patient</h2>
    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td><label htmlFor="numeroPatient">Numéro de patient:</label></td>
          <td>
  <input type="text" id="numeroPatient" onChange={e => setNumeroPatient(e.target.value)} style={{
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      color: '#333',
      marginBottom: '10px'
  }} />
</td>
        </tr>
        <tr>
          <td><label htmlFor="nomPatient">Nom du patient:</label></td>
          <td><input type="text" id="nomPatient" onChange={e => setNomPatient(e.target.value)} style={{ 
             width: '100%',
             padding: '10px',
             border: '1px solid #ccc',
             borderRadius: '5px',
             backgroundColor: '#f9f9f9',
             color: '#333',
             marginBottom: '10px'
          }} /></td>
        </tr>
        <tr>
          <td><label htmlFor="prenomPatient">Prénom du patient:</label></td>
          <td><input type="text" id="prenomPatient" onChange={e => setPrenomPatient(e.target.value)} style={{ 
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              color: '#333', 
              marginBottom: '10px'
          }} /></td>
        </tr>
        <tr>
          <td><label htmlFor="date_naissance">Date de naissance:</label></td>
          <td><input type="date" id="date_naissance" onChange={e => setDateNaissance(e.target.value)} style={{ 
               width: '100%',
               padding: '10px',
               border: '1px solid #ccc',
               borderRadius: '5px',
               backgroundColor: '#f9f9f9',
               color: '#333',
               marginBottom: '10px'
          }} /></td>
        </tr>
        <tr>
          <td><label htmlFor="adresse">Adresse:</label></td>
          <td><input type="text" id="adresse" onChange={e => setAdresse(e.target.value)} style={{ 
               width: '100%',
               padding: '10px',
               border: '1px solid #ccc',
               borderRadius: '5px',
               backgroundColor: '#f9f9f9',
               color: '#333',
               marginBottom: '10px'
          }} /></td>
        </tr>
        <tr>
          <td><label htmlFor="numtelephone">Numéro de téléphone:</label></td>
          <td><input type="text" id="numtelephone" onChange={e => setNumTelephone(e.target.value)} style={{ 
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              color: '#333',
              marginBottom: '10px'
          }} /></td>
        </tr>
        <tr>
  <td><label htmlFor="sexe">Sexe:</label></td>
  <td>
    <select id="sexe" onChange={e => setSexe(e.target.value)} style={{ 
       width: '100%',
       padding: '10px',
       border: '1px solid #ccc',
       borderRadius: '5px',
       backgroundColor: '#f9f9f9',
       color: '#333', 
       marginBottom: '10px'
    }}>
      <option value="">Sélectionnez</option>
      <option value="homme">Homme</option>
      <option value="femme">Femme</option>
    </select>
  </td>
</tr>
<tr>
  <td><label htmlFor="situationfamiliale">Situation familiale:</label></td>
  <td>
    <select id="situationfamiliale" onChange={e => setSituationFamiliale(e.target.value)} style={{ 
       width: '100%',
       padding: '10px',
       border: '1px solid #ccc',
       borderRadius: '5px',
       backgroundColor: '#f9f9f9',
       color: '#333', 
       marginBottom: '10px'
    }}>
      <option value="">Sélectionnez</option>
      <option value="célibataire">Célibataire</option>
      <option value="marié(e)">Marié(e)</option>
      <option value="divorcé(e)">Divorcé(e)</option>
      <option value="veuf(ve)">Veuf(ve)</option>
    </select>
  </td>
</tr>
        <tr>
          <td><label htmlFor="antecedentsmedicaux">Antécédents médicaux:</label></td>
          <td><input type="text" id="antecedentsmedicaux" onChange={e => setAntécédentsMedicaux(e.target.value)}  style={{ 
               width: '100%',
               padding: '10px',
               border: '1px solid #ccc',
               borderRadius: '5px',
               backgroundColor: '#f9f9f9',
               color: '#333',
               marginBottom: '10px'
          }}/></td>
        </tr>
      </tbody>
    </table>
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
     <MDButton color="info" onClick={ajouterPatient} component={Link} to="/ListePatient">enregistrer</MDButton>
</div>
  </form>
</div>
        </DashboardLayout>
      );
}
 
export default Ajouterpatient;