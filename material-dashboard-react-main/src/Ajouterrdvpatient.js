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

import { useParams } from "react-router-dom";

const notifySuccess = () => {
  toast.success("");
};

const notifyError = () => {
  toast.error("rendez vous existe deja ");
};
const Ajouterrdvpatient = () => {
  const [date, setDate] = useState("");
  const [heuredebut, setHeuredebut] = useState("");
  const [heurefin, setHeurefin] = useState("");
  const [iduser, setIduser] = useState("");
  const [idpatient, setIdpatient] = useState("");
  // const [events, setEvents] = useState([]);
  // const [rdv, setRdv] = useState([]);
  // const [appointments, setAppointments] = useState([]);
  // const [patients, setPatients] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:8000/ListePatient/get/${id}`)
      .then((res) => {
        setIdpatient(res.data.id);
      })
      .catch((err) => {
        console.error(err);
      });


  }, [id]);

  const ajouter = (id) => {
    // Vérifier si un rendez-vous existe déjà à cette date et heure de début
    const existingAppointment = appointments.find(
      (appointment) =>
        appointment.date === date && appointment.heuredebut === heuredebut
    );

    if (existingAppointment) {
      notifyError(); // Afficher un message d'erreur
    } else {
      // Ajouter un nouveau rendez-vous
      Axios.post(`http://localhost:8000/Ajouterrdvpatient/${id}`, {
        date,
        heuredebut,
        heurefin,
        iduser,
        title: "Nouveau rendez-vous",
      })
        .then((res) => {
          console.log(res.data);
          setDate("");
          setHeuredebut("");
          setHeurefin("");
          setIduser("");
          setIsValid(false);
          notifySuccess(); // Afficher un message de succès
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleInputChange = () => {
    if (date) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    handleInputChange();
  }, [date]);

  return (
    <DashboardLayout>
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form style={{ backgroundColor: 'white', padding: '50px', borderRadius: '10px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', width: '50%', marginTop: '5px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Ajouter un rendez-vous</h2>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td><label>date</label></td>
                <td>
                  <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} style={{
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
                <td><label htmlFor="heuredebut">heuredebut</label></td>
                <td><input type="time"
                  id="heuredebut"
                  value={heuredebut}
                  onChange={(e) => setHeuredebut(e.target.value)}
                  style={{
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
                <td><label htmlFor="heurefin">heurefin</label></td>
                <td><input type="time"
                  id="heurefin"
                  value={heurefin}
                  onChange={(e) => setHeurefin(e.target.value)} style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9',
                    color: '#333',
                    marginBottom: '10px'
                  }} /></td>
              </tr>




            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
            <MDButton
              variant="gradient"
              type="submit"
              disabled={!isValid}
              onClick={() => ajouter(id)}
              component={Link} to="/Ajouterrdv/:id"

            >
              Ajouter rendez-vous
            </MDButton>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Ajouterrdvpatient;