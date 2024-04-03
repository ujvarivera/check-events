'use client'

import React, { useRef, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserSchema } from '../validationSchemas';
import { z } from 'zod';
import { Button, Text, TextArea, TextField } from '@radix-ui/themes'
import Spinner from '../components/Spinner';

type RegisterForm = z.infer<typeof createUserSchema>

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({
    resolver: zodResolver(createUserSchema)
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData(formRef.current);
      await axios.post('/api/register', formData);
      router.push('/events');
    } catch (error) {
      setIsSubmitting(false);
      setError(error.response.data.message);
    }
  }

  return (
    <div className='max-w-xl'>
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className='space-y-3'>
      <TextField.Root>
          <TextField.Input
            placeholder="Full Name"
            {...register('name')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>


        <TextField.Root>
          <TextField.Input
            placeholder="Username"
            {...register('username')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.username?.message}</ErrorMessage>

        <TextField.Root>
          <TextField.Input
            placeholder="Email"
            type='email'
            {...register('email')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>

        <TextField.Root>
          <TextField.Input
            placeholder="Password"
            type='password'
            {...register('password')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>

        <TextField.Root>
          <TextField.Input
            placeholder="Password Confirmation"
            type='password'
            {...register('confirmPassword')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

        {
          error && <ErrorMessage>{error}</ErrorMessage>
        }

        <Button disabled={isSubmitting}>
          Save
          {isSubmitting && <Spinner />}
        </Button>
      </form>

    </div>
  )
}

export default RegisterPage