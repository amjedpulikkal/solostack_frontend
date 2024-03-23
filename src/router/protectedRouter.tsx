import { useAuthor } from '@/components/switchUser-provider';
import { Page404 } from '@/page/404';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
export function StudentParentRoute(): JSX.Element {
  const navigate = useNavigate();
  const { author } = useAuthor();
  const isStudent = author === "student";
  console.log(isStudent);
  console.log(author);
  
  React.useEffect(() => {
    if (!isStudent) {
      navigate("/login");
    }
  }, [isStudent, navigate]);

  return isStudent ? <Outlet /> : <Page404/> ;
};

export function CommonRoute(): JSX.Element {
  // const navigate = useNavigate();
  // const { author } = useAuthor();

  // React.useEffect(() => {
  //   if (author) {
  //     navigate("/");
  //   }
  // }, [author, navigate]);

  return <Outlet /> 
};
