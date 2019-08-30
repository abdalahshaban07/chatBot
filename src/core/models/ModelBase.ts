import { DataWrapper } from "./DataWrapper";
import { Query } from "../queryMapper/Query";
import { IncludeQuery } from "../includeMapper/IncludeQuery";
import { ModelVailadtors } from "./ModelVaildators";

export abstract class ModelBase {
  abstract attrbuites: any;
  abstract validators: ModelVailadtors[];
  public options: any;
  abstract tableName: string;
  private DataWrapper: DataWrapper = new DataWrapper();
  constructor() {
    //  this.initializeDataWrapper()
  }

  async initializeDataWrapper() {
    // this.DataWrapper = ;
    await this.DataWrapper.defineModel(
      this.attrbuites,
      this.tableName,
      this.options
    );
    await this.initializeAssociations();
  }

  initializeAssociations() {}

  /**
   * run all vaildator which define in model
   */
  async ValidateModel(data: any) {
    let errors = await Promise.all(
      this.validators.map(async validator => {
        let keyErrors: any = {};

        let errors = await Promise.all(
          validator.Vailadtors.map(async keyValidator => {
            let ValidateError = await keyValidator.vaildator.Validate(
              data[validator.key],
              keyValidator.params
            );
            return ValidateError || false;
          })
        );
        /**
         * filter errors for emapty error
         */
        keyErrors[validator.key] = errors.filter(error => {
          return error;
        });
        return keyErrors[validator.key].length ? keyErrors : false;
      })
    );

    /**
     * transform error array to object
     */

    let errorsObj: any = {};
    errors.forEach(error => {
      if (error) {
        let key = Object.keys(error)[0];
        errorsObj[key] = error[key];
      }
    });

    return Object.keys(errorsObj).length ? errorsObj : null;
  }
  /**
   * @description get model for using in other model relations
   */
  get modelInsistence() {
    return;
  }

  /**
   * @description create method
   * at fist it will check for vailditors then
   * if true return success promise
   * else return array of errors
   * @param data
   */
  async create(data: any) {
    let errors = await this.ValidateModel(data);
    if (errors) {
      return { errors: errors };
    }
    let createdModel = await this.DataWrapper.create(data);
    return createdModel;
  }

  async findAll(query?: Query, includeKey?: Array<IncludeQuery>) {
    return await this.DataWrapper.findAll(query, includeKey);
  }
  async findOne(query?: Query, includeKey?: Array<IncludeQuery>) {
    return await this.DataWrapper.findOne(query, includeKey);
  }

  async update(data: any, query?: Query) {
    return await this.DataWrapper.update(data, query);
  }
  async delete(query?: Query) {
    return await this.DataWrapper.delete(query);
  }
  relatedTo(model: any, options?: any) {
    this.DataWrapper.modelRelatedTo(model, options);
  }

  ownMany(model: any, options?: any) {
    this.DataWrapper.modelOwnMany(model, options);
  }

  relatedToMany(model: any, options?: any) {
    this.DataWrapper.modelRelatedToMany(model, options);
  }

  ownOne(model: any, options?: any) {
    this.DataWrapper.modelOwnOne(model, options);
  }
}
