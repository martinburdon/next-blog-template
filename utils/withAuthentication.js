import { useEffect } from 'react';
import { useAuth } from '../utils/auth';
import { useRouter } from 'next/router';

export function withAuthentication(Component) {
  return () => {
    const { isLoading, userId } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (!userId && !isLoading) router.push('/login');
    }, [isLoading, userId])

    return (<Component {...arguments} />)
  }
}
