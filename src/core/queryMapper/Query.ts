import { QueryField } from "./QueryFeild";

export interface Query {
  equalTo?: QueryField[];
  moreThan?: QueryField[];
  lessThan?: QueryField[];
  contain?: QueryField[];
  notEqualTo?: QueryField[];
  selectedAttribute?: string[];
  paginate?: {
    pageNumber: number;
    pageSize?: number;
  };
}
