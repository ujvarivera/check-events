'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface EventForm {
  title: string;
  description: string;
}

const CreateNewEvent = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit
  } = useForm<EventForm>();

  const onSubmit: SubmitHandler<EventForm> = async (data) => {
    try {
      await axios.post('/api/events', data);
      router.push('/events');
    } catch (error) {
      setError('Unexpected error');
    }
  }

  return (
    <div className='max-w-xl '>
      {
        error &&
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      }

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <TextField.Root>
          <TextField.Input
            placeholder="Name of the Event"
            {...register('title')}
          />
        </TextField.Root>
        <TextArea
          placeholder='Description'
          {...register('description')}
        />
        <Button>Save</Button>
      </form>
    </div>
  )
}

export default CreateNewEvent