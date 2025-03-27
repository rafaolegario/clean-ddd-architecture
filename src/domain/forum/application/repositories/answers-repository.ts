import { PaginationParams } from '@/core/repositories/pagination-parms'
import { Answer } from '../../enterprise/entities/answer'
import { Question } from '../../enterprise/entities/question'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  fetchManyByQuestionId(
    question: Question,
    params: PaginationParams,
  ): Promise<Answer[]>
}
