export namespace PermissionApplicationEvent {
  export namespace PermissionCreated {
    export const key = 'permission.application.permission.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
