"use client";
import { Button, Table, TableColumnType } from "antd";
import Alert from "./Alert";
import RoomCreate from "./RoomCreate";
import RoomSearch from "./RoomSearch";
import { useRouter, useSearchParams } from "next/navigation";
import { addQueryParamsToPath } from "../libs/helper.shared";

interface IRoomListProps {
  // Props definition
  data: Room[];
  totalRecords: number;
  errorMessage?: string;
}

export default function RoomList({
  data,
  totalRecords,
  errorMessage,
}: IRoomListProps) {
  const router = useRouter();
  const params = useSearchParams();

  const pageSize = params.get("limit") ? Number(params.get("limit")) : 20;

  const currentPage = Math.ceil(totalRecords! / pageSize) || 1;

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
        <div className="max-w-5 flex flex-row gap-5">
          <Button type="link">Access</Button>
          <Button type="primary">Join</Button>
        </div>
      )
    }
  ];

  const onChangePage = (page: number) => {
    const url = addQueryParamsToPath("/rooms", {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    router.push(url);
  };

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
            position: ["bottomLeft"],
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
