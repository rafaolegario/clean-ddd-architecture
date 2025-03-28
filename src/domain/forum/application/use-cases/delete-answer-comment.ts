import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorID: string
  commentID: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private AnswerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorID,
    commentID,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const AnswerComment = await this.AnswerCommentRepository.findById(commentID)

    if (!AnswerComment) {
      throw new Error('Answer Comment not found!')
    }

    if (AnswerComment.authorId.toString() !== authorID) {
      throw new Error('Not allowed')
    }

    await this.AnswerCommentRepository.delete(AnswerComment)

    return {}
  }
}
