'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { createEventSchema } from '../../../validationSchemas';
import { z } from 'zod';
import ErrorMessage from '../../../components/ErrorMessage';
import Spinner from '../../../components/Spinner';

type EventForm = z.infer<typeof createEventSchema>

const EditEvent = ({ params: { eventId } }) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [event, setEvent] = useState<EventForm>({
    title: "",
    description: "",
  });

  useEffect(() => {
    const getEvent = async () => {
      const { data } = await axios.get(`/api/events/${eventId}`);      
      setEvent({ title: data.title, description: data.description});
    }
    getEvent()    
  }, []);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<EventForm>({
    resolver: zodResolver(createEventSchema)
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setEvent({ ...event, [name]: value });
 };

  const onSubmit: SubmitHandler<EventForm> = async (data) => {
    try {
      setIsSubmitting(true);
      await axios.put(`/api/events/${eventId}`, data);
      router.push('/events');
    } catch (error) {
      setIsSubmitting(false);
      setError('Unexpected error');
    }
  }

  return (
    <div className='max-w-xl '>
    {
        (event.title && event.description) &&
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <TextField.Root>
          <TextField.Input
            placeholder="Name of the Event"
            name="title"
            defaultValue={event?.title}
            onChange={handleOnChange}
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <TextArea
          placeholder='Description'
          defaultValue={event?.description}
          name="description"
          onChange={handleOnChange}
          {...register('description')}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Save 
          { isSubmitting && <Spinner/> }
        </Button>
      </form>
    }
    </div>
  )
}

export default EditEvent