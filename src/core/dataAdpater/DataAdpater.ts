import { Query } from "../queryMapper/Query";
import { DataMapper } from "../dataMapper/DataMapper";
import { SecurityApplier } from "../security/SecurityApplier";
import { IncludeMapper } from "../includeMapper/IncludeMapper";

export interface DataAdpater {
  typeMapper: DataMapper;
  inculdeMapper: IncludeMapper;
  securityApplier: SecurityApplier;

  defineModel(attrbuites: any, dataname?: string, options?: any): void;
  create(modelName: string, data: any): any;
  findAll(modelName: string, query?: Query, includeKey?: Array<any>): any;

  update(modelName: string, data: any, query?: Query): any;
  findOne(modelName: string, query?: Query, includeKey?: Array<any>): any;
  delete(modelName: string, query?: Query): any;

  relatedTo(sociatedModel: any, associatedModel: any, options?: any): void;
  ownMany(sociatedModel: any, associatedModel: any, options?: any): void;
  relatedToMany(sociatedModel: any, associatedModel: any, options?: any): void;
  ownOne(sociatedModel: any, associatedModel: any, options?: any): void;
}
