import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class CreateUsersSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await User.createMany([
      {
        email: 'admin@admin.com',
        password: 'password',
        role: 'admin',
      },
      {
        email: 'normal@normal.com',
        password: 'password',
        role: 'normal',
      },
    ])
  }
}
