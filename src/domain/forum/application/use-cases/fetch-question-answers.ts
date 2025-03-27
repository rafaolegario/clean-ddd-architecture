import { QuestionsRepository } from '../repositories/question-repository'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchQuestionAnswersUseCaseRequest {
  questionID: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(
    private QuestionsRepository: QuestionsRepository,
    private AnswersRepositoy: AnswersRepository,
  ) {}

  async execute({
    questionID,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const question = await this.QuestionsRepository.findById(questionID)

    if (!question) {
      throw new Error('Question not found!')
    }

    const answers = await this.AnswersRepositoy.fetchManyByQuestionId(
      question,
      {
        page,
      },
    )

    return { answers }
  }
}
