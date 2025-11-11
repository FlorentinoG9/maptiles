// Import CSS styles - these will be included automatically when the package is imported
import 'maplibre-gl/dist/maplibre-gl.css';
import './styles.css';

export { createDefaultMarkerIcon, createMarker, createMarkerIcon } from './marker-utils';
export { default, PMTilesMap } from './pmtiles-map';
export type { BasemapFlavor, MarkerPin, PMTilesMapProps, PMTilesSourceOptions } from './types';
export { createDefaultOSMStyle, createProtomapsStyle, initializePMTilesProtocol } from './utils';

