import { useCookies } from 'next-client-cookies';

const useUserData = () => {
    const cookies = useCookies();
    const username = cookies.get('username');

    return {
        username
    }
}

export default useUserData