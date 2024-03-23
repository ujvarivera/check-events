'use client'

import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const EventsPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const { data } = await axios.get('/api/events');
            setEvents(data);
        }
        getEvents()
    }, [events]);

    const handleDelete = async(eventId:String) => {
        const isConfirmed = confirm("Are you sure that you want to delete this event?");

        if (isConfirmed) {
            try {
                await axios.delete(`/api/events/${eventId}`)
            } catch (error) {
                
            }
        }
     };

    return (
        <div>
            <Button>
                <Link href="/events/create">
                    New Event
                </Link>
            </Button>
            <div className='space-y-2 mt-5'>
                {events &&
                    events.map(event =>
                        <div key={event.id}>
                            <Link href={`/events/${event.id}`}>{event.title}</Link>
                            <Button className='ml-4' onClick={() => handleDelete(event.id)}>X</Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default EventsPage