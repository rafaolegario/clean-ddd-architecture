import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }

  async delete(id: string) {
    this.items = this.items.filter((item) => item.id.toValue() !== id)
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
