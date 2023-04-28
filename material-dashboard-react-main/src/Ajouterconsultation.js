
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MDButton from "components/MDButton";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { useParams} from "react-router-dom";


const notifySuccess = () => {
    toast.success("consultation Ajouté !");
  };
  

  const Ajouterconsultation = () => {
    const [dateconsultation, setDateconsultation] = useState("");
    const [heuredebut, setHeuredebut] = useState("");
    const [heurefin, setHeurefin] = useState("");
    const [medecins, setMedecins] = useState([]);
    const [idmedecin, setIdmedecin] = useState("");
    const [idpatient, setIdpatient] = useState("");
    const [notes, setNotes] = useState("");
   const { id } = useParams(); 

   useEffect(() => {
    Axios.get("http://localhost:8000/medecins")
      .then((res) => {
        setMedecins(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  
    const ajouter = (id) => {
        Axios.post(`http://localhost:8000/Ajouterconsultation/${id}`, {
          dateconsultation,
          heuredebut,
          heurefin,
          idmedecin,
          notes,
        })
        .then((res) => {
          console.log(res.data);
          setDateconsultation("");
          setHeuredebut("");
          setHeurefin("");
          setIdmedecin("");
          setNotes("");
          setIdpatient("");
          notifySuccess();
        
        })
        .catch((err) => {
          console.error(err);
          
        });
      };


      return (
        <DashboardLayout>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form style={{ 
              backgroundColor: 'white', 
              padding: '50px', 
              borderRadius: '10px', 
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', 
              width: '50%', 
              marginTop: '5px' 
            }}>
              <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Consultation</h2>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="dateconsultation">Date consultation</label>
                    </td>
                    <td>
                      <input
                        type="date"
                        id="dateconsultation"
                        name="dateconsultation"
                        value={dateconsultation}
                        onChange={(e) => setDateconsultation(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9',
                            color: '#333',
                            marginBottom: '10px'
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="heuredebut">Heure début</label>
                    </td>
                    <td>
                      <input
                        type="time"
                        id="heuredebut"
                        name="heuredebut"
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
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="heurefin">Heure fin</label>
                    </td>
                    <td>
                      <input
                        type="time"
                        id="heurefin"
                        name="heurefin"
                        value={heurefin}
                        onChange={(e) => setHeurefin(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9',
                            color: '#333',
                            marginBottom: '10px'
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="idmedecin">ID médecin</label>
                    </td>
                    <td>
                    <select value={idmedecin} onChange={(e) => setIdmedecin(e.target.value)}
                    style={{ 
       width: '100%',
       padding: '10px',
       border: '1px solid #ccc',
       borderRadius: '5px',
       backgroundColor: '#f9f9f9',
       color: '#333', 
       marginBottom: '10px'
    }}>
          {medecins.map((medecin) => (
            <option key={medecin.id} value={medecin.id}>
              {medecin.id} 
            </option>
          ))}
        </select>
                    </td>
                  </tr>
              
                  <tr>
                    <td>
                        <div style={{marginTop:"10px"}}>
                      <label htmlFor="notes" >Description</label>
                      </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
                      <textarea
                        id="notes"
                        name="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{
                            width: '165%',
                            marginTop:'10px',
                            padding:'20px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9',
                            color: '#333',
                            marginBottom: '10px'
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}> 
                <MDButton color="success" onClick={() => ajouter(id)}>Ajouter consultation</MDButton>
              </div> 
            </form>
          </div>
        </DashboardLayout>
      );
}
export default Ajouterconsultation;