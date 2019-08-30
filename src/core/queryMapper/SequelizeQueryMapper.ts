import { QueryMapper } from "./QueryMapper";
import { Query } from "./Query";
import { QueryField } from "./QueryFeild";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
export class SequelizeQueryMapper extends QueryMapper {
  getQuery(query?: Query): any {
    if (query) {
      let sequlizeQuery: any = {};
      Object.keys(query).forEach(key => {
        if (key == "equalTo") {
          let equalToQuery = this.getEqualToQuery(query[key]);
          sequlizeQuery.where = { ...sequlizeQuery.where, ...equalToQuery };
        }

        if (key == "notEqualTo") {
          let equalToQuery = this.getNotEqualToQuery(query[key]);
          sequlizeQuery.where = { ...sequlizeQuery.where, ...equalToQuery };
        }

        if (key == "moreThan") {
          let equalToQuery = this.getMoreThan(query[key]);
          sequlizeQuery.where = { ...sequlizeQuery.where, ...equalToQuery };
        }

        if (key == "lessThan") {
          let equalToQuery = this.getLessThan(query[key]);
          sequlizeQuery.where = { ...sequlizeQuery.where, ...equalToQuery };
        }

        if (key == "contain") {
          let equalToQuery = this.getContainsQuery(query[key]);
          sequlizeQuery.where = { ...sequlizeQuery.where, ...equalToQuery };
        }
        if (query.selectedAttribute) {
          sequlizeQuery["attributes"] = query.selectedAttribute;
        }

        if (query.paginate) {
          sequlizeQuery = {
            ...sequlizeQuery,
            ...this.getPaginateQuery(query.paginate)
          };
        }
      });
      return sequlizeQuery;
    }

    return;
  }

  getEqualToQuery(queryFeilds: QueryField[] = []): any {
    let query = {};
    queryFeilds.forEach(queryFeild => {
      let queryFeildMap: any = {};
      queryFeildMap[queryFeild.attribute] = queryFeild.value;
      query = { ...query, ...queryFeildMap };
    });
    return query;
  }

  getNotEqualToQuery(queryFeilds: QueryField[] = []): any {
    let query = {};
    queryFeilds.forEach(queryFeild => {
      let queryFeildMap: any = {};
      queryFeildMap[queryFeild.attribute] = { [Op.ne]: queryFeild.value };
      query = { ...query, ...queryFeildMap };
    });
    return query;
  }

  getMoreThan(queryFeilds: QueryField[] = []): any {
    let query = {};
    queryFeilds.forEach(queryFeild => {
      let queryFeildMap: any = {};
      queryFeildMap[queryFeild.attribute] = { [Op.gt]: queryFeild.value };
      query = { ...query, ...queryFeildMap };
    });
    return query;
  }
  getLessThan(queryFeilds: QueryField[] = []): any {
    let query = {};
    queryFeilds.forEach(queryFeild => {
      let queryFeildMap: any = {};
      queryFeildMap[queryFeild.attribute] = { [Op.lt]: queryFeild.value };
      query = { ...query, ...queryFeildMap };
    });
    return query;
  }
  getContainsQuery(queryFeilds: QueryField[] = []): any {
    let query = {};
    queryFeilds.forEach(queryFeild => {
      let queryFeildMap: any = {};
      queryFeildMap[queryFeild.attribute] = {
        [Op.like]: `%${queryFeild.value}%`
      };
      query = { ...query, ...queryFeildMap };
    });
    return query;
  }

  getPaginateQuery(paginateQuery: { pageNumber: number; pageSize?: number }) {
    if (paginateQuery.pageNumber) {
      let offset, limit, pageNumber, pageSize;
      pageNumber = paginateQuery.pageNumber ? paginateQuery.pageNumber - 1 : 0;
      pageSize = paginateQuery.pageSize || 20;
      offset = pageNumber * pageSize; // first record number
      limit = offset + pageSize; // last record number

      return {
        offset,
        limit,
        pageSize
        // subQuery: false
      };
    }
  }
}
