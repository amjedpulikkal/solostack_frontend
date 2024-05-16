import React from 'react';
import { GrGoogle } from "react-icons/gr";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Importing both components from the package

export function GoogleLoginButton() {
  const responseGoogle = (response: any) => {
    console.log(response);
  }

  return (
    <GoogleOAuthProvider
      clientId={"645118563332-304b2qo9hfdqqb08hv9fk7i0pmp52sbj.apps.googleusercontent.com"}>
      <GoogleLogin
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      >
      <button className="w-28 h-12 items-center justify-center inline-flex rounded-full font-bold text-lg border-2"><GrGoogle/></button>
      </GoogleLogin> 

    </GoogleOAuthProvider>
  );
}
