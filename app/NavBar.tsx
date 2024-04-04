'use client' // because of the usePathname

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from './components/LogoutButton'
import useUserData from './hooks/useUserData'

const NavBar = () => {
    const currentPath = usePathname();
    const { username } = useUserData()

    const links = [
        { name: 'Dashboard', href: '/', show: true },
        { name: 'Events', href: '/events', show: !!username },
        { name: 'Register', href: '/register', show: !username },
        { name: 'Login', href: '/login', show: !username },
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 h-14 items-center px-5'>
            <Link href="/" className='text-blue-500 font-bold tracking-widest text-xl'>CheckEvents</Link>
            <ul className='flex space-x-6 flex-grow'>
                {
                    links.map(link =>
                        <Link href={link.href} key={link.href} className={`${link.href === currentPath && 'font-bold'} ${link.show ? 'visiblie' : 'hidden'} text-blue-500 hover:text-blue-900`}>
                            {link.name}
                        </Link>
                    )
                }
            </ul>
            <p>{ username && username }</p>
            { username && <LogoutButton /> }
        </nav>
    )
}

export default NavBar