import type {MissionStatus, Photo} from "./models/Mission.ts";
import type {DroneStation} from "./models/DroneStation.ts";
import type {Drone} from "./models/Drone.ts";
import type {Incident} from "./models/Incident.ts";
import type {Location} from "./models/Location.ts";
import {getDistanceMeters} from "./services.ts";

export const mockDroneMission = (
    missionId: string,
    baseStation: DroneStation,
    drone: Drone,
    incident: Incident,
    updateDronePosition: (droneId: string, position: Location) => void,
    updateMissionStatus: (droneId: string, status: MissionStatus) => void,
    uploadDronePhoto: (missionId: string, photo: Photo) => void,
    resetDroneAfterMission: (droneId: string) => void,
    timeScale: number = 1 // 1 = real-time; 2 = twice as fast, etc.
) => {
    const warmUpTime = (60 * 1000) / timeScale; // 1 minute warm-up time scaled by time
    const flightSpeed = (50 / 3.6) * timeScale; // m/s scaled by time
    const surveyTime = (60 * 1000 * 5) / timeScale; // 5 minutes survey time scaled by time
    const homePosition = baseStation.position;
    const incidentPosition = incident.data.location;

    const totalDistance = getDistanceMeters(
        homePosition.latitude,
        homePosition.longitude,
        incidentPosition.latitude,
        incidentPosition.longitude
    );

    const flightTime = (totalDistance / flightSpeed) * 1000; // milliseconds

    const totalMissionTime = warmUpTime + flightTime + surveyTime + flightTime;
    let elapsedTime = 0;

    const photos: Photo[] = [{rgbUrl: 'rgb_0001.webp'}, {thermalUrl: 'infrared_0001.webp'}, {rgbUrl: 'rgb_0002.webp'}, {rgbUrl: 'rgb_0003.webp'}];

    const interval = setInterval(() => {
        elapsedTime += 1000;

        if (elapsedTime < warmUpTime) {
            updateMissionStatus(missionId, 'WARM_UP'); // warming up
        } else if (elapsedTime < warmUpTime + flightTime) {
            updateMissionStatus(missionId, 'ON_WAY');
            const progress = (elapsedTime - warmUpTime) / flightTime;
            const currentPosition = {
                latitude: homePosition.latitude + (incidentPosition.latitude - homePosition.latitude) * progress,
                longitude: homePosition.longitude + (incidentPosition.longitude - homePosition.longitude) * progress
            };
            updateDronePosition(drone.id, currentPosition);
        } else if (elapsedTime < warmUpTime + flightTime + surveyTime) {
            updateMissionStatus(missionId, 'SURVEY');
            // create function that uploads 10 photos every 10 seconds
            if (elapsedTime % 10000 === 0) {
                const photoIndex = Math.floor((elapsedTime - warmUpTime - flightTime) / 10000);
                if (photoIndex < photos.length) {
                    uploadDronePhoto(missionId, photos[photoIndex]);
                }
            }
        } else if (elapsedTime < totalMissionTime) {
            updateMissionStatus(missionId, 'ON_RETURN');
            const progress = (totalMissionTime - elapsedTime) / flightTime;
            const currentPosition = {
                latitude: homePosition.latitude + (incidentPosition.latitude - homePosition.latitude) * progress,
                longitude: homePosition.longitude + (incidentPosition.longitude - homePosition.longitude) * progress
            };
            updateDronePosition(drone.id, currentPosition);
        } else {
            clearInterval(interval);
            updateMissionStatus(missionId, 'COMPLETED');
            updateDronePosition(drone.id, homePosition);
            resetDroneAfterMission(drone.id);
        }
    }, 100); // still runs every 1 real second
};
