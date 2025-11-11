import * as maplibregl from 'maplibre-gl';
import type { MarkerPin } from './types';

/**
 * Create a default marker icon element
 */
export function createDefaultMarkerIcon(size: number = 40): HTMLElement {
  const el = document.createElement('div');
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.borderRadius = '50%';
  el.style.backgroundColor = '#3b82f6';
  el.style.border = '3px solid white';
  el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
  el.style.cursor = 'pointer';
  return el;
}

/**
 * Create a marker icon from URL or use default
 */
export function createMarkerIcon(
  icon: string | HTMLElement | undefined,
  size: number,
  defaultIcon?: string
): HTMLElement {
  if (icon instanceof HTMLElement) {
    return icon;
  }

  const el = document.createElement('div');
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.cursor = 'pointer';
  el.style.backgroundSize = 'contain';
  el.style.backgroundRepeat = 'no-repeat';
  el.style.backgroundPosition = 'center';

  if (icon) {
    el.style.backgroundImage = `url(${icon})`;
  } else if (defaultIcon) {
    el.style.backgroundImage = `url(${defaultIcon})`;
  } else {
    // Use default pin style
    return createDefaultMarkerIcon(size);
  }

  return el;
}

/**
 * Get anchor offset based on anchor string
 */
export function getAnchorOffset(anchor: MarkerPin['anchor']): maplibregl.PointLike {
  const offsets: Record<string, maplibregl.PointLike> = {
    center: [0, 0],
    top: [0, 1],
    bottom: [0, -1],
    left: [1, 0],
    right: [-1, 0],
    'top-left': [1, 1],
    'top-right': [-1, 1],
    'bottom-left': [1, -1],
    'bottom-right': [-1, -1]
  };
  return offsets[anchor || 'bottom'];
}

/**
 * Create a MapLibre marker from MarkerPin configuration
 */
export function createMarker(
  config: MarkerPin,
  map: maplibregl.Map,
  defaultIcon?: string,
  defaultSize: number = 40
): maplibregl.Marker {
  const size = config.size || defaultSize;
  const icon = createMarkerIcon(config.icon, size, defaultIcon);
  
  // Apply custom className and styles
  if (config.className) {
    icon.className = config.className;
  }
  if (config.style) {
    Object.assign(icon.style, config.style);
  }

  const anchor = getAnchorOffset(config.anchor);
  const marker = new maplibregl.Marker({
    element: icon,
    anchor: anchor as any,
    draggable: config.draggable || false
  })
    .setLngLat(config.position)
    .addTo(map);

  // Add popup if provided
  if (config.popup) {
    const popup = new maplibregl.Popup({
      offset: 25,
      closeButton: true,
      closeOnClick: true
    });

    if (typeof config.popup === 'string') {
      popup.setHTML(config.popup);
    } else {
      popup.setDOMContent(config.popup);
    }

    marker.setPopup(popup);

    if (config.popupOpen) {
      popup.addTo(map);
    }
  }

  // Add event listeners
  if (config.onClick) {
    icon.addEventListener('click', (e) => {
      config.onClick!(marker, e);
    });
  }

  if (config.onMouseEnter) {
    icon.addEventListener('mouseenter', (e) => {
      config.onMouseEnter!(marker, e);
    });
  }

  if (config.onMouseLeave) {
    icon.addEventListener('mouseleave', (e) => {
      config.onMouseLeave!(marker, e);
    });
  }

  if (config.draggable) {
    if (config.onDrag) {
      marker.on('drag', (e) => {
        config.onDrag!(marker, e as any);
      });
    }

    if (config.onDragEnd) {
      marker.on('dragend', (e) => {
        config.onDragEnd!(marker, e as any);
      });
    }
  }

  return marker;
}

