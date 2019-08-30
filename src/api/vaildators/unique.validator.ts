import { ValidatorBase } from "../../core/validators/ValidatorsBase";
import { ModelBase } from "../../core/models/ModelBase";

export class UniqueVaildator extends ValidatorBase {
  /**
   *  check if value has stored in the model before
   * @param value
   * @param params {
   *    @param model
   *    @param key
   *    @param modelId
   * }
   */
  async Validate(
    value: any,
    params?: { model: ModelBase; key: any; modelId?: any }
  ) {
    if (params && value) {
      let data = await params.model.findAll({
        equalTo: [
          {
            attribute: params.key,
            value: value
          }
        ]
      });
      // if i update model so i can use the same name again
      let isTheSameModel;
      // if return data
      if (data[0]) {
        isTheSameModel = data[0].id == params.modelId;
      }
      if (data.length && !isTheSameModel) {
        return `${params.key} isn't unique`;
      }
    }
  }
}
