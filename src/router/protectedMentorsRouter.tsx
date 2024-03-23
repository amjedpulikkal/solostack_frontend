import { useAuthor } from '@/components/switchUser-provider';
import { Page404 } from '@/page/404';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function MentorProtectedRouter(): JSX.Element {
  const navigate = useNavigate();
  const { author } = useAuthor();
  const isMentor = author === "mentor";
  
  React.useEffect(() => {
    if (!isMentor) {
      navigate("/login");
    }
  }, [isMentor, navigate]);

  return isMentor ? <Outlet /> :<Page404/>;
};

