import React, { useState, useEffect } from 'react';
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const localizer = momentLocalizer(moment);


const AfficherRdv = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/AfficherRdv")
      .then((res) => {
        const events = res.data.map((appointment) => ({
          id: appointment.id,
          title: "Nouveau rendez-vous",
          start: moment.utc(
            appointment.date + 'T' + appointment.heuredebut,
            'YYYY-MM-DDTHH:mm:ss'
          ).toDate(), 
          end: moment.utc(
            appointment.date + 'T' + appointment.heurefin,
            'YYYY-MM-DDTHH:mm:ss'
          ).toDate(), 
        }));
        setEvents(events);
        console.log(events);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <DashboardLayout >
      <DashboardNavbar />

    <div>
    <Calendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  style={{ height: 700 }}
  eventPropGetter={(event) => ({
    style: {
      backgroundColor: "#4169E1", // customize the background color of each event
      borderRadius: "5px",
      padding: "5px",
      display: "flex",
      alignItems: "center"
    },
    title: (
      <>
        
        {event.title}
      </>
    ) // customize the title and add the icon to each event
  })}
/>
    </div>
    </DashboardLayout>
  );
};

export default AfficherRdv;