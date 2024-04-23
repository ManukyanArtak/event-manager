import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from './isUniqueConstraint';

export type IsUniqueInterface = {
  tableName: string;
  column: string;
};

export function isUnique(
  options: IsUniqueInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
