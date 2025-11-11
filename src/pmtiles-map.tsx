import { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import type { PMTilesMapProps } from './types';
import { initializePMTilesProtocol, createProtomapsStyle } from './utils';
import { createMarker } from './marker-utils';
import 'maplibre-gl/dist/maplibre-gl.css';
import './styles.css';

let protocolInitialized = false;

export function PMTilesMap({
  pmtilesUrl,
  flavor = 'light',
  language = 'en',
  center = [0, 0],
  zoom = 2,
  minZoom = 0,
  maxZoom = 22,
  style,
  mapOptions = {},
  className = '',
  containerStyle,
  onLoad,
  onError,
  showControls = true,
  showAttribution = true,
  markers = [],
  defaultMarkerIcon,
  defaultMarkerSize = 40
}: PMTilesMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initialize PMTiles protocol once
    if (!protocolInitialized) {
      initializePMTilesProtocol();
      protocolInitialized = true;
    }

    if (!mapContainerRef.current) {
      return;
    }

    // Create map style - use Protomaps basemap style with flavor if no custom style provided
    const mapStyle = style || createProtomapsStyle(pmtilesUrl, flavor, language);

    // Initialize map
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center,
      zoom,
      minZoom,
      maxZoom,
      ...mapOptions
    });

    mapInstanceRef.current = map;

    // Add navigation controls
    if (showControls) {
      const nav = new maplibregl.NavigationControl({
        visualizePitch: true,
        showZoom: true,
        showCompass: true
      });
      map.addControl(nav, 'top-right');

      const scale = new maplibregl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
      });
      map.addControl(scale, 'bottom-left');
    }

    // Handle map load
    map.on('load', () => {
      setIsLoading(false);
      
      // Add markers after map loads
      if (markers.length > 0) {
        markers.forEach((markerConfig) => {
          try {
            const marker = createMarker(markerConfig, map, defaultMarkerIcon, defaultMarkerSize);
            markersRef.current.set(markerConfig.id, marker);
          } catch (err) {
            console.error(`Failed to create marker ${markerConfig.id}:`, err);
          }
        });
      }
      
      if (onLoad) {
        onLoad(map);
      }
    });

    // Handle errors
    map.on('error', (e) => {
      const mapError = e.error || new Error('Unknown map error');
      setError(mapError);
      setIsLoading(false);
      if (onError) {
        onError(mapError);
      }
    });

    // Cleanup
    return () => {
      // Remove all markers
      markersRef.current.forEach((marker) => {
        marker.remove();
      });
      markersRef.current.clear();
      
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [pmtilesUrl, flavor, language]); // Re-initialize if flavor or language changes

  // Update markers when markers prop changes
  useEffect(() => {
    if (!mapInstanceRef.current || isLoading) {
      return;
    }

    const map = mapInstanceRef.current;
    const currentMarkerIds = new Set(markersRef.current.keys());
    const newMarkerIds = new Set(markers.map((m) => m.id));

    // Remove markers that are no longer in the props
    currentMarkerIds.forEach((id) => {
      if (!newMarkerIds.has(id)) {
        const marker = markersRef.current.get(id);
        if (marker) {
          marker.remove();
          markersRef.current.delete(id);
        }
      }
    });

    // Add or update markers
    markers.forEach((markerConfig) => {
      const existingMarker = markersRef.current.get(markerConfig.id);
      
      if (existingMarker) {
        // Update existing marker position if changed
        const currentLngLat = existingMarker.getLngLat();
        const [lng, lat] = markerConfig.position;
        if (currentLngLat.lng !== lng || currentLngLat.lat !== lat) {
          existingMarker.setLngLat(markerConfig.position);
        }
      } else {
        // Create new marker
        try {
          const marker = createMarker(markerConfig, map, defaultMarkerIcon, defaultMarkerSize);
          markersRef.current.set(markerConfig.id, marker);
        } catch (err) {
          console.error(`Failed to create marker ${markerConfig.id}:`, err);
        }
      }
    });
  }, [markers, isLoading, defaultMarkerIcon, defaultMarkerSize]);

  // Update center and zoom when props change
  useEffect(() => {
    if (mapInstanceRef.current && !isLoading) {
      mapInstanceRef.current.setCenter(center);
      mapInstanceRef.current.setZoom(zoom);
    }
  }, [center, zoom, isLoading]);

  // Update min/max zoom
  useEffect(() => {
    if (mapInstanceRef.current && !isLoading) {
      mapInstanceRef.current.setMinZoom(minZoom);
      mapInstanceRef.current.setMaxZoom(maxZoom);
    }
  }, [minZoom, maxZoom, isLoading]);

  return (
    <div
      ref={mapContainerRef}
      className={`pmtiles-map-container ${className}`}
      style={containerStyle}
    >
      {isLoading && (
        <div className="pmtiles-map-loading">
          <div className="pmtiles-map-spinner" />
          <p>Loading map...</p>
        </div>
      )}
      {error && (
        <div className="pmtiles-map-error">
          <p>Error loading map: {error.message}</p>
        </div>
      )}
      {showAttribution && (
        <div className="pmtiles-map-attribution">
          © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors
        </div>
      )}
    </div>
  );
}

export default PMTilesMap;

