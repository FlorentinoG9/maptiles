import { Protocol } from 'pmtiles';
import * as maplibregl from 'maplibre-gl';
import { layers, namedFlavor, type Flavor } from '@protomaps/basemaps';
import type { BasemapFlavor } from './types';

/**
 * Initialize PMTiles protocol for MapLibre GL
 */
export function initializePMTilesProtocol(): void {
  const protocol = new Protocol();
  maplibregl.addProtocol('pmtiles', protocol.tile);
}

/**
 * Create a Protomaps basemap style with PMTiles source and flavor
 */
export function createProtomapsStyle(
  pmtilesUrl: string,
  flavor: BasemapFlavor | Flavor = 'light',
  language: string = 'en'
): maplibregl.StyleSpecification {
  const selectedFlavor = typeof flavor === 'string' ? namedFlavor(flavor) : flavor;
  const flavorName = typeof flavor === 'string' ? flavor : 'light';
  
  return {
    version: 8,
    glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
    sprite: `https://protomaps.github.io/basemaps-assets/sprites/v4/${flavorName}`,
    sources: {
      protomaps: {
        type: 'vector',
        url: `pmtiles://${pmtilesUrl}`,
        attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
      }
    },
    layers: layers('protomaps', selectedFlavor, { lang: language })
  };
}

/**
 * Create a default OpenStreetMap style with PMTiles source (legacy, use createProtomapsStyle instead)
 * @deprecated Use createProtomapsStyle instead for better styling and flavor support
 */
export function createDefaultOSMStyle(pmtilesUrl: string): maplibregl.StyleSpecification {
  return {
    version: 8,
    sources: {
      'pmtiles-source': {
        type: 'vector',
        url: `pmtiles://${pmtilesUrl}`,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#f8f8f8'
        }
      },
      {
        id: 'water',
        type: 'fill',
        source: 'pmtiles-source',
        'source-layer': 'water',
        paint: {
          'fill-color': '#a0c8f0'
        }
      },
      {
        id: 'landcover',
        type: 'fill',
        source: 'pmtiles-source',
        'source-layer': 'landcover',
        paint: {
          'fill-color': '#f0f0d8'
        }
      },
      {
        id: 'landuse',
        type: 'fill',
        source: 'pmtiles-source',
        'source-layer': 'landuse',
        paint: {
          'fill-color': '#e8e8e8'
        }
      },
      {
        id: 'park',
        type: 'fill',
        source: 'pmtiles-source',
        'source-layer': 'park',
        paint: {
          'fill-color': '#d8e8c8'
        }
      },
      {
        id: 'boundary',
        type: 'line',
        source: 'pmtiles-source',
        'source-layer': 'boundary',
        paint: {
          'line-color': '#9e9e9e',
          'line-width': 1
        }
      },
      {
        id: 'aeroway',
        type: 'line',
        source: 'pmtiles-source',
        'source-layer': 'aeroway',
        paint: {
          'line-color': '#c8c8c8',
          'line-width': 1
        }
      },
      {
        id: 'road',
        type: 'line',
        source: 'pmtiles-source',
        'source-layer': 'road',
        paint: {
          'line-color': '#ffffff',
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            12,
            0.5,
            20,
            8
          ]
        }
      },
      {
        id: 'road-label',
        type: 'symbol',
        source: 'pmtiles-source',
        'source-layer': 'road',
        layout: {
          'text-field': '{name}',
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          'text-size': 12
        },
        paint: {
          'text-color': '#333',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      },
      {
        id: 'building',
        type: 'fill',
        source: 'pmtiles-source',
        'source-layer': 'building',
        paint: {
          'fill-color': '#d0d0d0',
          'fill-opacity': 0.6
        }
      },
      {
        id: 'waterway',
        type: 'line',
        source: 'pmtiles-source',
        'source-layer': 'waterway',
        paint: {
          'line-color': '#a0c8f0',
          'line-width': 1
        }
      },
      {
        id: 'place-labels',
        type: 'symbol',
        source: 'pmtiles-source',
        'source-layer': 'place',
        layout: {
          'text-field': '{name}',
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10,
            10,
            15,
            14
          ]
        },
        paint: {
          'text-color': '#333',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      }
    ],
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    sprite: 'https://demotiles.maplibre.org/sprites/osm'
  };
}

