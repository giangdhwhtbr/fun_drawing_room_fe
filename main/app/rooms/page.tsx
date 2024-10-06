import { Suspense } from "react";
import RoomList from "../../components/RoomList";
import { fetchWithAuth } from "../libs/helper";
import { addQueryParamsToPath } from "../libs/helper.shared";
import { getSession } from "../libs/session";

type Props = {
  searchParams: URLSearchParams;
};

export default async function RoomsPage({ searchParams }: Props) {
  try {
    const session = getSession();
    const url = addQueryParamsToPath("/rooms/", searchParams as any);
    const { data, totalRecords } = await fetchWithAuth(url);
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <RoomList data={data || []} totalRecords={totalRecords} user={session.user}/>
      </Suspense>
    );
  } catch (error: any) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <RoomList data={[]} errorMessage={error.message} totalRecords={0} />
      </Suspense>
    );
  }
}
