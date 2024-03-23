'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Event = ({ params: { eventId } }) => {
  const [event, setEvent] = useState({});

  useEffect(() => {
    const getEvent = async () => {
      const { data } = await axios.get(`/api/events/${eventId}`);
      setEvent(data);
    }
    getEvent()
  }, []);

  return (
    <div>
      {
        event &&
        <>
          <div>{event.title}</div>
          <div>{event.description}</div>
        </>
      }
    </div>
  )
}

export default Event