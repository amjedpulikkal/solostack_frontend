


export default function DotLoader(): JSX.Element {

    return (

        <div className="dotLoader cursor-wait"></div>

    )
}


export function LogoLoader(): JSX.Element {

    return (

        <div className="w-full h-full flex justify-center items-center">
            <span className="wrapper w-[800px] ">
                <svg className="">
                    <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                        SoloStack
                    </text>
                </svg>
            </span>
        </div>

    )
}
