"use client";

import { generateRandomUserProfile } from "@/app/libs/helper.shared";
import { Conversation, ConversationList, Avatar } from "@chatscope/chat-ui-kit-react";
import { useEffect, useState } from "react";

interface IUserListProps {
  room: Room;
}

export default function UserList({ room }: IUserListProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (room) {
      fetch(`/api/rooms/${room.uuid}/users`)
        .then((res) => res.json())
        .then(setUsers);
    }
  }, [room]);

  return (
    <ConversationList
      style={{
        height: 600,
      }}
    >
      {users.map((user) => (
        <Conversation
          key={user.id}
          name={user.name}
        >
          <Avatar src={generateRandomUserProfile()}/>
        </Conversation>
      ))}
    </ConversationList>
  );
}
