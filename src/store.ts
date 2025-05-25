import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import type {DroneStation} from "./models/DroneStation";
import type {Incident, IncidentStatus} from "./models/Incident.ts";
import type {MapView} from "./models/MapView.ts";
import type {IncidentData, IncidentPopupView, IncidentType} from "./models/IncidentPopupView.ts";
import type {Mission, MissionStatus, Photo} from "./models/Mission.ts";
import type {Location} from "./models/Location.ts";

export interface Store {
    missions: Mission[]
    createMission: (missionId: string, droneId: string, baseStationId: string, incidentId: string) => void
    updateMissionStatus: (missionId: string, status: MissionStatus) => void
    uploadMissionPhotos: (missionId: string, photo: Photo) => void
    updateDronePosition: (droneId: string, position: Location) => void
    resetDroneAfterMission: (droneId: string) => void
    stations: DroneStation[]
    incidents: Incident[]
    addIncident: (incident: Incident) => void
    view: {
        map: MapView
        incidentPopup: IncidentPopupView
        selectedStationId: string | null
        setSelectedStationId: (stationId: string | null) => void
    }
}

export const useStore = create<Store>()(
    immer((set) => (
        {
            missions: [],
            createMission: (missionId: string, droneId: string, baseStationId: string, incidentId: string) =>
                set((state) => {
                    const mission: Mission = {
                        missionId: missionId,
                        droneId: droneId,
                        baseStationId: baseStationId,
                        incidentId: incidentId,
                        startTime: new Date(),
                        status: 'NEW',
                        photos: []
                    }
                    // set drone status to 'ON_MISSION'
                    const droneStation = state.stations.find(s => s.drones.some(d => d.id === droneId));
                    if (droneStation) {
                        const drone = droneStation.drones.find(d => d.id === droneId);
                        if (drone) {
                            drone.status = 'ON_MISSION';
                        }
                    }
                    state.missions.push(mission);
                }),
            updateMissionStatus: (missionId: string, status: Mission['status']) =>
                set((state) => {
                    const mission = state.missions.find(m => m.missionId === missionId);
                    if (mission) {
                        mission.status = status;
                        if (status === 'COMPLETED' || status === 'CANCELED' || status === 'FAILED') {
                            if (mission.status === 'COMPLETED') {
                                // Reset drone status to IDLE
                                const incident = state.incidents.find(i => i.id === mission.incidentId);
                                incident!.status = 'CLOSED';
                            }
                            mission.endTime = new Date();
                        }
                    }
                }),
            uploadMissionPhotos: (missionId: string, photo: { rgbUrl: string, thermalUrl: string, lidarUrl: string }) =>
                set((state) => {
                    const mission = state.missions.find(m => m.missionId === missionId);
                    if (mission) {
                        // don't add duplicate photos
                        if (mission.photos.some(p => p.rgbUrl === photo.rgbUrl && p.thermalUrl === photo.thermalUrl && p.lidarUrl === photo.lidarUrl)) {
                            return;
                        }
                        mission.photos.push({
                            rgbUrl: photo.rgbUrl,
                            thermalUrl: photo.thermalUrl,
                            lidarUrl: photo.lidarUrl
                        });
                    }
                }),
            updateDronePosition: (droneId: string, position: Location) =>
                set((state) => {
                    const station = state.stations.find(s => s.drones.some(d => d.id === droneId));
                    if (station) {
                        const drone = station.drones.find(d => d.id === droneId);
                        if (drone) {
                            drone.position = {...position};
                        }
                    }
                }),
            resetDroneAfterMission: (droneId: string) =>
                set((state) => {
                    const station = state.stations.find(s => s.drones.some(d => d.id === droneId));
                    if (station) {
                        const drone = station.drones.find(d => d.id === droneId);
                        if (drone) {
                            drone.position = {...station.position}; // Reset to station position
                            drone.battery = 100; // Reset battery to 100%
                            drone.status = 'IDLE'; // Reset status to IDLE
                        }
                    }
                }),
            stations: [
                {
                    id: "SW_GS_01",
                    position: { latitude: 50.56696576099246, longitude: 22.056527842754125 },
                    drones: [
                        {
                            id: "SW_D_01",
                            position: { latitude: 50.56696576099246, longitude: 22.056527842754125 },
                            battery: 100,
                            status: 'IDLE',
                        },
                        {
                            id: "SW_D_02",
                            position: { latitude: 50.56696576099246, longitude: 22.056527842754125 },
                            battery: 100,
                            status: 'IDLE',
                        }
                    ]
                },
                {
                    id: "SW_GS_02",
                    position: { latitude: 50.56696576099246, longitude: 22.276527842754125 },
                    drones: [
                        {
                            id: "SW_D_03",
                            position: { latitude: 50.56696576099246, longitude: 22.276527842754125 },
                            battery: 100,
                            status: 'IDLE',
                        },
                        {
                            id: "SW_D_04",
                            position: { latitude: 50.56696576099246, longitude: 22.276527842754125 },
                            battery: 100,
                            status: 'IDLE',
                        }
                    ]
                },
                {
                    id: "SW_GS_03",
                    position: { latitude: 50.39696576099246, longitude: 22.316527842754125 },
                    drones: [
                        {
                            id: "SW_D_05",
                            position: { latitude: 50.39696576099246, longitude: 22.316527842754125 },
                            battery: 100,
                            status: 'IDLE',
                        },
                        {
                            id: "SW_D_06",
                            position: { latitude: 50.39696576099246, longitude: 22.316527842754125 },
                            battery: 100,
                            status: 'IDLE',
                        },
                        {
                            id: "SW_D_07",
                            position: { latitude: 50.39696576099246, longitude: 22.316527842754125 },
                            battery: 100,
                            status: 'IDLE',
                        }
                    ]
                }
            ],
            incidents: [],
            addIncident: (incident: Incident) =>
                set((state) => {
                        state.incidents.push(incident);
                    }
                ),
            view: {
                map: {
                    center: {
                        latitude: 50.58286,
                        longitude: 22.05334
                    }
                },
                incidentPopup: {
                    visible: false,
                    location: { latitude: 0, longitude: 0 },
                    position: { x: 0, y: 0 },
                    open: (location, position) => {
                        set((state) => {
                            state.view.incidentPopup.visible = true;
                            state.view.incidentPopup.location = location;
                            state.view.incidentPopup.position = position;
                        })
                    },
                    save: (data) => {
                        set((state) => {
                            state.view.incidentPopup.visible = false;
                        });
                        set((state) => {
                            state.view.incidentPopup.position = {x: 0, y: 0};
                            const incidentData: IncidentData = {
                                location: data.location,
                                incidentType: data.incidentType as IncidentType,
                            };
                            const incident = {
                                id: `incident_uuid_${Math.random().toString(36).substr(2, 9)}`,
                                status: 'NEW' as IncidentStatus,
                                data: incidentData,
                            }
                            state.incidents.push(incident);
                        });
                    },
                    cancel: () => {
                        set((state) => {
                            state.view.incidentPopup.visible = false;
                            state.view.incidentPopup.location = {latitude: 0, longitude: 0};
                            state.view.incidentPopup.position = {x: 0, y: 0};
                        });
                    }
                },
                selectedStationId: null,
                setSelectedStationId: (stationId: string | null) => {
                    set((state) => {
                        state.view.selectedStationId = stationId;
                    });
                }
            }
        }
    )));