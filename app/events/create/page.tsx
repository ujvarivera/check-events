'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const CreateNewEvent = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextField.Input placeholder="Name of the Event" />
        </TextField.Root>
        <TextArea placeholder='Description'/>
        <Button>Save</Button>
    </div>
  )
}

export default CreateNewEvent