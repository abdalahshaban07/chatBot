import { IncludeMapper } from "./IncludeMapper";
import { IncludeQuery } from "./IncludeQuery";
import { QueryMapper } from "../queryMapper/QueryMapper";

export class SequelizeIncludeMapper extends IncludeMapper {
  constructor(private queryMapper: QueryMapper) {
    super();
  }

  /**
   *  map from include query to sequelize include format
   * @param query array of instance of IncludeQuery
   * @param modelsInstances  sequelize defined models
   */
  getIncludeQuery(query?: IncludeQuery[], modelsInstances?: any) {
    if (query) {
      let newMappedQuery: any = [];
      // loop for each include query and push to new mapped query array
      query.forEach(includeOne => {
        newMappedQuery.push(this.mapOneQuery(includeOne, modelsInstances));
      });
      return { include: newMappedQuery };
    }
  }
  /**
   *  map one query and return new mapped query
   * @param query
   * @param modelsInstances
   */
  private mapOneQuery(query: IncludeQuery, modelsInstances?: any) {
    return {
      model: modelsInstances[query.modelName],
      as: query.includeAs,
      subQuery: false, // for pagination
      include:
        this.mapForNestedRelations(query.includeWith, modelsInstances) ||
        [] /**  nested query mapping **/,
      ...this.queryMapper.getQuery(query.query)
    };
  }
  /**
   *  map nested query to sequelize format
   * @param query
   * @param modelsInstances
   */
  private mapForNestedRelations(
    query?: IncludeQuery[],
    modelsInstances?: any
  ): any {
    if (query) {
      return query.map(oneQuery => {
        return this.mapOneQuery(oneQuery, modelsInstances);
      });
    }
  }
}
