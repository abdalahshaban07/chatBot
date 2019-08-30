export abstract class ValidatorBase {
  abstract Validate(value: any, params?: any): string | any;
}
