export namespace VehicleApplicationEvent {
  export namespace VehicleCreated {
    export const key = 'vehicle.application.vehicle.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
