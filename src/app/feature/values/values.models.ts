export interface ValueItem {
  id: string;
  name: string;
  code: number;
}

export interface GetValuesResponse {
  items: ValueItem[];
}
