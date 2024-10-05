type LoginPayload = {
    email: string;
    password: string;
}

type Room = {
    id: number;
    name: string;
    description: string;
    userIds: number[];
    createdAt: string;
}

type CreateRoomPayload = {
    name: string;
    description: string;
}
