export interface Transaction {
  id?: number;
  account?: string;
  amount?: string;
  counterparty?: string;
  tags?: string[];
  date?: string;
  location?: string;
}
