import { QuestionCommentRepository } from '../repositories/question-comment-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorID: string
  commentID: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private QuestionCommentRepository: QuestionCommentRepository) {}

  async execute({
    authorID,
    commentID,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const QuestionComment =
      await this.QuestionCommentRepository.findById(commentID)

    if (!QuestionComment) {
      throw new Error('Question Comment not found!')
    }

    if (QuestionComment.authorId.toString() !== authorID) {
      throw new Error('Not allowed')
    }

    await this.QuestionCommentRepository.delete(QuestionComment)

    return {}
  }
}
