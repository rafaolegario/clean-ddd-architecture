import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { MakeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('Should be able to edit an question', async () => {
    const question = MakeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionID: 'question-1',
      authorID: 'author-1',
      title: 'New title',
      content: 'New Content',
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'New Content',
    })
  })

  it('Should not be able to edit an question from another user', async () => {
    const question = MakeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionRepository.create(question)

    const result = await sut.execute({
      questionID: 'question-1',
      authorID: 'author-2',
      title: 'New title',
      content: 'New Content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
