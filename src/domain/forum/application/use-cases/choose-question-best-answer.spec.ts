import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { MakeQuestion } from 'test/factories/make-question'
import { MakeAnswer } from 'test/factories/make-answer'
import { ChooseBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseBestAnswerUseCase

describe('Best answer', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswersRepository,
    )
  })

  it('Should be able to set a best answer in question', async () => {
    const question = MakeQuestion()

    const answer = MakeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerID: answer.id.toString(),
      authorID: question.authorId.toString(),
    })

    expect(question.bestAnswerId?.toString()).any.toString()
  })

  it('Should not be able to choose best answer from another user questions', async () => {
    const question = MakeQuestion()

    const answer = MakeAnswer({
      questionId: question.id,
    })

    await inMemoryAnswersRepository.create(answer)

    expect(async () => {
      await sut.execute({
        answerID: answer.id.toString(),
        authorID: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
