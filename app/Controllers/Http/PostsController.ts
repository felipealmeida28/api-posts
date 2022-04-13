import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import StoreValidator from 'App/Validators/Post/StoreValidator'
import UpdateValidator from 'App/Validators/Post/UpdateValidator'
export default class PostsController {
  public async index({}: HttpContextContract) {
    return Post.all()
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await auth.authenticate()

    const post = await Post.create({ authorId: user.id, ...data })

    await post.load('author')

    return response.status(200).json({ message: 'Inserção efetuada com êxito', data: post })
  }

  public async show({ response, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    response.status(200).json({ message: 'Post Encontrando com êxito', data: post })
  }

  public async update({ request, params, response }: HttpContextContract) {
    const post = await Post.find(params.id)
    const data = await request.validate(UpdateValidator)

    if (post) {
      post.merge(data)
      await post.save()

      return response.created(post)
    }
    return response.notFound({ error: 'nenhum registro encontrado' })
  }
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      post.delete()
      response.ok({ sucess: 'resgistro apagado com exito' })
    } catch (error) {
      response.notFound({ error: 'nada encontrando' })
    }
  }
}
