import { ValidatorBase } from "../../core/validators/ValidatorsBase";

export class ArrayValidators extends ValidatorBase {
  async Validate(
    value: Array<any>,
    params?: {
      validatorsParams?: any;
      validator: ValidatorBase;
    }
  ) {
    if (params && value) {
      let errors = await Promise.all(
        value.map(async (ele, index) => {
          let validatorMsg = await params.validator.Validate(
            ele,
            params.validatorsParams
          );
          return validatorMsg ? { [ele]: validatorMsg } : false;
        })
      );
      errors = errors.filter(ele => ele);
      if (errors.length) {
        return errors;
      }
    }
  }
}
