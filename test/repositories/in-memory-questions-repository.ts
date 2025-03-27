import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }

  async delete(question: Question) {
    this.items = this.items.filter(
      (item) => item.id.toString() !== question.id.toString(),
    )
  }

  async save(question: Question) {
    const ItemIndex = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )

    this.items[ItemIndex] = question
  }

  async findBySlug(slug: string) {
    const questions = this.items.find((item) => item.slug.value === slug)

    if (!questions) {
      return null
    }

    return questions
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toValue() === id)

    if (!question) {
      return null
    }

    return question
  }
}
