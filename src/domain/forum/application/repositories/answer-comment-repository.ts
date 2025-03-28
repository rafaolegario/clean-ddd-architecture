import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentRepository {
  create(AnswerComment: AnswerComment): Promise<void>
  delete(comment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | void>
}
