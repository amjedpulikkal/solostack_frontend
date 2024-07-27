
import { Page404 } from '@/page/404';
import { RootState } from '@/redux/store';
import { Iauthor } from '@/type';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';


export function MentorProtectedRouter(): JSX.Element {
  const navigate = useNavigate();
  // const { author } = useAuthor();
  const author = useSelector((state: RootState) => state.author?.author) as unknown as Iauthor
  const isMentor = author === "mentor";

  React.useEffect(() => {
    if (!isMentor) {
      navigate("/login");
    }
  }, [isMentor, navigate]);

  return isMentor ? <Outlet /> : <Page404 />;
}

