import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentRepository {
  create(QuestionComment: QuestionComment): Promise<void>
}
