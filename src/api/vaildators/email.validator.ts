import validator from "validator";
import { ValidatorBase } from "../../core/validators/ValidatorsBase";

export class EmailVaildator extends ValidatorBase {
  async Validate(value: any, params?: any) {
    if (!validator.isEmail(value)) {
      return `Wrong email format`;
    }
  }
}
