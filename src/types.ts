import type { MapOptions, StyleSpecification, Map, Marker } from 'maplibre-gl';
import type { CSSProperties } from 'react';
import type { Flavor } from '@protomaps/basemaps';

export type BasemapFlavor = 'light' | 'dark' | 'white' | 'grayscale' | 'black';

export interface PMTilesMapProps {
  /**
   * URL to the PMTiles archive file
   */
  pmtilesUrl: string;
  
  /**
   * Basemap flavor/theme to use
   * @default 'light'
   */
  flavor?: BasemapFlavor | Flavor;
  
  /**
   * Language code for labels (e.g., 'en', 'es', 'fr')
   * @default 'en'
   */
  language?: string;
  
  /**
   * Initial center coordinates [longitude, latitude]
   * @default [0, 0]
   */
  center?: [number, number];
  
  /**
   * Initial zoom level
   * @default 2
   */
  zoom?: number;
  
  /**
   * Minimum zoom level
   * @default 0
   */
  minZoom?: number;
  
  /**
   * Maximum zoom level
   * @default 22
   */
  maxZoom?: number;
  
  /**
   * Map style specification (optional, will use Protomaps basemap style with flavor if not provided)
   */
  style?: StyleSpecification;
  
  /**
   * Additional MapLibre GL options
   */
  mapOptions?: Omit<MapOptions, 'container' | 'style' | 'center' | 'zoom' | 'minZoom' | 'maxZoom'>;
  
  /**
   * Container className
   */
  className?: string;
  
  /**
   * Container style
   */
  containerStyle?: CSSProperties;
  
  /**
   * Callback when map is loaded
   */
  onLoad?: (map: Map) => void;
  
  /**
   * Callback when map encounters an error
   */
  onError?: (error: Error) => void;
  
  /**
   * Enable/disable map controls (navigation, scale, etc.)
   * @default true
   */
  showControls?: boolean;
  
  /**
   * Enable/disable attribution
   * @default true
   */
  showAttribution?: boolean;
  
  /**
   * Array of markers/pins to display on the map
   */
  markers?: MarkerPin[];
  
  /**
   * Default marker icon URL (used when marker doesn't specify icon)
   */
  defaultMarkerIcon?: string;
  
  /**
   * Default marker size in pixels
   * @default 40
   */
  defaultMarkerSize?: number;
}

export interface PMTilesSourceOptions {
  /**
   * URL to the PMTiles archive
   */
  url: string;
  
  /**
   * Layer name for the PMTiles source
   * @default 'pmtiles'
   */
  layerName?: string;
  
  /**
   * Source type
   * @default 'vector'
   */
  type?: 'vector' | 'raster';
  
  /**
   * Minimum zoom level for the source
   */
  minzoom?: number;
  
  /**
   * Maximum zoom level for the source
   */
  maxzoom?: number;
}

export interface MarkerPin {
  /**
   * Unique identifier for the marker
   */
  id: string;
  
  /**
   * Marker position [longitude, latitude]
   */
  position: [number, number];
  
  /**
   * Custom icon/image URL or HTML element
   */
  icon?: string | HTMLElement;
  
  /**
   * Icon size in pixels
   * @default 40
   */
  size?: number;
  
  /**
   * Icon anchor point
   * @default 'bottom'
   */
  anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  
  /**
   * Popup content (HTML string or HTMLElement)
   */
  popup?: string | HTMLElement;
  
  /**
   * Whether popup should be open by default
   * @default false
   */
  popupOpen?: boolean;
  
  /**
   * Custom CSS class for the marker element
   */
  className?: string;
  
  /**
   * Custom CSS styles for the marker element
   */
  style?: CSSProperties;
  
  /**
   * Whether marker is draggable
   * @default false
   */
  draggable?: boolean;
  
  /**
   * Callback when marker is clicked
   */
  onClick?: (marker: Marker, event: MouseEvent) => void;
  
  /**
   * Callback when marker is dragged
   */
  onDrag?: (marker: Marker, event: DragEvent) => void;
  
  /**
   * Callback when marker drag ends
   */
  onDragEnd?: (marker: Marker, event: DragEvent) => void;
  
  /**
   * Callback when marker is hovered
   */
  onMouseEnter?: (marker: Marker, event: MouseEvent) => void;
  
  /**
   * Callback when marker hover ends
   */
  onMouseLeave?: (marker: Marker, event: MouseEvent) => void;
}

