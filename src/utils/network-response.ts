import { User } from "@/types/user"

export type ResponseMeta = {
  count: number
  totalPages: number
  hasNextPage: number
  hasPrevPage: number
}

export type BaseResponse = {
  status: string
  message: string
  code?: number
}

export type ResponseWithUser = BaseResponse & {
  data: User
}

export type ResponseWithError = BaseResponse & {
  data:
    | string[]
    | {
        field: string
        message: string
      }[]
}
