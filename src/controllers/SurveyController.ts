import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/ServeysRepository";

class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body

    const surveysRepository = getCustomRepository(SurveyRepository)

    const survey = surveysRepository.create({
      title,
      description
    })

    console.log(survey)

    await surveysRepository.save(survey)

    return response.status(201).json(survey)
  }

  async index(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveyRepository)

    const all = await surveysRepository.find()

    return response.status(200).json(all)
  }
}

export { SurveyController }
