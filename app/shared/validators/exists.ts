import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'

import db from 'database/connection'

@ValidatorConstraint({ async: true })
export class ExistsConstraint implements ValidatorConstraintInterface {
  public async validate(value: any, args: ValidationArguments) {
    const table = args.constraints[0]
    if (!table) throw new Error('Table argument is missing')

    const [item] = await db(table).where(args.property, value).whereNot('is_deleted', true)
    return !!item
  }
}

export const Exists = (table: string, validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [table],
      validator: ExistsConstraint,
    })
  }
}
