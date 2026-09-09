import { useState, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polygon,
  Polyline,
  useMapEvents
} from 'react-leaflet';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (color = 'blue', size = 'medium') => {
  const sizes: Record<string, [number, number]> = {
    small: [20, 32],
    medium: [25, 41],
    large: [30, 50]
  };

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: sizes[size],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

interface MapEventsProps {
  onMapClick?: (latlng: L.LatLng) => void;
  onLocationFound?: (latlng: L.LatLng) => void;
}

const MapEvents = ({ onMapClick, onLocationFound }: MapEventsProps) => {
  useMapEvents({
    click: (e) => {
      onMapClick && onMapClick(e.latlng);
    },
    locationfound: (e) => {
      onLocationFound && onLocationFound(e.latlng);
    },
  });

  return null;
};

interface MarkerData {
  id?: number | string;
  position: [number, number];
  color?: string;
  size?: string;
  icon?: L.Icon;
  popup?: {
    title: string;
    content: string;
    image?: string;
  };
}

interface PolygonData {
  id?: number | string;
  positions: [number, number][];
  style?: L.PathOptions;
  popup?: string;
}

interface CircleData {
  id?: number | string;
  center: [number, number];
  radius: number;
  style?: L.PathOptions;
  popup?: string;
}

interface PolylineData {
  id?: number | string;
  positions: [number, number][];
  style?: L.PathOptions;
  popup?: string;
}

interface AdvancedMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MarkerData[];
  polygons?: PolygonData[];
  circles?: CircleData[];
  polylines?: PolylineData[];
  onMarkerClick?: (marker: MarkerData) => void;
  onMapClick?: (latlng: L.LatLng) => void;
  enableClustering?: boolean;
  enableSearch?: boolean;
  enableControls?: boolean;
  enableDrawing?: boolean;
  mapLayers?: {
    openstreetmap?: boolean;
    satellite?: boolean;
    traffic?: boolean;
  };
  className?: string;
  style?: React.CSSProperties;
}

export const AdvancedMap = ({
  center = [51.505, -0.09],
  zoom = 13,
  markers = [],
  polygons = [],
  circles = [],
  polylines = [],
  onMarkerClick,
  onMapClick,
  mapLayers = {
    openstreetmap: true,
    satellite: false,
    traffic: false
  },
  className = '',
  style = { height: '500px', width: '100%' }
}: AdvancedMapProps) => {
  const [currentLayers] = useState(mapLayers);
  const [clickedLocation, setClickedLocation] = useState<L.LatLng | null>(null);

  const handleMapClick = useCallback((latlng: L.LatLng) => {
    setClickedLocation(latlng);
    onMapClick && onMapClick(latlng);
  }, [onMapClick]);

  return (
    <div className={`advanced-map ${className}`} style={style}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        {currentLayers.openstreetmap && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        {currentLayers.satellite && (
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        <MapEvents
          onMapClick={handleMapClick}
        />

        {markers.map((marker, index) => (
          <Marker
            key={marker.id || index}
            position={marker.position}
            icon={marker.icon || createCustomIcon(marker.color, marker.size)}
            eventHandlers={{
              click: () => onMarkerClick && onMarkerClick(marker)
            }}
          >
            {marker.popup && (
              <Popup>
                <div>
                  <h3>{marker.popup.title}</h3>
                  <p>{marker.popup.content}</p>
                  {marker.popup.image && (
                    <img
                      src={marker.popup.image}
                      alt={marker.popup.title}
                      style={{ maxWidth: '200px', height: 'auto' }}
                    />
                  )}
                </div>
              </Popup>
            )}
          </Marker>
        ))}

        {clickedLocation && (
          <Marker
            position={[clickedLocation.lat, clickedLocation.lng]}
            icon={createCustomIcon('orange', 'small')}
          >
            <Popup>
              Lat: {clickedLocation.lat.toFixed(6)}<br/>
              Lng: {clickedLocation.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}

        {polygons.map((polygon, index) => (
          <Polygon
            key={polygon.id || index}
            positions={polygon.positions}
            pathOptions={polygon.style || { color: 'purple', weight: 2, fillOpacity: 0.3 }}
          >
            {polygon.popup && <Popup>{polygon.popup}</Popup>}
          </Polygon>
        ))}

        {circles.map((circle, index) => (
          <Circle
            key={circle.id || index}
            center={circle.center}
            radius={circle.radius}
            pathOptions={circle.style || { color: 'blue', weight: 2, fillOpacity: 0.2 }}
          >
            {circle.popup && <Popup>{circle.popup}</Popup>}
          </Circle>
        ))}

        {polylines.map((polyline, index) => (
          <Polyline
            key={polyline.id || index}
            positions={polyline.positions}
            pathOptions={polyline.style || { color: 'red', weight: 3 }}
          >
            {polyline.popup && <Popup>{polyline.popup}</Popup>}
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
};
