export namespace RolePermissionApplicationEvent {
  export namespace RolePermissionCreated {
    export const key = 'rolePermission.application.rolePermission.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
