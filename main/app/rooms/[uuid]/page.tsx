import FunnyRoom from "@/components/Room";
import { fetchWithAuth } from "@/app/libs/helper";
import { getSession } from "@/app/libs/session";
import { Suspense } from "react";

type Props = {
  searchParams: URLSearchParams;
};

export default async function FunnyRoomPage({ params }: { params: { uuid: string } }) {
  const session = getSession();
  console.log(params.uuid);
  try {
    const room = await fetchWithAuth('/rooms/' + params.uuid);
    return (
      <Suspense fallback={<div>Loading...</div>}>
       <FunnyRoom user={session.user} room={room}/>
      </Suspense>
    );
  } catch (error: any) {
    return error.message;
  }
}
