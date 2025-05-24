import type {Location} from "./Location.ts";

export type IncidentType = 'collision' | 'breakdown' | 'obstruction' | 'fire' | 'other';
export type IncidentPriority =  'low' | 'medium' | 'high' | 'critical';

export interface IncidentData {
    incidentType?: IncidentType[];
    numberOfCasualties?: number;
    numberOfVehicles?: number;
    priority?: IncidentPriority;
    location?: Location; // or use { lat: number; lng: number } if you prefer coordinates
    locationNotes?: string;
}

export type IncidentPopupView =  {
    visible: boolean
    open: (location: Location) => void
    save: (incident: IncidentData) => void
    cancel: () => void
} & IncidentData;
