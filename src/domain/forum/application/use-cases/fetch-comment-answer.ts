import { AnswerCommentRepository } from '../repositories/answer-comment-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

interface FetchCommentAnswerUseCaseRequest {
  page: number
  answerID: string
}

interface FetchCommentAnswerUseCaseResponse {
  CommentAnswers: AnswerComment[]
}

export class FetchCommentAnswerUseCase {
  constructor(private AnswerCommentRepository: AnswerCommentRepository) {}

  async execute({
    page,
    answerID,
  }: FetchCommentAnswerUseCaseRequest): Promise<FetchCommentAnswerUseCaseResponse> {
    const CommentAnswers =
      await this.AnswerCommentRepository.fetchManyCommentsByAnswerId(answerID, {
        page,
      })

    return { CommentAnswers }
  }
}
