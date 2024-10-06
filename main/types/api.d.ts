type LoginPayload = {
    email: string;
    password: string;
}

type User = {
    id: number;
    email: string;
    name: string;
    createdAt: string;
}

type Room = {
    id: number;
    uuid: string;
    name: string;
    description: string;
    userIds: number[];
    createdAt: string;
}

type CreateRoomPayload = {
    name: string;
    description: string;
}
