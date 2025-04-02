import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'

import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create questions', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('Should be able to create an question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'title example',
      content: 'New question',
      attachmentIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0].attachments).toHaveLength(2)
  })
})
