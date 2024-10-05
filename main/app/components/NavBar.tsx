"use client";
import Image from "next/image";
import { useRef, useState } from "react";

// Profile Dropdown
const ProfileDropDown = (props: any) => {
  const [state, setState] = useState(false);
  const profileRef = useRef<any>();
  const navigation = [{ title: "Log out", path: "/auth/sign-out" }];
  return (
    <div className={`relative ${props.class}`}>
      <div className="flex items-center space-x-4">
        <button
          ref={profileRef}
          className="w-8 h-8 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        >
          <Image
            src="https://randomuser.me/api/portraits/men/46.jpg"
            className="w-full h-full rounded-full"
            width="40"
            height="40"
            alt={""}
          />
        </button>
        <div className="lg:hidden">
          <span className="block">Micheal John</span>
          <span className="block text-sm text-gray-500">john@gmail.com</span>
        </div>
      </div>
      <ul
        className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            <a
              key={idx}
              className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
              href={item.path}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function NavBar() {
  return (
    <nav className="bg-white border-b">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
        <div className="flex-none lg:flex-initial">
          <a href="/rooms">Fun Drawing Room</a>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
            <ProfileDropDown class="hidden lg:block" />
          </div>
        </div>
      </div>
    </nav>
  );
}
