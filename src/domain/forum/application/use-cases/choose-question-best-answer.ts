import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/question-repository'

interface ChooseBestAnswerUseCaseRequest {
  authorID: string
  answerID: string
}

interface ChooseBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseBestAnswerUseCase {
  constructor(
    private QuestionsRepository: QuestionsRepository,
    private AnswersRepositoy: AnswersRepository,
  ) {}

  async execute({
    authorID,
    answerID,
  }: ChooseBestAnswerUseCaseRequest): Promise<ChooseBestAnswerUseCaseResponse> {
    const answer = await this.AnswersRepositoy.findById(answerID)

    if (!answer) {
      throw new Error('Answer not found!')
    }

    const question = await this.QuestionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found!')
    }

    if (question?.authorId.toString() !== authorID) {
      throw new Error('Not allowed!')
    }

    question.bestAnswerId = answer.id
    this.QuestionsRepository.save(question)

    return {
      question,
    }
  }
}
