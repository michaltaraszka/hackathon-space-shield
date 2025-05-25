import type {Drone} from "./Drone.ts";
import type {Location} from "./Location.ts";

export interface DroneStation {
    position: Location
    id: string // Unique identifier for the drone station
    drones: Drone[]
}

