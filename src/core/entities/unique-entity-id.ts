import { randomUUID } from "node:crypto"

export class UniqueEntityID {
  private value: string

  constructor(){
    this.value = randomUUID()
  }

  toString(){
    return this.value
  }

  toValue(){
    return this.value
  }

}