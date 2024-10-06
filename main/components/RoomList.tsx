"use client";
import { Button, Table, TableColumnType } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { addQueryParamsToPath } from "../app/libs/helper.shared";
import Alert from "./Alert";
import RoomCreate from "./RoomCreate";
import RoomSearch from "./RoomSearch";

interface IRoomListProps {
  // Props definition
  user?: User;
  data: Room[];
  totalRecords: number;
  errorMessage?: string;
}

export default function RoomList({
  user,
  data,
  totalRecords,
  errorMessage,
}: IRoomListProps) {
  const router = useRouter();
  const params = useSearchParams();

  const pageSize = params.get("limit") ? Number(params.get("limit")) : 20;
  const offset = params.get("offset") ? Number(params.get("offset")) : 0;

  const currentPage = offset / pageSize + 1;

  const onChangePage = (page: number) => {
    const url = addQueryParamsToPath("/rooms", {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    router.push(url);
  };

  const joinRoom = async (room: Room) => {
    const resp = await fetch(`/api/rooms/join/${room.id}`, {
      method: "GET",
    });
    const respJson = await resp.json();
    if (respJson.success) {
      router.push(`/rooms/${room.uuid}`);
    } else {
      toast.error(respJson.message);
      console.error("Failed to join room", respJson);
    }
  }

  const columns: TableColumnType[] = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "",
      render: (record: Room) => (
        <div className="flex flex-row items-center gap-5">
          {record.userIds.includes(user!.id) && <Link href={`/rooms/${record.uuid}`} >Access</Link>}
          {!record.userIds.includes(user!.id) &&<Button type="primary" onClick={() => joinRoom(record)}>Join</Button>}
        </div>
      )
    }
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Rooms</h3>
      </div>
      <div className="my-5">
        {errorMessage && <Alert variant="error" message={errorMessage} />}
      </div>
      <div className="flex flex-row justify-between">
        <RoomSearch />
        <RoomCreate />
      </div>
      <div className="my-5">
        <Table
          bordered
          dataSource={data}
          columns={columns}
          rowKey={"id"}
          pagination={{
            position: ["topRight", 'bottomRight'],
            total: totalRecords!,
            pageSize,
            defaultCurrent: 1,
            current: currentPage,
            hideOnSinglePage: false,
            showSizeChanger: true,
            onChange: onChangePage,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </div>
    </div>
  );
}
