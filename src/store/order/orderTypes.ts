export type TOrder = {
  order: {
    number: number;
  };
};

export type TOrderState = {
  orderLoading: boolean;
  order: TOrder | null;
  orderError: string;
};
