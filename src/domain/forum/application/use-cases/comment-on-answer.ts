import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface AnswerCommentUseCaseRequest {
  authorID: string
  answerID: string
  content: string
}

interface AnswerCommentUseCaseResponse {
  answerComment: AnswerComment
}

export class AnswerCommentUseCase {
  constructor(
    private AnswersRepository: AnswersRepository,
    private AnswerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorID,
    answerID,
    content,
  }: AnswerCommentUseCaseRequest): Promise<AnswerCommentUseCaseResponse> {
    const answer = await this.AnswersRepository.findById(answerID)

    if (!answer) {
      throw new Error('Answer not found!')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorID),
      answerId: answer.id,
      content,
    })

    await this.AnswerCommentRepository.create(answerComment)

    return { answerComment }
  }
}
