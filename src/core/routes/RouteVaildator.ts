import { ValidatorBase } from "../validators/ValidatorsBase";

export interface RouteVaildator {
  key: string;
  validators: Array<{
    params?: any;
    validator: ValidatorBase;
  }>;
}
