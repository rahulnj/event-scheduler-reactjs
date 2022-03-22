import React, { useState } from "react";
import './App.css'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import Modal from './components/Modal/Modal'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];


const App = () => {
  const [createEvent, setCreateEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  const [isEventModal, setIsEventModal] = useState(false)

  return (
    <>
      <Modal isEventModal={isEventModal}
        setIsEventModal={setIsEventModal}
        createEvent={createEvent}
        setCreateEvent={setCreateEvent}
        setAllEvents={setAllEvents}
        allEvents={allEvents}
      />
      <div className="app">
        <div className="app-header">
          <button
            onClick={() => setIsEventModal(true)}
            className="button-59" role="button">+Add Event</button>
        </div>
        <Calendar

          localizer={localizer}
          events={allEvents}
          startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
      </div>
    </>
  );
}

export default App;
