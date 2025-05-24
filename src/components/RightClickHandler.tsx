import {useMapEvents} from "react-leaflet";
import {useStore} from "../store.ts";

export const RightClickHandler: React.FC = () => {
    const open = useStore((state) => state.view.incidentPopup.open);
    useMapEvents({
        contextmenu(e) {
            console.log("Right click at", e.latlng);
            const { lat, lng } = e.latlng;
            open({latitude: lat, longitude: lng})
        },
    });
    return null;
}