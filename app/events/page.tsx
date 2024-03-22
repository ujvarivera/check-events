import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EventsPage = () => {
    return (
        <div>
            <Button>
                <Link href="/events/create">
                    New Event
                </Link>
            </Button>
        </div>
    )
}

export default EventsPage