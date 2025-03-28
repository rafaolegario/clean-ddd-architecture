import { QuestionsRepository } from '../repositories/question-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'

interface QuestionCommentUseCaseRequest {
  authorID: string
  questionID: string
  content: string
}

interface QuestionCommentUseCaseResponse {
  questionComment: QuestionComment
}

export class QuestionCommentUseCase {
  constructor(
    private QuestionsRepository: QuestionsRepository,
    private QuestionCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    authorID,
    questionID,
    content,
  }: QuestionCommentUseCaseRequest): Promise<QuestionCommentUseCaseResponse> {
    const question = await this.QuestionsRepository.findById(questionID)

    if (!question) {
      throw new Error('Question not found!')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorID),
      questionId: question.id,
      content,
    })

    await this.QuestionCommentRepository.create(questionComment)

    return { questionComment }
  }
}
