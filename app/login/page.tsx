'use client'

import React, { useRef, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { loginUserSchema } from '../validationSchemas';
import { z } from 'zod';
import { Button, Text, TextArea, TextField } from '@radix-ui/themes'
import Spinner from '../components/Spinner';

type LoginForm = z.infer<typeof loginUserSchema>

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginForm>({
    resolver: zodResolver(loginUserSchema)
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData(formRef.current);
      await axios.post('/api/login', formData);
      router.push('/events');
    } catch (error) {
      setIsSubmitting(false);
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  }

  return (
    <div className='max-w-xl'>
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className='space-y-3'>
      <TextField.Root>
          <TextField.Input
            placeholder="Username"
            {...register('username')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.username?.message}</ErrorMessage>

        <TextField.Root>
          <TextField.Input
            placeholder="Password"
            type='password'
            {...register('password')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>

        {
          error && <ErrorMessage>{error}</ErrorMessage>
        }

        <Button disabled={isSubmitting}>
          Save 
          { isSubmitting && <Spinner/> }
        </Button>
      </form>
    </div>
  )
}

export default LoginPage