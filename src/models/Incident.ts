import type {Drone} from "./Drone.ts";
import type {IncidentData} from "./IncidentPopupView.ts";

export interface Incident {
    id: string // Unique identifier for the incident
    status: IncidentStatus
    drone?: Drone
    data: IncidentData
}

export type IncidentStatus = 'NEW' | 'ACTIVE' | 'CLOSED'
