export type TUser = {
  name: string;
  email: string;
};

export type TUserState = {
  userLoading: boolean;
  user: TUser | null;
  userError: string;
};
