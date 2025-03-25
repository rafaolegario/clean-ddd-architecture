import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

/* eslint-disable-next-line */
export function MakeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: 'Test question',
    content: 'New question',
  })

  return question
}
