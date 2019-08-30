import { Sequelize } from "sequelize";
import { readFileSync } from "fs";
import { join } from "path";
import { Query } from "../../queryMapper/Query";
import { SequelizeMapper } from "../../dataMapper/SequelizeMapper";
import { DataMapper } from "../../dataMapper/DataMapper";
import { QueryMapper } from "../../queryMapper/QueryMapper";
import { SequelizeQueryMapper } from "../../queryMapper/SequelizeQueryMapper";
import { SecurityApplier } from "../../security/SecurityApplier";
import { DataAdpater } from "../DataAdpater";
import { IncludeMapper } from "../../includeMapper/IncludeMapper";
import { SequelizeIncludeMapper } from "../../includeMapper/SequelizeInculdeMapper";
import { IncludeQuery } from "../../includeMapper/IncludeQuery";

export class DataBaseAdapter implements DataAdpater {
  private Sequelize!: Sequelize;
  private static _instance: DataBaseAdapter;
  private realtionsHistory: string[] = [];
  typeMapper: DataMapper = new SequelizeMapper();
  queryMapper: QueryMapper = new SequelizeQueryMapper();
  inculdeMapper: IncludeMapper = new SequelizeIncludeMapper(this.queryMapper);
  securityApplier!: SecurityApplier;

  private constructor() {
    this.Sequelize = new Sequelize(this.initializeSequelize());
  }

  private initializeSequelize() {
    let configFile: any = readFileSync(
      join("src", "database", "config", "config.json")
    );
    let databaseConfig = JSON.parse(configFile);

    return databaseConfig[process.env.NODE_ENV || "development"];
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new DataBaseAdapter();
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
  findAll(modelName: string, query?: Query, includeKey?: Array<IncludeQuery>) {
    let mapedQuery = this.queryMapper.getQuery(query);
    let inculdQuery = this.inculdeMapper.getIncludeQuery(
      includeKey,
      this.Sequelize.models
    );

    let findAllQuery = {
      ...mapedQuery,
      ...inculdQuery
    };
    return this.getModelRef(modelName).findAll(findAllQuery);
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
    let inculdQuery = this.inculdeMapper.getIncludeQuery(
      includeKey,
      this.Sequelize.models
    );

    let findOneQuery = {
      ...mapedQuery,
      ...inculdQuery
    };
    console.log(findOneQuery)
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
    if (this.realtionsHistory.indexOf(record) > -1) {
      return true;
    }
    this.realtionsHistory.push(record);
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
