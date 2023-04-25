export enum TransactionType {
  sale_creator,
  sale_associate,
  comission_paid,
  comission_received,
}

export type TransactionFileResponse = {
  type: number;
  date: string;
  productName: string;
  price: number;
  seller: string;
};
