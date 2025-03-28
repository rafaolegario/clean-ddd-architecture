import { QuestionsRepository } from '../repositories/question-repository'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface FetchQuestionAnswersUseCaseRequest {
  questionID: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answers: Answer[]
  }
>

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
      return left(new ResourceNotFoundError())
    }

    const answers = await this.AnswersRepositoy.fetchManyByQuestionId(
      question,
      {
        page,
      },
    )

    return right({ answers })
  }
}
