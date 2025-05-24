import type {Drone} from "./Drone.ts";

export interface Incident {
    position: Location
    status: IncidentStatus
    drone?: Drone
}

export type IncidentStatus = 'NEW' | 'ACTIVE' | 'CLOSED'
