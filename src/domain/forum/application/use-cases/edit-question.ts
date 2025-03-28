import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { NotAllowedError } from './errors/not-allowed-error'

interface EditQuestionUseCaseRequest {
  questionID: string
  authorID: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class EditQuestionUseCase {
  constructor(private QuestionsRepository: QuestionsRepository) {}

  async execute({
    questionID,
    authorID,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.QuestionsRepository.findById(questionID)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorID !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.QuestionsRepository.save(question)

    return right({
      question,
    })
  }
}
