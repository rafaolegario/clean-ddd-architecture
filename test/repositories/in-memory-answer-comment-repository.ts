import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(comment: AnswerComment) {
    this.items = this.items.filter(
      (item) => item.id.toString() !== comment.id.toString(),
    )
  }

  async findById(id: string) {
    const comment = this.items.find((item) => item.id.toValue() === id)

    if (!comment) {
      return
    }

    return comment
  }
}
