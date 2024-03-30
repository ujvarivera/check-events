'use client';

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { createEventSchema } from '../../validationSchemas';
import { z } from 'zod';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';

type EventForm = z.infer<typeof createEventSchema>

const CreateNewEvent = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitted, isValid}
  } = useForm<EventForm>({
    resolver: zodResolver(createEventSchema)
  });

  const onSubmit: SubmitHandler<EventForm> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData(formRef.current);
      await axios.post('/api/events', formData);
      router.push('/events');
    } catch (error) {
      setIsSubmitting(false);
      setError('Unexpected error');
      console.log(error);
    }
  }

  return (
    <div className='max-w-xl '>
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className='space-y-3'>
        <TextField.Root>
          <TextField.Input
            placeholder="Name of the Event"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <TextArea
          placeholder='Description'
          {...register('description')}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <TextField.Root>
          <TextField.Input
            placeholder="Upload an image"
            type="file"
            accept="image/*"
            {...register('file')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.file?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Save 
          { isSubmitting && <Spinner/> }
        </Button>
      </form>
    </div>
  )
}

export default CreateNewEvent