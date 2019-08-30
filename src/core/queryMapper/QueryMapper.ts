import { Query } from "./Query";
import { QueryField } from "./QueryFeild";

export abstract class QueryMapper {
  abstract getQuery(query?: Query): any;
  abstract getEqualToQuery(queryFeilds?: QueryField[]): any;
  abstract getNotEqualToQuery(queryFeilds?: QueryField[]): any;
  abstract getMoreThan(queryFeilds?: QueryField[]): any;
  abstract getLessThan(queryFeilds?: QueryField[]): any;
  abstract getContainsQuery(queryFeilds?: QueryField[]): any;
  abstract getPaginateQuery(paginateQuery: {
    pageNumber: number;
    pageSize?: number;
  }): any;
}
