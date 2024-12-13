import NaveBar from "@/components/navBar";
import NaveBarForM from "@/components/student/naveBarForM";
import { useAuthor } from "@/components/switchUser-provider";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Page404 } from "@/page/404";
import { RootState } from "@/redux/store";
import { Iauthor } from "@/type";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
export function StudentParentRoute(): JSX.Element {
  const navigate = useNavigate();
  // const { author } = useAuthor();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const author = useSelector(
    (state: RootState) => state.author?.author
  ) as unknown as Iauthor;
  const isStudent = author === "student";

  const isChatPage = window.location.pathname === "/student/chat";

  React.useEffect(() => {
    if (!isStudent) {
      navigate("/signIn");
    }
  }, [isStudent, navigate]);

  if (isStudent) {
    return (
      <>
        <div className="w-screen h-screen overflow-hidden">
          {!isChatPage ? (
            <>
              {isDesktop && <NaveBar />}
              <div className="w-full h-full overflow-auto scrollbar ">
                <Outlet />
              </div>
              {!isDesktop && <NaveBarForM />}
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </>
    );
  }
}

export function CommonRoute(): JSX.Element {
  const navigate = useNavigate();
  const author = useSelector(
    (state: RootState) => state.author?.author
  ) as unknown as Iauthor;
  const isAdmin = useSelector(
    (state: RootState) => state.admin?.isLoggedIn
  ) as unknown as boolean;

  console.log(isAdmin)

  
  React.useEffect(() => {
    if (author === "mentor") {
      navigate("/mentor");
    } else if (author === "student") {
      navigate("/student");
    } else if (author === "tutor") {
      navigate("/student");
    }else if(isAdmin){
      navigate("/admin")
    }
  }, [author, navigate]);

  return (
    <>
      <Outlet />
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] -z-10"
      >
        <img
          src="docs-left.png"
          className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
          alt="docs left background"
          data-loaded="true"
        />
      </div>
      <div
        aria-hidden="true"
        className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] -z-10 rotate-12"
      >
        <img
          src="docs-right.png"
          className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none  transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
          alt="docs right background"
          data-loaded="true"
        />
      </div>
    </>
  );
}
