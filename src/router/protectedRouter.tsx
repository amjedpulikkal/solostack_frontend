import NaveBar from '@/components/navBar';
import { useAuthor } from '@/components/switchUser-provider';
import { Page404 } from '@/page/404';
import { RootState } from '@/redux/store';
import { Iauthor } from '@/type';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
export function StudentParentRoute(): JSX.Element {
  const navigate = useNavigate();
  // const { author } = useAuthor();

  const author = useSelector((state: RootState) => state.author?.author) as unknown as Iauthor
  const isStudent = author === "student";
  console.log(isStudent);
  console.log(author);

  React.useEffect(() => {
    if (!isStudent) {
      navigate("/login");
    }
  }, [isStudent, navigate]);

  return isStudent ? <><NaveBar /><Outlet /> </> : <Page404 />;
};

export function CommonRoute(): JSX.Element {
  const navigate = useNavigate();
  const author = useSelector((state: RootState) => state.author?.author) as unknown as Iauthor

  React.useEffect(() => {
    if (author === "mentor") {
      navigate("/mentor");
    } else if (author === "student") {
      navigate("/student");

    } else if (author === "tutor") {
      navigate("/student");
    }
  }, [author, navigate]);




  return <><Outlet /> </>
};
