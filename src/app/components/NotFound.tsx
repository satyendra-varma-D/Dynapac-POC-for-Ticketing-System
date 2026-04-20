import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
}
