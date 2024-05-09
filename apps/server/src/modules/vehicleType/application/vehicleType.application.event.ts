export namespace VehicleTypeApplicationEvent {
  export namespace VehicleTypeCreated {
    export const key = 'vehicleType.application.vehicleType.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
