import React, { useRef } from "react";
import Turnstile from "react-turnstile";

export function TurnstileWidget({ setWidget }: { setWidget: React.Dispatch<React.SetStateAction<string>> }) {
  const turnstileRef = useRef<any>(null);

  const refreshToken = () => {
    if (turnstileRef.current) {
      turnstileRef.current.reset();
      turnstileRef.current.execute(); 
    }
  };

  return (
    <div>
      <Turnstile
      // execution=""
       refreshExpired="auto" 
        sitekey="0x4AAAAAAAXYCNU4we9POVNF"
        onVerify={(token) => {
          setWidget(token);
        }}

      />
    
    </div>
  );
}
