/**
 * Leaflet map component showing user location and place markers.
 * Handles marker clicks and syncs with selected place state.
 */
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom icon for user location
const userIcon = new L.DivIcon({
    className: 'user-marker',
    html: '<div class="user-marker-inner"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

// Custom icon for places
const placeIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to handle map updates when selected place changes
function MapController({ selectedPlace }) {
    const map = useMap();
    const prevSelectedRef = useRef(null);

    useEffect(() => {
        if (selectedPlace && selectedPlace !== prevSelectedRef.current) {
            map.flyTo([selectedPlace.lat, selectedPlace.lng], 17, { duration: 0.8 });
            prevSelectedRef.current = selectedPlace;
        }
    }, [selectedPlace, map]);

    return null;
}

function MapView({ userLocation, places, selectedPlace, onSelectPlace, moodRadius }) {
    const getZoomForRadius = (radius) => {
        if (radius <= 500) return 16;
        if (radius <= 1000) return 15;
        if (radius <= 1500) return 14;
        return 13;
    };

    const defaultZoom = getZoomForRadius(moodRadius);

    return (
        <div className="w-full h-full">
            <MapContainer
                center={[userLocation.lat, userLocation.lng]}
                zoom={defaultZoom}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController selectedPlace={selectedPlace} />

                {/* User location marker */}
                <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                    <Popup><strong>You are here</strong></Popup>
                </Marker>

                {/* Place markers */}
                {places.map(place => (
                    <Marker
                        key={place.id}
                        position={[place.lat, place.lng]}
                        icon={placeIcon}
                        eventHandlers={{ click: () => onSelectPlace(place) }}
                    >
                        <Popup>
                            <div className="p-1">
                                <strong className="block text-sm mb-1">{place.name}</strong>
                                <p className="m-0 text-xs text-slate-500 capitalize">{place.type}</p>
                                {place.cuisine && (
                                    <p className="m-0 text-xs text-slate-400 italic">{place.cuisine}</p>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapView;
