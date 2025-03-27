import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { MakeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })

  it('Should be able to delete an question', async () => {
    const question = MakeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionRepository.create(question)

    await sut.execute({ questionID: 'question-1', authorID: 'author-1' })

    expect(inMemoryQuestionRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete an question from another user', async () => {
    const question = MakeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionRepository.create(question)

    expect(async () => {
      await sut.execute({
        questionID: 'question-1',
        authorID: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
