import { ModeToggle } from "@/components/mode-toggle";
// import { SwitchUser } from "@/components/switchUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function App(): JSX.Element {

    return <>
        <div className="h-screen w-screen">

            <div className='flex justify-end mt-6 mr-6'>
                <ModeToggle />
            </div>
            <div className="flex justify-center items-center h-3/4 w-full ">
                <div className="h-[500px] w-[900px] bg-white rounded-3xl overflow-hidden flex justify-between">
                    <div className="p-6">
                        <img src="/SoloStack (1).png" alt="" />

                        <p></p>
                    </div>
                    <div className="bg-slate-800 h-full w-2/3 flex justify-center ">
                        <form action="" className="">
                            <Input type="text" className="mt-4 w-80" />
                            <Input type="text" className="mt-4 w-80" />
                            <Input type="text" className="mt-4 w-80" />
                            <Input type="text" className="mt-4 w-80" />
                            <Button>submit</Button>
                        </form>
                    </div>
                </div>

            </div>
            <div className='flex justify-end mr-6'>
                {/* <SwitchUser author={undefined} setAuthor={undefined} /> */}
            </div>
        </div>
    </>



}