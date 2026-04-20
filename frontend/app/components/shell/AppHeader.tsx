"use client";

import { Tooltip } from "antd";
import Image from "next/image";
import { IoIosHelpCircleOutline, IoIosNotificationsOutline } from "react-icons/io";
import { IoSearchOutline, IoSettingsOutline } from "react-icons/io5";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { TbDeviceMobileMessage } from "react-icons/tb";

export function AppHeader() {
    return (
        <header className="h-11 w-full bg-white border-b border-gray-200 flex items-center justify-between px-4">
            {/* Left */}
            <div className="flex items-center gap-1 min-w-[200px]">
                <div className="rounded-[100%] overflow-hidden">
                    <Image
                        src="/image/llogo.jpg"
                        alt="Logo"
                        width={22}
                        height={28}
                        className="object-cover"
                    />
                </div>
                <div className="text-xs font-bold text-gray-400">Home</div>
            </div>
            {/* Right */}
            <div className="flex items-center gap-2   min-w-[200px] justify-end">
                <span className="hidden text-[#f4511c] md:block text-xs">
                    Refer a friend, get more space →
                </span>
                <Tooltip
                    title="Undo"
                    placement="top"
                    mouseEnterDelay={0.2}
                    color="#1f2937"
                >
                    <button className="w-8 text-gray-200 rounded hover:bg-gray-100 inline-flex items-center justify-center">
                        <LuUndo2 size={26} />
                    </button>
                </Tooltip>

                <Tooltip
                    title="Redo"
                    placement="top"
                    mouseEnterDelay={0.2}
                    color="#1f2937"
                >
                    <button className="w-8 text-gray-200 rounded hover:bg-gray-100 inline-flex items-center justify-center">
                        <LuRedo2 size={26} />
                    </button>
                </Tooltip>

                <Tooltip
                    title="Quick notes"
                    placement="top"
                    mouseEnterDelay={0.2}
                    color="#1f2937"
                >
                    <button className="w-8 text-gray-500 rounded hover:bg-gray-100 inline-flex items-center justify-center">
                        <TbDeviceMobileMessage size={26} />

                    </button>
                </Tooltip>

                <Tooltip
                    title="Help"
                    placement="top"
                    mouseEnterDelay={0.2}
                    color="#1f2937"
                >
                    <button className="w-8 text-gray-500 rounded hover:bg-gray-100 inline-flex items-center justify-center">
                        <IoIosHelpCircleOutline size={26} />
                    </button>
                </Tooltip>

                <Tooltip
                    title="Search"
                    placement="top"
                    mouseEnterDelay={0.2}
                    color="#1f2937"
                >
                    <button className="w-8 text-gray-500 rounded hover:bg-gray-100 inline-flex items-center justify-center">
                        <IoSearchOutline size={26} />
                    </button>
                </Tooltip>


                <Tooltip
                    title="Activity"
                    placement="top"
                    mouseEnterDelay={0.2}
                    color="#1f2937"
                >
                    <button className=" w-8 text-gray-500 rounded hover:bg-gray-100 inline-flex items-center justify-center">
                        <IoIosNotificationsOutline size={26} />
                    </button>
                </Tooltip>

                <Tooltip
                    title="Settings"
                    placement="top"
                    mouseEnterDelay={0.2}
                    color="#1f2937"
                >
                    <button className="w-8 text-gray-500 rounded hover:bg-gray-100 inline-flex items-center justify-center">
                        <IoSettingsOutline size={26} />
                    </button>
                </Tooltip>
            </div>
        </header>
    );
}