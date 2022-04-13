import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateTokenValidator from 'App/Validators/auth/CreateTokenValidator'
export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(CreateTokenValidator)

    request.validate(CreateTokenValidator)
    const token = await auth.attempt(email, password, {
      expiresIn: '30 days',
    })

    return token
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
