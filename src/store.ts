import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import type {DroneStation} from "./models/DroneStation";
import type {Incident, IncidentStatus} from "./models/Incident.ts";
import type {MapView} from "./models/MapView.ts";
import type {IncidentData, IncidentPopupView} from "./models/IncidentPopupView.ts";

export interface Store {
    stations: DroneStation[]
    incidents: Incident[]
    addIncident: (incident: Incident) => void
    view: {
        map: MapView
        incidentPopup: IncidentPopupView
    }
}

export const useStore = create<Store>()(
    immer((set) => (
        {
            stations: [
                {
                    name: "SW_GS_01",
                    position: { latitude: 50.56696576099246, longitude: 22.056527842754125 },
                    drones: []
                },
                {
                    name: "SW_GS_02",
                    position: { latitude: 50.56696576099246, longitude: 22.276527842754125 },
                    drones: []
                },
                {
                    name: "SW_GS_03",
                    position: { latitude: 50.39696576099246, longitude: 22.316527842754125 },
                    drones: []
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
                    open: (location) => {
                        set((state) => {
                            state.view.incidentPopup.visible = true;
                            state.view.incidentPopup.location = location;
                        })
                    },
                    save: (view) => {
                        set((state) => {
                            state.view.incidentPopup.visible = false;
                            state.view.incidentPopup.incidentType = view.incidentType;
                            state.view.incidentPopup.numberOfCasualties = view.numberOfCasualties;
                            state.view.incidentPopup.numberOfVehicles = view.numberOfVehicles;
                            state.view.incidentPopup.priority = view.priority;
                            state.view.incidentPopup.locationNotes = view.locationNotes;
                            const incidentData: IncidentData = {
                                location: state.view.incidentPopup.location,
                                numberOfCasualties: state.view.incidentPopup.numberOfCasualties,
                                numberOfVehicles: state.view.incidentPopup.numberOfVehicles,
                                priority: state.view.incidentPopup.priority,
                                locationNotes: state.view.incidentPopup.locationNotes,
                            };
                            const incident = {
                                status: 'NEW' as IncidentStatus,
                                data: incidentData,
                            }
                            state.incidents.push(incident);
                        });
                    },
                    cancel: () => {
                        set((state) => {
                            state.view.incidentPopup.visible = false;
                            state.view.incidentPopup.location = undefined;
                            state.view.incidentPopup.incidentType = undefined;
                            state.view.incidentPopup.numberOfCasualties = undefined;
                            state.view.incidentPopup.numberOfVehicles = undefined;
                            state.view.incidentPopup.priority = undefined;
                            state.view.incidentPopup.locationNotes = undefined;
                        });
                    }
                }
            }
        }
    )));