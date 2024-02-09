import { StreamPass, StreamPassesProps, UserStreamPass } from "./stream-passes";
import { User } from "./user";
import { Events } from "./events";
import { Order } from "./order";
import { MTNPaymentData, UserTransactions } from "./transaction";

export type SprayOrderStatus = "PENDING" | "SUCCESSFUL";

export type SprayMoneyOrderDetails = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  amount: number;
  userId: number;
  eventId: number;
  image: string;
  status: SprayOrderStatus;
  sprayMoneyDelayDuration: number;
  updatedAt: string;
  createdAt: string;
  _id: string;
} & {
  timestamps: boolean;
};

export type TopSpenderDetails = {
  _id: number;
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  order_id: string;
  userId: string;
  userName: string;
  highestAmountSprayedAtOnce: number;
};

export type ResponseMeta = {
  count: number;
  totalPages: number;
  hasNextPage: number;
  hasPrevPage: number;
};

export type BaseResponse = {
  status: string;
  message: string;
  code?: number;
};

export type ResponseWithUser = BaseResponse & {
  data: User;
};

export type ResponseWithImageUpload = {
  status: string;
  data: any;
  message: string;
};

export type ResponseWithUserStreamPass = BaseResponse & {
  meta: ResponseMeta;
  data: UserStreamPass;
};

export type ResponseWithUserSprayMoneyOrders = BaseResponse & {
  meta: ResponseMeta;
  orders: SprayMoneyOrderDetails[];
};

export type ResponseWithUserStreamPasses = BaseResponse & {
  meta: ResponseMeta;
  data: UserStreamPass[];
};

export type ResponseWithSingleUserStreamPass = {
  meta: ResponseMeta;
  data: UserStreamPass;
};

export type ResponseWithStreamPass = BaseResponse & {
  data: StreamPass;
};

export type ResponseWithUserTransactions = BaseResponse & {
  data: UserTransactions;
};

export type ResponseWithTopSpenderDetails = BaseResponse & {
  data: TopSpenderDetails[];
};

export type ResponseWithStreamPasses = BaseResponse & {
  data: StreamPass[];
};

export type ResponseWithEvent = BaseResponse & {
  data: Events;
};

export type ResponseWithEvents = BaseResponse & {
  data: Events[];
};

export type ResponseWithError = BaseResponse & {
  data:
    | string[]
    | {
        field: string;
        message: string;
      }[];
};

export type PassShareMutResponse = BaseResponse & {
  data: null;
};

export type CreateOrderMutResponse = BaseResponse & {
  data: Order;
};
export type MakePaymentMutResponse = {
  sessionUrl: string;
};

export type PayWithMTNMutResponse = BaseResponse & {
  data: MTNPaymentData;
};

export type PayWithStripeMutResponse = BaseResponse & {
  sessionUrl: string;
};

export type CheckMomoUserData = {
  isMomoUser: boolean;
  momoMssidn: string;
  momoUserStatus: string;
  userIsAnActiveMomoUser: boolean;
};

export type GenerateMomoPass = {
  userId: string;
  passId: string;
};
