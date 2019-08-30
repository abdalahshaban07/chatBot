import { Sequelize } from "sequelize";

import { Query } from "../../queryMapper/Query";
import { SequelizeMapper } from "../../dataMapper/SequelizeMapper";
import { DataMapper } from "../../dataMapper/DataMapper";
import { QueryMapper } from "../../queryMapper/QueryMapper";
import { SequelizeQueryMapper } from "../../queryMapper/SequelizeQueryMapper";
import { SecurityApplier } from "../../security/SecurityApplier";
import { DataAdapter } from "../DataAdpater";
import { IncludeMapper } from "../../includeMapper/IncludeMapper";
import { SequelizeIncludeMapper } from "../../includeMapper/SequelizeInculdeMapper";
import { IncludeQuery } from "../../includeMapper/IncludeQuery";
// import config = require("../../../database/config/config.js");
let config = {
  "development": {
    "username": "FBYpcOB6Rz2m16Gp",
    "password": "uE4TvAeVt8ETbWyzFLGDzbUtV2quqTBM",
    "database": "chatBot",
    "host": "rds-dev.czoiomybl4tn.us-east-1.rds.amazonaws.com",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
export class DataBaseAdpater implements DataAdapter {
  private Sequelize!: Sequelize;
  private static _instance: DataBaseAdpater;
  private relationsHistory: string[] = [];
  typeMapper: DataMapper = new SequelizeMapper();
  queryMapper: QueryMapper = new SequelizeQueryMapper();
  includeMapper: IncludeMapper = new SequelizeIncludeMapper(this.queryMapper);
  securityApplier!: SecurityApplier;

  private constructor() {
    this.Sequelize = new Sequelize(this.initializeSequelize());
  }

  private initializeSequelize() {
    return config[process.env.NODE_ENV || "development"];
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new DataBaseAdpater();
    }
    return this._instance;
  }

  public defineModel(attrbuites: any, tableName: string, options?: any) {
    let attrsWithTypes: any = {};
    Object.keys(attrbuites).forEach(key => {
      attrsWithTypes[key] = this.typeMapper.getType(attrbuites[key]);
    });
    return this.Sequelize.define(tableName, attrsWithTypes, options);
  }

  ///////// query methods /////////////
  create(modelName: string, data: any) {
    return this.getModelRef(modelName).create(data);
  }
  async findAll(
    modelName: string,
    query?: Query,
    includeKey?: Array<IncludeQuery>
  ) {
    let mapedQuery = this.queryMapper.getQuery(query);
    let inculdQuery = this.includeMapper.getIncludeQuery(
      includeKey,
      this.Sequelize.models
    );

    let findAllQuery = {
      ...mapedQuery,
      ...inculdQuery
    };

    if (findAllQuery.limit) {
      return this.paginateRecords(modelName, findAllQuery);
    } else {
      return this.findAllRecords(modelName, findAllQuery);
    }
  }

  private findAllRecords(modelName: string, findAllQuery: any) {
    return this.getModelRef(modelName).findAll(findAllQuery);
  }

  private async paginateRecords(modelName: string, findAllQuery: any) {
    let results = await this.getModelRef(modelName).findAndCountAll(
      findAllQuery
    );
    return {
      data: results.rows,
      total: results.count,
      totalPages: +(results.count / findAllQuery.pageSize).toFixed() + 1
    };
  }
  update(modelName: string, data: any, query?: Query) {
    let mapedQuery = this.queryMapper.getQuery(query);

    let updateQuery = {
      ...mapedQuery
    };
    return this.getModelRef(modelName).update(data, updateQuery);
  }
  findOne(modelName: string, query?: Query, includeKey?: Array<IncludeQuery>) {
    let mapedQuery = this.queryMapper.getQuery(query);
    let inculdQuery = this.includeMapper.getIncludeQuery(
      includeKey,
      this.Sequelize.models
    );

    let findOneQuery = {
      ...mapedQuery,
      ...inculdQuery
    };
    return this.getModelRef(modelName).findOne(findOneQuery);
  }
  delete(modelName: string, query?: Query) {
    let mapedQuery = this.queryMapper.getQuery(query);

    let DeleteQuery = {
      ...mapedQuery
    };
    return this.getModelRef(modelName).destroy(DeleteQuery);
  }

  ////////// realtions methods ///////////
  isRealtionsDefinedddd(sociatedModel: any, associatedModel: any) {
    let record = sociatedModel + "-" + associatedModel;

    if (this.relationsHistory.indexOf(record) > -1) {
      return true;
    }
    this.relationsHistory.push(record);
  }
  /**
   *
   * @param sociatedModel model which add relation to
   * @param associatedModel model which used in this realations
   * @param options
   */
  relatedTo(sociatedModel: any, associatedModel: any, options?: any) {
    if (this.isRealtionsDefinedddd(sociatedModel, associatedModel)) return;
    this.getModelRef(sociatedModel).belongsTo(
      this.getModelRef(associatedModel),
      options
    );
  }
  /**
   * one to many relation
   * @param sociatedModel model which add relation to
   * @param associatedModel model which used in this realations
   * @param options
   */
  ownMany(sociatedModel: any, associatedModel: any, options?: any) {
    if (this.isRealtionsDefinedddd(sociatedModel, associatedModel)) return;
    this.getModelRef(sociatedModel).hasMany(
      this.getModelRef(associatedModel),
      options
    );
  }
  /**
   * many to many relation
   * @param sociatedModel model which add relation to
   * @param associatedModel model which used in this realations
   * @param options
   */
  relatedToMany(sociatedModel: any, associatedModel: any, options?: any) {
    if (this.isRealtionsDefinedddd(sociatedModel, associatedModel)) return;
    this.getModelRef(sociatedModel).belongsToMany(
      this.getModelRef(associatedModel),
      options
    );
  }
  /**
   * one to one relation
   * @param sociatedModel model which add relation to
   * @param associatedModel model which used in this realations
   * @param options
   */
  ownOne(sociatedModel: any, associatedModel: any, options?: any) {
    if (this.isRealtionsDefinedddd(sociatedModel, associatedModel)) return;
    this.getModelRef(sociatedModel).hasOne(
      this.getModelRef(associatedModel),
      options
    );
  }

  private getModelRef(type: string): any {
    return this.Sequelize.models[type];
  }
}
