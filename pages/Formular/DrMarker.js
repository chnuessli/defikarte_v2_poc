import React from "react";
import { useState, useRef, useMemo, useCallback } from "react";
import {  Icon } from 'leaflet';
import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import RoadIcon from '../../images/Marker.png'



const center = {
    lat: 46.8182,
    lng: 8.2275,
  }
  /**
   * 
   * @param {*} Gibt die Position des Markers an die Elternklasse 
   * @returns einen verschiebbaren Marker
   */
  export default function DraggableMarker(posi) {
    const [draggable, setDraggable] = useState(true)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
            posi.callparentfunction(marker.getLatLng());
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    return (
      <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
        icon={new Icon({ iconUrl: RoadIcon , iconSize: [25, 30], iconAnchor: [12, 41] })}
        >
        
        </Marker>
    )
  }
  
 