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
    const question = MakeQuestion({}, new UniqueEntityID('1'))

    await sut.execute({ questionID: '1' })

    expect(question.id.toString()).toEqual(undefined)
  })
})
