export type UserStatus = "ACTIVE" | "BLOCKED";

export type User = {
  email: string;
  phoneNumber: string;
  isVerified: boolean;
  user_id: string;
  createdAt: string;
  updatedAt: string;
};

export type UserCreatedData = {
  id: number;
  email: string;
  countryCode: string;
  phoneNumber: string;
  birthday: Date | string;
  gender: "MALE" | "FEMALE";
};
