import { Entity } from "../../core/entities/entitie"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  
  constructor( props: StudentProps ,id?: UniqueEntityID){
    super(props, id)
  }
}