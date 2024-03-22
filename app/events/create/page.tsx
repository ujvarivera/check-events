'use client';

import React from 'react';
import axios from 'axios';
import { Button, TextArea, TextField } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface EventForm {
  title: string;
  description: string;
}

const CreateNewEvent = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit
  } = useForm<EventForm>();

  const onSubmit: SubmitHandler<EventForm> = async (data) => {
    await axios.post('/api/events', data);
    router.push('/events');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl space-y-3'>
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
  )
}

export default CreateNewEvent