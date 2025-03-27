import { QuestionsRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseRequest {
  questionID: string
  authorID: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private QuestionsRepository: QuestionsRepository) {}

  async execute({
    questionID,
    authorID,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.QuestionsRepository.findById(questionID)

    if (!question) {
      throw new Error('Question not found!')
    }

    if (authorID !== question.authorId.toString()) {
      throw new Error('Not allowed!')
    }

    await this.QuestionsRepository.delete(question)

    return {}
  }
}
