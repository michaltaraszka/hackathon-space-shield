import type {Location} from "./Location.ts";
import type {EventType} from "../components/IncidentReportPopup.tsx";

export type IncidentType = EventType;

export interface IncidentData {
    incidentType: IncidentType
    location: Location;
}

export type IncidentPopupView =  {
    visible: boolean
    location: Location
    position: {x: number, y: number}
    open: (location: Location, position: {x: number, y: number}) => void
    save: (incident: IncidentData) => void
    cancel: () => void
};
