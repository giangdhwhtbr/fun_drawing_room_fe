"use client";

import ChatContainer from "./RoomChatContainer";
import UserList from "./RoomUserList";
import dynamic from "next/dynamic";

const DrawingBoard = dynamic(() => import("./RoomDrawingBoard"), {
  ssr: false,
});

interface IFunnyRoomProps {
  // Props definition
  user: User;
  room: Room;
}

export default function FunnyRoom({ user, room }: IFunnyRoomProps) {
  return (
    <div className="max-w-screen-xxl mx-auto px-4">
      <div className="max-w-lg flex flex-row gap-2">
        <h3 className="text-gray-800 text-xl font-bold">Room</h3>
        <h3 className="text-gray-500 text-xl font-normal">{`${room.name} (${room.userIds.length}/30)`}</h3>
      </div>
      <div className="my-5">
        <div className="flex flex-row gap-2">
          <div className="w-[300px] flex flex-col gap-3">
            <UserList room={room} />
          </div>
          <DrawingBoard />
          <div className="w-[300px] flex flex-col gap-3">
            <ChatContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
