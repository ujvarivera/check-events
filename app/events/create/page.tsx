'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { createEventSchema } from '../../validationSchemas';
import { z } from 'zod';

type EventForm = z.infer<typeof createEventSchema>

/*
interface EventForm {
  title: string;
  description: string;
}
*/

const CreateNewEvent = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitted, isValid}
  } = useForm<EventForm>({
    resolver: zodResolver(createEventSchema)
  });

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
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <TextField.Root>
          <TextField.Input
            placeholder="Name of the Event"
            {...register('title')}
          />
        </TextField.Root>
        { errors.title &&
          <Text color="red" as='p'>{errors.title.message}</Text>
        }

        <TextArea
          placeholder='Description'
          {...register('description')}
        />
        { errors.description &&
          <Text color="red" as='p'>{errors.description.message}</Text>
        }

        <Button>Save</Button>
      </form>
    </div>
  )
}

export default CreateNewEvent