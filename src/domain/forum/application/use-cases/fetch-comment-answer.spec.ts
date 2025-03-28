import { MakeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { FetchCommentAnswerUseCase } from './fetch-comment-answer'
import { MakeCommentAnswer } from 'test/factories/make-comment-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: FetchCommentAnswerUseCase

describe('Fetch answer comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new FetchCommentAnswerUseCase(inMemoryAnswerCommentRepository)
  })

  it('Should be able to fetch comments in a answer', async () => {
    const answer = MakeAnswer()

    await inMemoryAnswerRepository.create(answer)

    for (let i = 0; i < 5; i++) {
      const AnswerComment = MakeCommentAnswer({
        answerId: answer.id,
      })

      await inMemoryAnswerCommentRepository.create(AnswerComment)
    }

    const { CommentAnswers } = await sut.execute({
      answerID: answer.id.toString(),
      page: 1,
    })

    expect(CommentAnswers).toHaveLength(5)
  })

  it('Should be able to paginated comments in a answer', async () => {
    const answer = MakeAnswer()

    await inMemoryAnswerRepository.create(answer)

    for (let i = 0; i < 22; i++) {
      const AnswerComment = MakeCommentAnswer({
        answerId: answer.id,
      })

      await inMemoryAnswerCommentRepository.create(AnswerComment)
    }

    const { CommentAnswers } = await sut.execute({
      answerID: answer.id.toString(),
      page: 2,
    })

    expect(CommentAnswers).toHaveLength(2)
  })
})
