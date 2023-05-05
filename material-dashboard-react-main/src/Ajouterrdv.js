import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link, useParams } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment);

const Ajouterrdv = () => {
  const [date, setDate] = useState("");
  const [heuredebut, setHeuredebut] = useState("");
  const [heurefin, setHeurefin] = useState("");
  const [idpatient, setIdpatient] = useState("");
  const [events, setEvents] = useState([]);
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:8000/ListePatient/get/${id}`)
      .then((res) => {
        setIdpatient(res.data.id);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  useEffect(() => {
    setIdpatient(id);
    Axios.get(`http://localhost:8000/PatientAppointments/${id}`)
      .then((response) => {
        setAppointments(response.data);
        const newEvents = response.data.map((appointment) => ({
          id: appointment.id,
          title: `Rendez-vous avec ${appointment.nomPatient}`,
          start: moment.utc(appointment.date + 'T' + appointment.heuredebut, 'YYYY-MM-DDTHH:mm:ss').toDate(),
          end: moment(appointment.date + 'T' + appointment.heurefin, 'YYYY-MM-DDTHH:mm:ss').toDate(),

        }));
        setEvents([...events, ...newEvents]);
        console.log(newEvents, events);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSelect = ({ start, end, view }) => {
    // creation du rdv
    const newAppointment = {
      date: moment(start).format("YYYY-MM-DD"),
      heuredebut: moment(start).format("HH:mm:ss"),
      heurefin: moment(start).add(1, "hour").format("HH:mm:ss"),
      iduser: "",
      title: "Nouveau rendez-vous",
    };
    setAppointments([...appointments, newAppointment]);

    // Create a new event 
    const newEvent = {
      title: "rendez-vous",
      start,
      end: moment(start).add(1, "hour").toDate(),
      id: newAppointment.id,
    };
    setEvents([...events, newEvent]);
    setDate(newAppointment.date);
    setHeuredebut(newAppointment.heuredebut);
    setHeurefin(newAppointment.heurefin);
  };
  useEffect(() => {
    console.log("Events:", events);
    console.log("Appointments:", appointments);
  }, [events, appointments]);

  const handlerendezvousClick = (id) => {
    navigate(`/Ajouterrdvpatient/${id}`);
  };
  const handleeventClick = (id) => {
    navigate(`/event/${id}`);
  };
  return (
    <DashboardLayout>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "20px" }}>
        <MDButton
          variant="gradient"
          color="info"
          onClick={() => handlerendezvousClick(id)}
        >
          Ajouter rendez-vous
        </MDButton>
      </div>
      <div style={{ padding: '20px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          style={{ height: "95vh" }}
          defaultView={"month"}
          views={['month', 'week', 'day']}
          onSelectSlot={handleSelect}
          onSelectEvent={(event) => handleeventClick(event.id)}
        />
      </div>
    </DashboardLayout>
  );
}

export default Ajouterrdv; 