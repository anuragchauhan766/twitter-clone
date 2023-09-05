import React from "react";
import { BiHomeCircle } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline, IoPersonOutline } from "react-icons/io5";
import { SlEnvolope } from "react-icons/sl";
import { BsBookmark } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import UserProfile from "./UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: FiSearch,
  },
  {
    title: "Notifications",
    icon: IoNotificationsOutline,
  },
  {
    title: "Messages",
    icon: SlEnvolope,
  },
  {
    title: "Bookmarks",
    icon: BsBookmark,
  },
  {
    title: "Profile",
    icon: IoPersonOutline,
  },
];

async function LeftSideBar() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return (
    <header className="flex items-end h-screen fixed top-0">
      <div className="flex flex-col w-72 h-full justify-between px-2 items-stretch">
        <div className="w-full h-full flex flex-col text-xl space-y-2  p-3">
          <div className="flex flex-col space-y-2  w-full">
            <Link
              href="/"
              className="p-4 rounded-full hover:bg-white/10  w-fit"
            >
              <div className="relative w-6 h-6 ">
                <Image
                  src="/twitter.svg"
                  alt="twitter logo"
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 20px"
                ></Image>
              </div>
            </Link>
          </div>
          <nav className="w-full flex flex-col space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                href={`/${
                  item.title === "Profile"
                    ? session.user.username
                    : item.title.toLocaleLowerCase()
                }`}
                key={item.title}
                className="text-white flex items-center justify-start w-fit space-x-3 p-2 px-3 rounded-3xl hover:bg-white/10 transition duration-200"
              >
                <div>
                  <item.icon className="text-3xl" />
                </div>
                <div>{item.title}</div>
              </Link>
            ))}
          </nav>
          <div className="w-full">
            <button className="w-full rounded-3xl px-8 py-2 text-lg bg-blue mx-2 hover:bg-opacity-80 font-bold">
              Post
            </button>
          </div>
        </div>
        <div className="w-full my-3">
          <UserProfile />
        </div>
      </div>
    </header>
  );
}

export default LeftSideBar;
