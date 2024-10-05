'use server'
import { CreateRoomSchema, CreateRoomState } from '@/app/libs/room.definitions';
import { fetchWithAuth } from "../libs/helper";

export async function createRoom(state: CreateRoomState, formData: FormData) {
  try {
    const validatedFields = await CreateRoomSchema.validate({
      name: formData.get('name'),
      description: formData.get('description'),
    });

    const data = await fetchWithAuth('/rooms/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields),
    });

    return {
      ...state,
      room: data,
    }

  } catch (error: any) {
    const resp: any = {}
    if (error.path && error.errors) {
      resp.errors = {
        [error.path]: error.errors[0]
      };
      return resp;
    }
    return {
      ...state,
      message: error.message,
    };
  } finally {
    // redirect('/rooms')
    return state
  }
}
