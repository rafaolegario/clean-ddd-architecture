import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { MakeQuestion } from 'test/factories/make-question'
import { MakeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch answers', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswersRepository,
    )
  })

  it('Should be able to fetch answers in a question', async () => {
    const question = MakeQuestion()

    await inMemoryQuestionRepository.create(question)

    for (let i = 0; i < 5; i++) {
      const answer = MakeAnswer({
        questionId: question.id,
      })

      await inMemoryAnswersRepository.create(answer)
    }

    const { answers } = await sut.execute({
      questionID: question.id.toString(),
      page: 1,
    })

    expect(answers).toHaveLength(5)
  })

  it('Should be able to paginated answers in a question', async () => {
    const question = MakeQuestion()

    await inMemoryQuestionRepository.create(question)

    for (let i = 0; i < 22; i++) {
      const answer = MakeAnswer({
        questionId: question.id,
      })

      await inMemoryAnswersRepository.create(answer)
    }

    const { answers } = await sut.execute({
      questionID: question.id.toString(),
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
