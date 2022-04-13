import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTokenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string(
      {
        trim: true,
        escape: true,
      },
      [rules.required, rules.email]
    ),
    password: schema.string({ trim: true, escape: true }, [rules.required]),
  })

  public messages = {}
}
