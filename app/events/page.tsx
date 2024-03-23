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
    }, []);

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
                        <div>
                            <Link href={`/events/${event.id}`} key={event.id}>{event.title}</Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default EventsPage