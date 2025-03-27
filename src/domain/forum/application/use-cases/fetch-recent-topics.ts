import { QuestionsRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'

interface FetchRecentQuestionUseCaseRequest {
  page: number
}

interface FetchRecentQuestionUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionUseCase {
  constructor(private QuestionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const questions = await this.QuestionsRepository.findManyRecent({ page })

    return { questions }
  }
}
