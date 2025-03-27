import { QuestionsRepository } from '../repositories/question-repository'

interface EditQuestionUseCaseRequest {
  questionID: string
  authorID: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {}

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
      throw new Error('Question not found!')
    }

    if (authorID !== question.authorId.toString()) {
      throw new Error('Not allowed!')
    }

    question.title = title
    question.content = content

    await this.QuestionsRepository.save(question)

    return {}
  }
}
