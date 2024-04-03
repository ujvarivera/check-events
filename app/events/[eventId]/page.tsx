'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Flex } from '@radix-ui/themes';
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
          <Flex className='pb-5 pr-2 float-right'>
            <Button>
              <Link href={`/events/${eventId}/edit`}>
                  Edit
              </Link>
            </Button>
          </Flex>
          <img src={event.image} alt="Picture of Event" 
            style={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: 500,
              backgroundColor: 'var(--gray-5)',
          }}/>
          <h1 className='text-2xl font-bold m-8 text-center'>{event.title}</h1>
          <div className='text-xl mb-8 mx-4'>{event.description}</div>
        </>
      }
    </div>
  )
}

export default Event