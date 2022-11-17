import React from 'react';
import { MapContainer, TileLayer,LayersControl,ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import DraggableMarker from './DrMarker';
import { useState } from 'react';

const position = [46.8182, 8.2275]

/**
 * 
 * @param {*} Koordinaten des DraggableMarker 
 * @returns Eine Webkarte mit einen verschiebaren Marke und andere Webkarten-Funktionen
 */
export default function Maps(props) {
  const [position1, setPosition1] = useState();
   
  function updateState(posi){
    setPosition1(posi);
    props.callparentfunction(posi);
  }

 

    return (
        <MapContainer center={position} zoom={8} scrollWheelZoom={true} zoomControl={false} style={{width:'100%', height:'100%'}}>
            <LayersControl position="topleft">
   <LayersControl.BaseLayer checked name="OpenStreetMap">
    
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=BeLYLeGQU1AH4qtyD15t"
      />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer  name="Hybrid">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=BeLYLeGQU1AH4qtyD15t"
      />
      </LayersControl.BaseLayer>
  
      <LayersControl.BaseLayer  name="Basic">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=BeLYLeGQU1AH4qtyD15t"/>
        
      </LayersControl.BaseLayer>
      

    </LayersControl>
    <DraggableMarker callparentfunction={(posi)=>updateState(posi)} />
    <ZoomControl position="bottomright" zoomInText="+" zoomOutText="-" />
        </MapContainer>
    )
}
