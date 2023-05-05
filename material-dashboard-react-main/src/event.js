import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useNavigate,Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import MDButton from "components/MDButton";

const Events = () => {
     const [events, setEvents] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {

      const getEvent = () => {
        Axios.get(`http://localhost:8000/event/${id}`).then((res) => {
          console.log('detailsrendezvous', res);
          setEvents(res.data);
        });
      };
    
      getEvent();
    
      }, []);

      const handleDelete = (id) => {
        if (window.confirm("confirmer suppression")) {
          Axios.delete(`http://localhost:8000/event/${id}`)
            .then((res) => {
              navigate(`/Ajouterrdv/${id}`);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
      const handleUpdateEventClick = (id) => {
        navigate(`/event/update/${id}`);
      };
    return ( 
         <DashboardLayout >
             <div style={{ display: 'flex', justifyContent: 'center' }}>
             <form style={{ backgroundColor: 'white', padding: '50px', borderRadius: '10px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', width: '50%', marginTop: '5px' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Details d'un rendez-vous</h2>
    <table style={{ width: '100%' }}>
        {events.map( event => (
          <div key={event.id} className="patient-container">
           <TableBody>
                  <TableRow>
                    <TableCell>date</TableCell>
                    <TableCell>{event.date}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heure debut :</TableCell>
                    <TableCell>{event.heuredebut}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heure fin:</TableCell>
                    <TableCell>{event.heurefin}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>iduser:</TableCell>
                    <TableCell>{event.iduser}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>nom patient</TableCell>
                    <TableCell>{event.idpatient}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>

  <TableCell >
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <MDButton style={{marginRight:'10px'}} variant="gradient" color="info" onClick={() => handleUpdateEventClick(event.id)}>
     modifier
    </MDButton>
    <MDButton variant="gradient" color="error" onClick={() => handleDelete(event.id)}>
      supprimer
    </MDButton>
    </div>
  </TableCell>
</TableRow>  
  </TableBody>
             
           </div>
          
        ))}
        </table>
        </form>
        </div>
      </DashboardLayout> 
    );
}
export default Events;