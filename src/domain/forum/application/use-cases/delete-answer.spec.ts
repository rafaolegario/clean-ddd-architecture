import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { MakeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('Should be able to delete an answer', async () => {
    const newAnswer = MakeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({ answerID: 'answer-1', authorID: 'author-1' })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete an answer from another user', async () => {
    const answer = MakeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswerRepository.create(answer)

    expect(async () => {
      await sut.execute({
        answerID: 'answer-1',
        authorID: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
