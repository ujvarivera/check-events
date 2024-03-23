'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

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
          <Button>
            <Link href={`/events/${eventId}/edit`}>
                Edit
            </Link>
          </Button>
          <div>{event.title}</div>
          <div>{event.description}</div>
        </>
      }
    </div>
  )
}

export default Event