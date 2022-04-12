import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({}: HttpContextContract) {
    return Post.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['title', 'content'])
    const post = await Post.create(data)
    return response.status(200).json({ message: 'Inserção efetuada com êxito', data: post })
  }

  public async show({ response, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    response.status(200).json({ message: 'Post Encontrando com êxito', data: post })
  }

  public async update({ request, params, response }: HttpContextContract) {
    const post = await Post.find(params.id)
    const data = request.only(['title', 'content'])

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
