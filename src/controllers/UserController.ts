import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UsersRepository"

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body
    const userRepository = getCustomRepository(UserRepository)
    const userAlreadyExists = await userRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      return response.status(400).json({
        error: "User already exists!"
      })
    }

    const user = userRepository.create({
      name, email
    })
    await userRepository.save(user)
    return response.status(201).json(user)
  }

  async index(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository)
    const users = await userRepository.find()
    return response.status(200).json(users)
  }
}

export { UserController }

