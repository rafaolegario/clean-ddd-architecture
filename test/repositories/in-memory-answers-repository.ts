import { PaginationParams } from '@/core/repositories/pagination-parms'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    this.items = this.items.filter(
      (item) => item.id.toString() !== answer.id.toString(),
    )
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toValue() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async fetchManyByQuestionId(question: Question, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === question?.id.toString())
      .slice((page - 1) * 20, page * 20)

    return answers
  }
}
