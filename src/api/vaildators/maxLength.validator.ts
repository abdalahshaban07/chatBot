import { ValidatorBase } from "../../core/validators/ValidatorsBase";

export class maxLengthtVaildator extends ValidatorBase {
  async Validate(value: any, params?: any) {
    if (value.length > params) {
      return `maximum length is ${params}`;
    }
  }
}
