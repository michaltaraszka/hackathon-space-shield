import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import type {DroneStation} from "./models/DroneStation";
import type {Incident} from "./models/Incident.ts";
import type {MapView} from "./models/MapView.ts";

export interface Store {
    stations: DroneStation[]
    incidents: Incident[]
    addIncident: (incident: Incident) => void
    map: MapView
}

export const useStore = create<Store>()(
    immer((set) => (
        {
            stations: [
                {
                    name: "SW_GS_01",
                    position: { latitude: 50.56696576099246, longitude: 22.056527842754125 },
                    drones: []
                }
            ],
            incidents: [],
            addIncident: (incident: Incident) =>
                set((state) => {
                        state.incidents.push(incident);
                    }
                ),
            map: {
                center: {
                    latitude: 50.58286,
                    longitude: 22.05334
                }
            }
        }
    )));