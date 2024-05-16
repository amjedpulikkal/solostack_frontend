import { ModeToggle } from "../../components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
// import { RiCheckDoubleLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
export default function chat(): JSX.Element {
  const group: { name: String; img: string }[] = [
    { name: "node js ", img: "/download.png" },
    { name: "Python ", img: "/download.jpg" },
    { name: "Java ", img: "/OIP.jpg" },
    { name: ".Net ", img: "/download (1).jpg" },
    { name: "React js ", img: "/react-1-logo-png-transparent.png" },
    { name: "React js ", img: "/Copy-of-Copy-of-Travel-Photography.png" },
    { name: "C++ ", img: "/OIdP (1).jpg" },
  ];

  let chatData: { user: String; Url: string; data: String; type?: string }[] = [
    {
      user: "1",
      Url: `
            https://i.pravatar.cc/150?u=a042581f4e29026024d
            `,
      data: `
            Welcome to group everyone ! 1
            `,
    },
    {
      user: "1",
      Url: `
            https://i.pravatar.cc/150?u=a042581f4e29026024d
            `,
      data: `
            Welcome to group everyone ! 1
            `,
      type: "image",
    },
    {
      user: "2",
      Url: `
            https://i.pravatar.cc/150?u=a042581f4e29026024d
            `,
      data: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            at praesentium, aut ullam delectus odio error sit rem. Architecto
            null doloribus laborum illo rem enim dolor odio saepe,
            consequatur quas?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            at praesentium, aut ullam delectus odio error sit rem. Architecto
            null doloribus laborum illo rem enim dolor odio saepe,
            consequatur quas?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            at praesentium, aut ullam delectus odio error sit rem. Architecto
            null doloribus laborum illo rem enim dolor odio saepe,
            consequatur quas?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            at praesentium, aut ullam delectus odio error sit rem. Architecto
            null doloribus laborum illo rem enim dolor odio saepe,
            consequatur quas?
            `,
    },
    {
      user: "1",
      Url: `
            https://i.pravatar.cc/150?u=a042581f4e29026024d
            `,
      data: `
            Welcome to group everyone ! 2

            consequatur quas?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            at praesentium, aut ullam delectus odio error sit rem. Architecto
            null doloribus laborum illo rem enim dolor odio saepe,
            consequatur quas?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            at praesentium, aut ullam delectus odio error sit rem. Architecto
            null doloribus laborum illo rem enim dolor odio saepe,
            consequatur quas?
            `,
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
            `,
    },
  ];

  return (
    <>
      <div className=" h-dvh w-dvw flex justify-between md:p-5">
        <div className="w-1/4 h-full hidden md:block dark:bg-black rounded-3xl  outlie dark:border-none border-2  pb-2 ">
          <div className="w-full h-20 flex justify-around items-center">
            <img
              src=""
              className="bg-slate-400 rounded-full w-10 h-10"
              alt=""
            />
            <input
              type="text"
              className="bg-transparent outline pl-4 outline-1 outline-primary rounded-full h-10"
            />
            <div className="flex items-center ">
              <ModeToggle />
            </div>
          </div>
          <div
            className=" w-full h-full  overflow-y-scroll scrollbar px-3"
            style={{ height: "85%" }}
          >
            {group.map((item) => {
              return (
                <div className="rounded-xl mt-3 w-auto h-20 outline outline-1 outline-gray-400 hover:bg-slate-200 dark:hover:bg-zinc-900 p-2 flex">
                  <img className="w-16 rounded-xl h-16 " src={item.img} />

                  <div className="pl-2 truncate ">
                    <p
                      className="capitalize dark:text-white text-black"
                      style={{ fontSize: "25px" }}
                    >
                      {item.name}
                    </p>
                    <p className="text-white/40">
                      @userName:<span>hi allddddddddddddd students </span>
                    </p>npm run dev 
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-9/12 rounded-3xl md:ml-2   flex flex-col  ">
          <div className="dark:bg-white/10  bg-black/10 w-full h-20  flex justify-start  gap-2 md:rounded-t-3xl px-3 items-center ">
            <div className="bg-black w-10 h-10 rounded-3xl "></div>
            <div className="">
              <p className="capitalize">
                full stackn
              </p>
              <p className="text-black/20 dark:text-white/20 w-1/2 text-clip" >@amjed_+pulikkal,@amjeded24234 </p>
            </div>
          </div>
          <div className="px-2 w-full div1 h-full flex flex-col-reverse rounded-xl scrollbar overflow-y-scroll pb-7">
            {chatData.map((item) => {
              if (item.user === "1") {
                if (item.type == "image") {
                  return (
                    <div className=" flex justify-end mt-5 ">
                      <div className="md:w-1/2 w-10/12 flex justify-end">
                        <div className="py-3 px-4 text-start bg-black/10 dark:bg-white/10  rounded-bl-3xl rounded-tl-3xl rounded-tr-xl">
                          <div className="flex justify-center bg-black  rounded-2xl">
                            <img
                              src={item.Url}
                              className="max-w-40 max-h-40 "
                              alt=""
                            />
                          </div>
                          <div className="mt-2">{item.data}</div>

                          <div className=" flex justify-start mt-2">
                            <p className=" dark:text-white/50 text-black/50 text-sm font">5:40pm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className=" flex justify-end mt-4 ">
                      <div className="md:w-1/2 w-10/12 flex justify-end">
                        <div className="py-3 px-4 text-start dark:bg-white/10 bg-black/10 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl">
                          {item.data}
                      <div className=" flex justify-start mt-2">
                            <p className="dark:text-white/50 text-black/50 text-sm font">5:40pm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              } else {
                return (
                  <div className="w-full flex mt-5 ">
                    <div className="py-3 text-black/80 px-4 bg-black/5 dark:bg-white/5 rounded-b-3xl rounded-tr-3xl   dark:text-white md:w-1/2 w-10/12">
                      <div className="flex gap-2 items-center ">
                        <Avatar>
                          <AvatarImage src={item.Url} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="">
                          <p className="capitalize">
                            amjedPulikkal
                            <span className=" ml-1 inline-flex items-center gap-x-1.5 py-1 px-2 rounded-full text-xs font-medium border border-gray-500 text-gray-500 dark:text-neutral-400">
                              Student
                            </span>
                          </p>
                          <p className="text-black/20 dark:text-white/20">@amjed_pulikkal</p>
                        </div>
                      </div>
                      <div className="mt-2">{item.data}</div>
                      <div className="w-full  flex justify-end">
                        <p className="dark:text-white/50 text-black/50  text-sm font">5:40pm</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="dark:bg-white/10 bg-black/30 w-full h-20 px-2 md:px-0  md:rounded-b-3xl flex justify-center gap-2 ">
            <div className="flex justify-center items-center ">
              <MdAddCircle
                className="text-primary hover:text-green-600 transition-colors"
                size={40}
              />
            </div>
            <div className="col-span-6 w-5/6 h-full flex justify-center items-center ">
              <Input
                placeholder="sent massage"
                className="w-full"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="flex  justify-center items-center ">
              <IoSend className="text-primary hover:text-green-600" size={40} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
