import {useMapEvents} from "react-leaflet";
import {useStore} from "../store.ts";

export const RightClickHandler: React.FC = () => {
    const open = useStore((state) => state.view.incidentPopup.open);
    useMapEvents({
        contextmenu(e) {
            console.log("Right click at", e.latlng);
            open({latitude: e.latlng.lat, longitude: e.latlng.lng}, {x: e.originalEvent.clientX, y: e.originalEvent.clientY});

        },
    });
    return null;
}