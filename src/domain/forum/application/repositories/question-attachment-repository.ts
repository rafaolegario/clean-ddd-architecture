import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentsRepository {
  fetchManyByQuestionId(questionID: string): Promise<QuestionAttachment[]>
}
