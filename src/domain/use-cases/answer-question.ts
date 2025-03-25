import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Answer } from "../entities/answer"
import { AnswerRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
  instructorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({instructorId, questionId, content}:AnswerQuestionUseCaseRequest) {
   const answer =  new Answer({
    content,
    questionId,
    authorId: instructorId,
    
   })

   this.answerRepository.create(answer)

   return answer
  }
}