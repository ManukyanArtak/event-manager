import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsExistConstraint } from './isExistConstraint';

export type IsExistInterface = {
  tableName: string;
  column: string;
};

export function isExist(
  options: IsExistInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsExistConstraint,
    });
  };
}
