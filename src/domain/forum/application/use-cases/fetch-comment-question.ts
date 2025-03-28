import { QuestionCommentRepository } from '../repositories/question-comment-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'

interface FetchCommentQuestionUseCaseRequest {
  page: number
  questionID: string
}

interface FetchCommentQuestionUseCaseResponse {
  CommentQuestions: QuestionComment[]
}

export class FetchCommentQuestionUseCase {
  constructor(private QuestionCommentRepository: QuestionCommentRepository) {}

  async execute({
    page,
    questionID,
  }: FetchCommentQuestionUseCaseRequest): Promise<FetchCommentQuestionUseCaseResponse> {
    const CommentQuestions =
      await this.QuestionCommentRepository.fetchManyCommentsByQuestionId(
        questionID,
        { page },
      )

    return { CommentQuestions }
  }
}
