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

  if (isStudent) {
    return <>
      <div className='w-screen h-screen overflow-hidden'>
        <NaveBar />
        <div className='w-full h-full overflow-auto scrollbar pb-20'>
          <Outlet />
        </div>
      </div>
    </>
  }

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




  return (
    <>
      <Outlet />
      <div aria-hidden="true" className="fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] -z-10">
        <img
          src="docs-left.png"
          className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
          alt="docs left background" data-loaded="true" />

      </div>
      <div aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] -z-10 rotate-12">
        <img src="docs-right.png"
          className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none  transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
          alt="docs right background" data-loaded="true" />

      </div>
    </>)
};
