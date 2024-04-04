'use client'

import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EventCard from '../components/EventCard'

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
        <div className='mx-4'>
            <Button>
                <Link href="/events/create">
                    New Event
                </Link>
            </Button>
            <div className='mt-5 flex items-center flex-wrap gap-4'>
                {events &&
                    events.map(event =>
                        <div key={event.id}>
                            <EventCard 
                            eventId={event.id} 
                            title={event.title} 
                            description={event.description}
                            imageUrl={event.image}
                            handleDelete={handleDelete}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default EventsPage