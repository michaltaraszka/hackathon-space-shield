import type {Location} from "./models/Location.ts";
import type { DroneStation } from "./models/DroneStation.ts";

export const getDistanceMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number => {
    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371000; // Earth radius in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters
}

export const selectDroneStation = (location: Location, stations: DroneStation[]) => {
    const nearestDrone = stations
        .flatMap(station =>
            station.drones.map(drone => ({
                ...station,
                droneId: drone.id,
                status: drone.status,
                distance: getDistanceMeters(
                    location.latitude,
                    location.longitude,
                    station.position.latitude,
                    station.position.longitude
                )
            }))
        )
        // limit to distance less than 10000 meters
        .filter(drone => drone.distance < 10000)
        // filter out active drones (those with missions)
        .filter(drone => drone.status == 'IDLE')
        .sort((a, b) => a.distance - b.distance)[0];
    console.log(nearestDrone);
    return nearestDrone;
}