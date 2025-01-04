export interface TableResponse {
  status: boolean;
  data: Table & { totalCount: number };
}
export interface Table {
  columns: string[];
  rows: Row[];
}

export interface Row {
  [key: string]: string | number;
}
