import { randomUUID } from "node:crypto"

export class Instructor {
  public id: string
  public email: string

  constructor(email: string, id?: string){
    this.email = email
    this.id = id ?? randomUUID()
  }
}