import { Skeleton } from "@/components/ui/skeleton";


function IntelPage(): JSX.Element {
  

  return (
    <>
      <div className="flex justify-center items-center">
        <div>
          <div className="flex justify-center gap-28">
            <img 
              className="md:w-44 w-20 md:h-44 h-20 rounded-full z-10 outline outline-1 bg-slate-800" 
              src="https://img.freepik.com/premium-photo/man-with-beard-beard-blue-circle-generative-ai_902639-79016.jpg?w=740" 

              alt="Avatar 1"
            />
            <img 
              className="md:w-44 w-20 md:h-44 h-20 rounded-full z-10 outline outline-1 bg-slate-800"
              src="https://www.svgrepo.com/show/382101/male-avatar-boy-face-man-user.svg"
              alt="Avatar 2"
            />
            {/* <canvas ref={canvasRef} className="absolute top-0 left-0" /> */}
          </div>
          <div className="flex justify-center">
            <Skeleton className="bg-transparent">connecting...</Skeleton>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntelPage;