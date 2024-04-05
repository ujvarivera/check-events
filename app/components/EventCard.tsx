import { Box, Button, Card, Inset, Strong, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EventCard = ({eventId, title, description, handleDelete, imageUrl=null}) => {
    return (
        <Box className='hover:scale-110 w-[400px]'>
            <Card size="2">
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src={imageUrl ? imageUrl: "https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"}
                        alt="Bold typography"
                        style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            height: 140,
                            backgroundColor: 'var(--gray-5)',
                        }}
                    />
                </Inset>
                <Box className='flex items-center justify-between'>
                    <Text size="3">
                        <div className='mb-2'>
                            <Strong>
                                <Link href={`/events/${eventId}`}>{title}</Link>
                            </Strong>
                            <div className='mt-2'>{description.slice(0, 30) + '...'}</div>
                        </div>
                    </Text>
                    <Button className='ml-4' onClick={() => handleDelete(eventId)}>X</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default EventCard