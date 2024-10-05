import * as yup from 'yup';

export const CreateRoomSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string(),
})


export type CreateRoomState = {
  room?: Room
  errors?: {
    name?: string[]
    description?: string[]
  }
  message?: string
} | undefined

