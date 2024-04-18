import Turnstile, { useTurnstile } from "react-turnstile";



export function TurnstileWidget({setWidget}) {
  const turnstile = useTurnstile();
  
  return (
    <Turnstile
      sitekey="0x4AAAAAAAXYCNU4we9POVNF"
      onVerify={(token) => {
        setWidget(token)
      }}
    />
  );
}