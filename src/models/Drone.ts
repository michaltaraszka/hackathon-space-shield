import type { Location } from './Location';

export interface Drone {
    id: string // Unique identifier for the drone
    position: Location
    battery: number // Battery level as a percentage (0-100)
    status: 'IDLE' | 'FLYING' | 'CHARGING' // Current status of the drone
}