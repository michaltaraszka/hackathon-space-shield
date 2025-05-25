export type MissionStatus = 'NEW' | 'WARM_UP' | 'ON_WAY' | 'SURVEY' | 'ON_RETURN' | 'COMPLETED' | 'CANCELED' | 'FAILED';

export interface Photo {
    rgbUrl?: string // URL to the RGB photo
    thermalUrl?: string // URL to the thermal photo
    lidarUrl?: string // URL to the LiDAR photo
}

export interface Mission {
    missionId: string // Unique identifier for the mission
    incidentId: string // Unique identifier for the incident
    droneId: string // Unique identifier for the drone assigned to the mission
    baseStationId: string // Unique identifier for the drone station where the mission starts
    status: MissionStatus // Current status of the mission
    startTime: Date // Start time of the mission
    endTime?: Date // Optional end time of the mission
    photos: Photo[]
}