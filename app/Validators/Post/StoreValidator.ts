import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.unique({ table: 'posts', column: 'title' })]),
    content: schema.string({ trim: true }),
  })

  public messages = {
    'required': '{{ field }} necessario',
    'title.unique': 'o titulo precisa ser unico',
  }
}
