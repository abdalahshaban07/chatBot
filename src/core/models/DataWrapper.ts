import { ModelBase } from "./ModelBase";
import { Query } from "../queryMapper/Query";
import { DataBaseTypes } from "../../core/dataAdapter/DataBaseAdpater/DataBaseTypes";
import { IncludeQuery } from "../includeMapper/IncludeQuery";
import { DataBaseAdpater } from "../dataAdapter/DataBaseAdpater/DataBaseAdpater";
import { DataAdapter } from "../dataAdapter/DataAdpater";

export class DataWrapper {
  private dataAdapter: DataAdapter = DataBaseAdpater.instance;
  private modelName!: string;
  constructor() { }

  /**
   * @description define model using Db Layer
   */
  defineModel(attrbuites: any, typeName?: any, options?: any) {
    this.modelName = typeName;
    this.dataAdapter.defineModel(attrbuites, typeName, options);
  }
  /**
   * return model to using in relations
   */

  /**
   * create method from model
   * @param data create data
   */
  async create(data: any) {
    return await this.dataAdapter.create(this.modelName, data);
  }
  /**
   * find all from model
   * @param query query data
   */
  async findAll(query?: Query, includeKey?: Array<IncludeQuery>) {
    return await this.dataAdapter.findAll(this.modelName, query, includeKey);
  }
  /**
   * find one from model
   * @param query query data
   */
  async findOne(query?: Query, includeKey?: Array<IncludeQuery>) {
    return await this.dataAdapter.findOne(this.modelName, query, includeKey);
  }
  /**
   * update  model data
   * @param query query data
   */
  async update(data: any, query?: Query) {
    return await this.dataAdapter.update(this.modelName, data, query);
  }
  /**
   * delete  model
   * @param query query data
   */
  async delete(query?: Query) {
    return await this.dataAdapter.delete(this.modelName, query);
  }
  /**
   * one to one relation
   * @param model
   * @param options
   */
  modelRelatedTo(model: any, options?: any) {
    this.dataAdapter.relatedTo(this.modelName, model, options);
  }
  /**
   * one to many relation
   * @param model
   * @param options
   */
  modelOwnMany(model: any, options?: any) {
    this.dataAdapter.ownMany(this.modelName, model, options);
  }
  /**
   * many to many relation
   * @param model
   * @param options
   */
  modelRelatedToMany(model: any, options?: any) {
    this.dataAdapter.relatedToMany(this.modelName, model, options);
  }
  /**
   * one to one relation
   * @param model
   * @param options
   */
  modelOwnOne(model: any, options?: any) {
    this.dataAdapter.ownOne(this.modelName, model, options);
  }
}
