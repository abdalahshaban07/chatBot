import { Query } from "../queryMapper/Query";
import { DataMapper } from "../dataMapper/DataMapper";
import { SecurityApplier } from "../security/SecurityApplier";
import { IncludeQuery } from "../includeMapper/IncludeQuery";
import { IncludeMapper } from "../includeMapper/IncludeMapper";

export interface DataAdapter {
  typeMapper: DataMapper;
  includeMapper: IncludeMapper;
  securityApplier: SecurityApplier;

  defineModel(attributes: any, dataname?: string, options?: any): void;
  create(modelName: string, data: any): any;
  findAll(
    modelName: string,
    query?: Query,
    includeKey?: Array<IncludeQuery>
  ): any;

  update(modelName: string, data: any, query?: Query): any;
  findOne(
    modelName: string,
    query?: Query,
    includeKey?: Array<IncludeQuery>
  ): any;
  delete(modelName: string, query?: Query): any;

  relatedTo(societeModel: any, associatedModel: any, options?: any): void;
  ownMany(societeModel: any, associatedModel: any, options?: any): void;
  relatedToMany(societeModel: any, associatedModel: any, options?: any): void;
  ownOne(societeModel: any, associatedModel: any, options?: any): void;
}
