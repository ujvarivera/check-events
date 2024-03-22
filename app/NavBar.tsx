'use client' // because of the usePathname

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { name: 'Dashboard', href: '/' },
        { name: 'Events', href: '/events' }
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 h-14 items-center px-5'>
            <Link href="/" className='text-blue-500 font-bold tracking-widest text-xl'>CheckEvents</Link>
            <ul className='flex space-x-6'>
                {
                    links.map(link =>
                        <Link href={link.href} key={link.href} className={`${link.href === currentPath && 'font-bold'}  text-blue-500 hover:text-blue-900`}>
                            {link.name}
                        </Link>
                    )
                }
            </ul>
        </nav>
    )
}

export default NavBar