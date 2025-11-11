# @vibe/pmtiles-map

A React component for rendering maps using PMTiles and MapLibre GL JS with OpenStreetMap support.

## Features

- 🗺️ **PMTiles Integration** - Render maps from PMTiles archives hosted on static storage
- 🎨 **MapLibre GL JS** - Powered by MapLibre GL JS for smooth, interactive maps
- 🌍 **OpenStreetMap Support** - Built-in support for OpenStreetMap data
- 🎨 **Protomaps Flavors** - Easy theme switching with built-in flavors (light, dark, white, grayscale, black)
- 🌐 **Multi-language Support** - Configure label language for internationalization
- 📍 **Custom Markers/Pins** - Add custom markers with icons, popups, and event handlers
- 📦 **Zero Dependencies** - Minimal peer dependencies (React only)
- 🎯 **TypeScript** - Fully typed with TypeScript
- ⚡ **Serverless Ready** - Works with static hosting and CDNs

## Installation

```bash
bun add @vibe/pmtiles-map maplibre-gl pmtiles
# or
npm install @vibe/pmtiles-map maplibre-gl pmtiles
# or
yarn add @vibe/pmtiles-map maplibre-gl pmtiles
# or
pnpm add @vibe/pmtiles-map maplibre-gl pmtiles
```

**Note:** The package includes `@protomaps/basemaps` as a dependency, so you don't need to install it separately. However, if you want to use custom flavors, you can import `namedFlavor` and other utilities directly from `@protomaps/basemaps`.

## Quick Start

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import '@vibe/pmtiles-map/styles';
// MapLibre GL CSS is automatically included, no need to import separately

function App() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <PMTilesMap
        pmtilesUrl="https://example.com/map.pmtiles"
        center={[-122.4194, 37.7749]} // San Francisco
        zoom={12}
      />
    </div>
  );
}
```

**Note:** The component automatically imports MapLibre GL CSS. You only need to import `@vibe/pmtiles-map/styles` for the component's custom styles.

## Props

### PMTilesMapProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pmtilesUrl` | `string` | **required** | URL to the PMTiles archive file |
| `flavor` | `'light' \| 'dark' \| 'white' \| 'grayscale' \| 'black' \| Flavor` | `'light'` | Basemap theme/flavor to use (see [Protomaps Flavors](https://docs.protomaps.com/basemaps/flavors)) |
| `language` | `string` | `'en'` | Language code for labels (e.g., 'en', 'es', 'fr', 'de') |
| `center` | `[number, number]` | `[0, 0]` | Initial center coordinates [longitude, latitude] |
| `zoom` | `number` | `2` | Initial zoom level |
| `minZoom` | `number` | `0` | Minimum zoom level |
| `maxZoom` | `number` | `22` | Maximum zoom level |
| `style` | `StyleSpecification` | `undefined` | Custom MapLibre GL style (uses Protomaps basemap style with flavor if not provided) |
| `mapOptions` | `MapOptions` | `{}` | Additional MapLibre GL options |
| `className` | `string` | `''` | Container className |
| `containerStyle` | `React.CSSProperties` | `undefined` | Container inline styles |
| `onLoad` | `(map: Map) => void` | `undefined` | Callback when map is loaded |
| `onError` | `(error: Error) => void` | `undefined` | Callback when map encounters an error |
| `showControls` | `boolean` | `true` | Enable/disable map controls (navigation, scale) |
| `showAttribution` | `boolean` | `true` | Enable/disable attribution |
| `markers` | `MarkerPin[]` | `[]` | Array of markers/pins to display on the map |
| `defaultMarkerIcon` | `string` | `undefined` | Default marker icon URL (used when marker doesn't specify icon) |
| `defaultMarkerSize` | `number` | `40` | Default marker size in pixels |

## Examples

### Basic Usage

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import '@vibe/pmtiles-map/styles';

function BasicMap() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <PMTilesMap
        pmtilesUrl="https://example.com/map.pmtiles"
        center={[-74.006, 40.7128]} // New York
        zoom={10}
      />
    </div>
  );
}
```

### Using Flavors (Themes)

The package supports Protomaps basemap flavors for easy theme switching:

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import '@vibe/pmtiles-map/styles';

function ThemedMaps() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      {/* Light theme (default) */}
      <div style={{ height: '400px' }}>
        <PMTilesMap
          pmtilesUrl="https://example.com/map.pmtiles"
          flavor="light"
          center={[2.3522, 48.8566]} // Paris
          zoom={10}
        />
      </div>
      
      {/* Dark theme */}
      <div style={{ height: '400px' }}>
        <PMTilesMap
          pmtilesUrl="https://example.com/map.pmtiles"
          flavor="dark"
          center={[2.3522, 48.8566]} // Paris
          zoom={10}
        />
      </div>
      
      {/* Grayscale theme for data visualization */}
      <div style={{ height: '400px' }}>
        <PMTilesMap
          pmtilesUrl="https://example.com/map.pmtiles"
          flavor="grayscale"
          center={[2.3522, 48.8566]} // Paris
          zoom={10}
        />
      </div>
      
      {/* White theme for data visualization */}
      <div style={{ height: '400px' }}>
        <PMTilesMap
          pmtilesUrl="https://example.com/map.pmtiles"
          flavor="white"
          center={[2.3522, 48.8566]} // Paris
          zoom={10}
        />
      </div>
    </div>
  );
}
```

### Available Flavors

- **`light`** - General-purpose basemap with icons (default)
- **`dark`** - Dark theme basemap with icons
- **`white`** - Minimal white theme for data visualization
- **`grayscale`** - Grayscale theme for data visualization
- **`black`** - Black theme for data visualization

### Custom Flavor

You can also use a custom flavor object from `@protomaps/basemaps`:

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import { namedFlavor } from '@protomaps/basemaps';
import '@vibe/pmtiles-map/styles';

function CustomFlavorMap() {
  // Override specific colors in a flavor
  const customFlavor = {
    ...namedFlavor('light'),
    buildings: '#ff0000', // Red buildings
    water: '#0066cc' // Blue water
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <PMTilesMap
        pmtilesUrl="https://example.com/map.pmtiles"
        flavor={customFlavor}
        center={[0, 0]}
        zoom={2}
      />
    </div>
  );
}
```

### Multi-language Support

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import '@vibe/pmtiles-map/styles';

function MultiLanguageMap() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      {/* Spanish labels */}
      <PMTilesMap
        pmtilesUrl="https://example.com/map.pmtiles"
        flavor="light"
        language="es"
        center={[-3.7038, 40.4168]} // Madrid
        zoom={12}
      />
    </div>
  );
}
```

### Custom Markers/Pins

Add custom markers to your map with icons, popups, and event handlers:

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import type { MarkerPin } from '@vibe/pmtiles-map';
import '@vibe/pmtiles-map/styles';

function MapWithMarkers() {
  const markers: MarkerPin[] = [
    {
      id: 'marker-1',
      position: [-122.4194, 37.7749], // San Francisco
      icon: 'https://example.com/pin-icon.png',
      size: 50,
      popup: '<h3>San Francisco</h3><p>Welcome to the Golden City!</p>',
      popupOpen: false,
      onClick: (marker, event) => {
        console.log('Marker clicked!', marker.getLngLat());
        marker.togglePopup();
      }
    },
    {
      id: 'marker-2',
      position: [-74.006, 40.7128], // New York
      icon: 'https://example.com/custom-pin.svg',
      size: 45,
      anchor: 'bottom',
      popup: '<h3>New York</h3><p>The Big Apple</p>',
      draggable: true,
      onDragEnd: (marker, event) => {
        console.log('Marker moved to:', marker.getLngLat());
      }
    }
  ];

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <PMTilesMap
        pmtilesUrl="https://example.com/map.pmtiles"
        center={[-98.5795, 39.8283]} // Center of USA
        zoom={4}
        markers={markers}
      />
    </div>
  );
}
```

### Custom Marker with HTML Element

You can use a custom HTML element as a marker icon:

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import type { MarkerPin } from '@vibe/pmtiles-map';
import '@vibe/pmtiles-map/styles';

function CustomHTMLMarker() {
  // Create a custom HTML element for the marker
  const customIcon = document.createElement('div');
  customIcon.innerHTML = '📍';
  customIcon.style.fontSize = '40px';
  customIcon.style.cursor = 'pointer';

  const markers: MarkerPin[] = [
    {
      id: 'custom-html-marker',
      position: [2.3522, 48.8566], // Paris
      icon: customIcon,
      popup: '<h3>Paris</h3><p>City of Light</p>',
      onClick: (marker) => {
        alert('Custom marker clicked!');
      }
    }
  ];

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <PMTilesMap
        pmtilesUrl="https://example.com/map.pmtiles"
        center={[2.3522, 48.8566]}
        zoom={12}
        markers={markers}
      />
    </div>
  );
}
```

### Default Marker Icon

Set a default icon for all markers:

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import type { MarkerPin } from '@vibe/pmtiles-map';
import '@vibe/pmtiles-map/styles';

function MapWithDefaultIcon() {
  const markers: MarkerPin[] = [
    {
      id: 'marker-1',
      position: [-122.4194, 37.7749]
      // Will use defaultMarkerIcon
    },
    {
      id: 'marker-2',
      position: [-74.006, 40.7128],
      icon: 'https://example.com/special-icon.png' // Overrides default
    }
  ];

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <PMTilesMap
        pmtilesUrl="https://example.com/map.pmtiles"
        center={[-98.5795, 39.8283]}
        zoom={4}
        markers={markers}
        defaultMarkerIcon="https://example.com/default-pin.png"
        defaultMarkerSize={35}
      />
    </div>
  );
}
```

### Draggable Markers

Create draggable markers with drag event handlers:

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import type { MarkerPin } from '@vibe/pmtiles-map';
import '@vibe/pmtiles-map/styles';
import { useState } from 'react';

function DraggableMarkers() {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([0, 0]);

  const markers: MarkerPin[] = [
    {
      id: 'draggable-marker',
      position: markerPosition,
      draggable: true,
      icon: 'https://example.com/drag-pin.png',
      onDrag: (marker) => {
        const lngLat = marker.getLngLat();
        console.log('Dragging:', lngLat);
      },
      onDragEnd: (marker) => {
        const lngLat = marker.getLngLat();
        setMarkerPosition([lngLat.lng, lngLat.lat]);
        console.log('New position:', lngLat);
      }
    }
  ];

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <PMTilesMap
        pmtilesUrl="https://example.com/map.pmtiles"
        center={markerPosition}
        zoom={10}
        markers={markers}
      />
    </div>
  );
}
```

### MarkerPin Interface

The `MarkerPin` interface supports the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | **required** | Unique identifier for the marker |
| `position` | `[number, number]` | **required** | Marker position [longitude, latitude] |
| `icon` | `string \| HTMLElement` | `undefined` | Custom icon/image URL or HTML element |
| `size` | `number` | `40` | Icon size in pixels |
| `anchor` | `string` | `'bottom'` | Icon anchor point (center, top, bottom, left, right, etc.) |
| `popup` | `string \| HTMLElement` | `undefined` | Popup content (HTML string or HTMLElement) |
| `popupOpen` | `boolean` | `false` | Whether popup should be open by default |
| `className` | `string` | `undefined` | Custom CSS class for the marker element |
| `style` | `CSSProperties` | `undefined` | Custom CSS styles for the marker element |
| `draggable` | `boolean` | `false` | Whether marker is draggable |
| `onClick` | `function` | `undefined` | Callback when marker is clicked |
| `onDrag` | `function` | `undefined` | Callback when marker is dragged |
| `onDragEnd` | `function` | `undefined` | Callback when marker drag ends |
| `onMouseEnter` | `function` | `undefined` | Callback when marker is hovered |
| `onMouseLeave` | `function` | `undefined` | Callback when marker hover ends |

### With Custom Style

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import type { StyleSpecification } from 'maplibre-gl';
import '@vibe/pmtiles-map/styles';

function CustomStyledMap() {
  const customStyle: StyleSpecification = {
    version: 8,
    sources: {
      'pmtiles-source': {
        type: 'vector',
        url: 'pmtiles://https://example.com/map.pmtiles'
      }
    },
    layers: [
      // Your custom layers
    ]
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <PMTilesMap
        pmtilesUrl="https://example.com/map.pmtiles"
        style={customStyle}
        center={[0, 0]}
        zoom={2}
      />
    </div>
  );
}
```

### With Event Handlers

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import type { Map } from 'maplibre-gl';
import '@vibe/pmtiles-map/styles';

function MapWithHandlers() {
  const handleMapLoad = (map: Map) => {
    console.log('Map loaded!', map);
    // Add custom layers, markers, etc.
  };

  const handleMapError = (error: Error) => {
    console.error('Map error:', error);
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <PMTilesMap
        pmtilesUrl="https://example.com/map.pmtiles"
        center={[2.3522, 48.8566]} // Paris
        zoom={12}
        onLoad={handleMapLoad}
        onError={handleMapError}
      />
    </div>
  );
}
```

### With Custom Map Options

```tsx
import { PMTilesMap } from '@vibe/pmtiles-map';
import '@vibe/pmtiles-map/styles';

function MapWithOptions() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <PMTilesMap
        pmtilesUrl="https://example.com/map.pmtiles"
        center={[139.6917, 35.6895]} // Tokyo
        zoom={10}
        mapOptions={{
          pitch: 45,
          bearing: 30,
          antialias: true
        }}
      />
    </div>
  );
}
```

## Creating PMTiles

To create PMTiles from your data, you can use the `pmtiles` CLI tool:

```bash
# Install pmtiles CLI
# Download from https://github.com/protomaps/go-pmtiles/releases

# Convert MBTiles to PMTiles
pmtiles convert input.mbtiles output.pmtiles

# Upload to S3 or other storage
pmtiles upload output.pmtiles s3://my-bucket/map.pmtiles
```

For more information on creating PMTiles, see the [PMTiles documentation](https://docs.protomaps.com/pmtiles/).

## OpenStreetMap Data

This package is designed to work with OpenStreetMap data. You can:

1. Download OSM data from [OpenStreetMap](https://www.openstreetmap.org/)
2. Convert to PMTiles using tools like [tippecanoe](https://github.com/felt/tippecanoe)
3. Host the PMTiles file on static storage (S3, Cloudflare R2, etc.)
4. Use the URL in the `pmtilesUrl` prop

## CORS Configuration

When hosting PMTiles files on cloud storage, ensure CORS is properly configured:

- **AWS S3**: Add CORS policy allowing your domain
- **Cloudflare R2**: Configure CORS settings in the dashboard
- **Other providers**: Check their CORS documentation

Example S3 CORS configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["Content-Length", "Content-Range", "ETag"]
  }
]
```

## Development

```bash
# Install dependencies
bun install

# Build
bun run build

# Type check
bun run typecheck

# Watch mode
bun run dev
```

## Contributing

This project uses:
- **[Changesets](https://github.com/changesets/changesets)** for version management
- **[Commitlint](https://commitlint.js.org/)** for commit message linting
- **[Commitizen](https://github.com/commitizen/cz-cli)** for interactive commit creation

### Making Changes

1. Create a branch and make your changes
2. Add a changeset:
   ```bash
   bun run changeset:add
   ```
3. Commit using Commitizen:
   ```bash
   bun run commit
   ```
   Or manually follow the [Conventional Commits](https://www.conventionalcommits.org/) format

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

## Versioning and Releases

This project uses Changesets for automated versioning and releases:

1. **Adding Changes**: When you make changes, add a changeset with `bun run changeset:add`
2. **Automated Versioning**: GitHub Actions automatically creates version PRs when changesets are merged
3. **Automated Publishing**: When version PRs are merged, packages are automatically published to npm

The versioning workflow is fully automated via GitHub Actions - no manual version bumps needed!

## License

MIT

## Protomaps Flavors

This package integrates with [Protomaps Basemaps](https://docs.protomaps.com/basemaps/flavors) to provide beautiful, customizable map themes. Flavors are like color schemes for your map - you can use the built-in themes or create custom ones.

For more information on flavors and customization, see the [Protomaps Flavors documentation](https://docs.protomaps.com/basemaps/flavors).

## Related Projects

- [PMTiles](https://github.com/protomaps/PMTiles) - PMTiles specification and tools
- [Protomaps Basemaps](https://docs.protomaps.com/basemaps/flavors) - Basemap flavors and styling
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js-docs/) - Map rendering library
- [OpenStreetMap](https://www.openstreetmap.org/) - Open map data

