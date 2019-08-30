import * as express from "express";
import { RouteVaildator } from "./RouteVaildator";
export abstract class APIBase {
  abstract path: string;
  public router = express.Router();

  abstract initRoutes(): void;

  public async Validate(data: any, validators: RouteVaildator[]) {
    let errors = await Promise.all(
      validators.map(async validator => {
        let keyErrors: any = {};

        let errors = await Promise.all(
          validator.validators.map(async keyValidator => {
            let ValidateError = await keyValidator.validator.Validate(
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
}
