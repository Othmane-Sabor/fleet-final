export namespace DepartmentApplicationEvent {
  export namespace DepartmentCreated {
    export const key = 'department.application.department.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
