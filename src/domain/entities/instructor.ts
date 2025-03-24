import { Entity } from "../../core/entities/entitie"

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {

  constructor(props: InstructorProps, id?: string){
    super(props, id)
  }
}