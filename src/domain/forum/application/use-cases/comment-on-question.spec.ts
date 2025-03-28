import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { QuestionCommentUseCase } from './comment-on-question'
import { MakeQuestion } from 'test/factories/make-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: QuestionCommentUseCase

describe('Create question comment', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new QuestionCommentUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('Should be able to create an question comment', async () => {
    const question = MakeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      authorID: question.authorId.toString(),
      questionID: question.id.toString(),
      content: 'content example',
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'content example',
    )
  })
})
