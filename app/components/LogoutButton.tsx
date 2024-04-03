import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await axios.get('/api/logout')
        router.push('/login');
    }

    return (
        <Flex className='ml-auto'>
            <Button onClick={handleLogout}>Logout</Button>
        </Flex>
    )
}

export default LogoutButton