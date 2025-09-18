// Update this page (the content is just a fallback if you fail to update the page)
// This is now handled by the main App.tsx routing system

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard since this is now handled by App.tsx
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
