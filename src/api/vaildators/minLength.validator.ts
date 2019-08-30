import { ValidatorBase } from "../../core/validators/ValidatorsBase";

export class minLengthtVaildator extends ValidatorBase {
  async Validate(value: any, params?: any) {
    if (value.length < params) {
      return `minimum length is ${params}`;
    }
  }
}
