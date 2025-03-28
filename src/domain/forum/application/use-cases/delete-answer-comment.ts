import { Either, left, right } from '@/core/either'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorID: string
  commentID: string
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

export class DeleteAnswerCommentUseCase {
  constructor(private AnswerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorID,
    commentID,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const AnswerComment = await this.AnswerCommentRepository.findById(commentID)

    if (!AnswerComment) {
      return left('Answer Comment not found!')
    }

    if (AnswerComment.authorId.toString() !== authorID) {
      return left('Not allowed')
    }

    await this.AnswerCommentRepository.delete(AnswerComment)

    return right({})
  }
}
