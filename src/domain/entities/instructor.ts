import { Entity } from "../../core/entities/entitie"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {

  constructor(props: InstructorProps, id?: UniqueEntityID){
    super(props, id)
  }
}