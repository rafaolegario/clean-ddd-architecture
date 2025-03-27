import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  answerID: string
  authorID: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private AnswersRepository: AnswersRepository) {}

  async execute({
    answerID,
    authorID,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.AnswersRepository.findById(answerID)

    if (!answer) {
      throw new Error('Answer not found!')
    }

    if (authorID !== answer.authorId.toString()) {
      throw new Error('Not allowed!')
    }

    await this.AnswersRepository.delete(answer)

    return {}
  }
}
