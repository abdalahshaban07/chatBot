import { ValidatorBase } from "../../core/validators/ValidatorsBase";

export class RequierdVaildator extends ValidatorBase {
  async Validate(value: any, params?: any): Promise<any> {
    if (!value) {
      return "this feild is requierd";
    }
  }
}
