export namespace TaskApplicationEvent {
  export namespace TaskCreated {
    export const key = 'task.application.task.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
