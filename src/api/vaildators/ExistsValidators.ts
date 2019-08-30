import { ValidatorBase } from "../../core/validators/ValidatorsBase";
import { ModelBase } from "../../core/models/ModelBase";

export class ExistsValidators extends ValidatorBase {
  async Validate(value: any, params?: { model: ModelBase; key: any }) {
    if (params && value) {
      let data = await params.model.findAll({
        equalTo: [
          {
            attribute: params.key,
            value: value
          }
        ]
      });

      if (!data.length) {
        return `${params.key} isn't exists in ${params.model.tableName}`;
      }
    }
  }
}
