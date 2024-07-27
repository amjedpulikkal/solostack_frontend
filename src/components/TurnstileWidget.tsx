import Turnstile from "react-turnstile";



export function TurnstileWidget({setWidget}:{setWidget: React.Dispatch<React.SetStateAction<string>>}) {
  // const turnstile = useTurnstile();
  
  return (
    <Turnstile
      sitekey="0x4AAAAAAAXYCNU4we9POVNF"
      onVerify={(token) => {
        setWidget(token)
      }}
    />
  );
}