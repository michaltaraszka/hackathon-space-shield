import type {Drone} from "./Drone.ts";
import type {Location} from "./Location.ts";

export interface DroneStation {
    position: Location
    name: string
    drones: Drone[]
}

