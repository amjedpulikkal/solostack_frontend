import { ModeToggle } from '../../components/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function chat(): JSX.Element {
    const group: { name: String, img: string }[] = [
        { name: "node js ", img: "/download.png" },
        { name: "Python ", img: "/download.jpg" },
        { name: "Java ", img: "/OIP.jpg" },
        { name: ".Net ", img: "/download (1).jpg" },
        { name: "React js ", img: "/react-1-logo-png-transparent.png" },
        { name: "React js ", img: "/Copy-of-Copy-of-Travel-Photography.png" },
        { name: "C++ ", img: "/OIdP (1).jpg" },
    ]

    let chatData: { user: String, Url: string, data: String }[] = [
        {
            user: "1",
            Url: `
            https://i.pravatar.cc/150?u=a042581f4e29026024d
            `,
            data: `
            Welcome to group everyone ! 1
            `

        },
        {
            user: "2",
            Url: `
            https://i.pravatar.cc/150?u=a042581f4e29026024d
            `,
            data: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            at praesentium, aut ullam delectus odio error sit rem. Architecto
            nulla doloribus laborum illo rem enim dolor odio saepe,
            consequatur quas?
            `

        },
        {
            user: "1",
            Url: `
            https://i.pravatar.cc/150?u=a042581f4e29026024d
            `,
            data: `
            Welcome to group everyone ! 2
            `

        },
        {
            user: "2",
            Url: `
            https://i.pravatar.cc/150?u=a042581f4e29026024d
            `,
            data: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            at praesentium, aut ullam delectus odio error sit rem. Architecto
            nulla doloribus laborum illo rem enim dolor odio saepe,
            consequatur quas?
            `

        }
    ]

    return (
        <>
            <div className=" h-dvh w-dvw flex justify-between p-8">
                <div className="w-1/4 h-full dark:bg-black rounded-3xl   pt-4 pb-2 ">
                    <div className="w-full h-20 flex justify-between">
                        {/* <User
                            name="Jane Doe"
                            description="Product Designer"
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                                radius: "sm",
                                size: "md"

                            }}

                        /> */}
                        {/* <Avatar  src="https://i.pravatar.cc/150?u=a042581f4e29026024d" /> */}
                        <div className="flex items-center mr-8">
                            <ModeToggle />
                        </div>
                    </div>
                    <div className="pl-4 w-full  overflow-y-scroll scrollbar pr-3" style={{ height: '85%' }} >
                        {group.map(item => {
                            return (
                                <div className="rounded-xl mt-3 w-auto h-20 hover:bg-slate-200 dark:hover:bg-zinc-900 p-2 flex" >
                                    <img className="w-20 rounded-xl h-full"
                                        width={240}
                                        src={item.img}
                                        alt="NextUI Album Cover"
                                    />

                                    <div className="pl-2">
                                        <p className="dark:text-white text-black" style={{ fontSize: "25px" }}>{item.name}</p>
                                    </div>
                                </div>
                            )
                        })}


                    </div>
                </div>
                <div className="w-9/12 h-full bg-stone-950 rounded-3xl ml-2 flex flex-col  ">

                    <div className="bg-zinc-700  w-full h-20  rounded-t-3xl">

                    </div>
                    <div className="bg-stone-950  w-full div1 h-full flex flex-col-reverse rounded-xl scrollbar overflow-y-scroll pb-7">
                        {chatData.map(item => {
                            if (item.user === "1") {
                                return (
                                    <div className="w-full flex justify-end mt-5">
                                        <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white" >
                                            {item.data}
                                        </div>
                                    </div>

                                )
                            } else {
                                return (
                                    <div className="w-full flex mt-5">
                                        <Avatar>
                                            <AvatarImage src={item.Url} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className=" py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white w-5/6" >
                                            {item.data}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className="bg-slate-500 w-full h-20  rounded-b-3xl flex justify-around ">
                        <div className="flex justify-center ml-3">

                            <button ><img width={40} src="./add (2).png" alt="" /></button>
                        </div>
                        <div className="col-span-6 w-5/6 h-full flex justify-center py-2">
                            <input className="w-full pl-2  rounded-xl" type="text" name="" id="" />
                        </div>
                        <div className="flex justify-center mr-2">
                            <button><img width={40} src="./send.png" alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}