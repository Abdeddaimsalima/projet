import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import MDButton from "components/MDButton";
import Table from "@mui/material/Table";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { ToastContainer, toast } from 'react-toastify';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import moment from 'moment';

const UpdateEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        date: "",
        heuredebut: "",
        heurefin: "",
        iduser: "",
        idpatient: "",
      
    });

    useEffect(() => {
        Axios.get(`http://localhost:8000/event/${id}`)
          .then((response) => {
            setEvent(response.data[0]);
          })
          .catch((error) => console.error(error));
      }, [id]);
      
      const handleUpdate = (event) => {
        event.preventDefault();
        Axios.put(`http://localhost:8000/event/update/${id}`, event)
          .then((response) => {
           
           
          })
          .catch((error) => console.error(error));
      };

      return ( 
        <DashboardLayout>
          <form onSubmit={handleUpdate}>
            <MDTypography variant="h5">Modifier un rendez-vous</MDTypography>
            <TableContainer style={{marginTop:'20px'}}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Date:</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={event.date}
                        onChange={(e) => setEvent({...event,date:e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Heure de début:</TableCell>
                    <TableCell>
                      <input
                        type="time"
                        value={event.heuredebut}
                        onChange={(e) => setEvent({...event,heuredebut:e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Heure de fin:</TableCell>
                    <TableCell>
                      <input
                        type="time"
                        value={event.heurefin}
                        onChange={(e) => setEvent({...event,heurefin:e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ID utilisateur:</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={event.iduser}
                        onChange={(e) => setEvent({...event,iduser:e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ID patient:</TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={event.idpatient}
                        onChange={(e) => setEvent({...event,idpatient:e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <MDBox display="flex" justifyContent="flex-end" mt={2}>
              <MDButton type="submit">Modifier</MDButton>
            </MDBox>
          </form>
        </DashboardLayout>
      );
}
 
export default UpdateEvent;