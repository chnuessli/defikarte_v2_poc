import React, { useEffect,useState } from 'react';
import {  Icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap, LayersControl, Circle, LayerGroup,Rectangle,FeatureGroup,ZoomControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import myMarker from './myMarker.png';
import DefiIcon from '../src/images/apple-touch-icon.png'
import DefiIcon2 from '../src/images/apple-touch-icon2.png'
import "leaflet-canvas-marker";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Octokit, App } from "octokit";
import { ListItemSecondaryAction } from '@material-ui/core';




const center = [51.505, -0.09]
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]


/*var myIcon = L.icon({
  iconUrl: './myMarker.png',
  iconSize: [38, 38]
})*/

const position = [46.8182, 8.2275]



/**
 * 
 * @param {*} Koordinaten 
 * @returns ändert den Fokus der Karte
 */
function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
  }, [selectPosition]);

  return null;
}

let marker;






 
  /**
   * 
   * @param {*} Koordinaten um die aktuelel Position zu bestimmen.  
   * @returns Die vollständige Karte mit allen Datenpunkten und Funktionen
   */

export default function Maps(props) {
  const { selectPosition } = props;
  const locationSelcetion = [selectPosition?.lat, selectPosition?.lon];

  const DATA_BASE_URL = "https://raw.githubusercontent.com/chnuessli/defi_data/main/data/csv/defis_switzerland.csv";
  
  const octokit = new Octokit({
    auth: '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'
  })



const [data24h, setData24h]=useState(null);
const [dataNot24h, setDataNot24h]=useState(null);

useEffect(()=>{
fetch('https://raw.githubusercontent.com/AhmadAbuG/TestApi2/main/defis_ch_24h.json')
.then(res=> { return res.json();})
.then (data=> {
  //console.log(data);
  setData24h(data)
});
},[]);

useEffect(()=>{
  fetch('https://raw.githubusercontent.com/AhmadAbuG/TestApi2/main/defis_ch_not_24h.json')
  .then(res=> { return res.json();})
  .then (data=> {
    //console.log(data);
    setDataNot24h(data)
  });
  },[]);


  return (


    <MapContainer center={position} zoom={7} zoomControl={false} style={{ width: '100%', height: '100%' }}>
      
    

  
  <LayersControl position="topright">
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
      <LayersControl.Overlay checked name="24/7 verfügbar">
    
    <MarkerClusterGroup chunkedLoading>    
    {data24h && data24h.features.map(data => ( 
<Marker
  key={data.id}
  position={[data.geometry.coordinates[1], data.geometry.coordinates[0]]}
  icon={new Icon({ iconUrl: DefiIcon, iconSize: [30, 30], iconAnchor: [12, 41] })}>
  <Popup closeOnClick="true" offset={L.point(-2, -34)}>
    <div>
      <ul style={{ listStyle: "none" }}>
        <li>
          Verfügbarkeit: {data.properties.opening_hours}
        </li>
        <li>
          Betreiber:{data.properties.operator}
        </li>
        <li>
          im Gebäude: {data.properties.indoor}
        </li>
        <li>
          Ort:{data.properties['defibrillator:location']}
        </li>
        <li>
          Zugang:{data.properties.access}
        </li>
        <li>
          Notrufnummer:{data.properties['emergency:phone']}
        </li>
        <li>
          Telefon Defi:{data.properties.phone}
        </li>
        <li>
          Bild:
        </li>
         <li>
          
        <a href={data.properties.imageUrl} >Link Image</a>
    
        </li>
      </ul>
    </div>
  </Popup>
</Marker>
))}

    </MarkerClusterGroup>
    </LayersControl.Overlay>    
    <LayersControl.Overlay checked name="Nicht 24/7 verfügbar">
    
    <MarkerClusterGroup chunkedLoading>    
    {dataNot24h && dataNot24h.features.map(data => ( 
<Marker
  key={data.id}
  position={[data.geometry.coordinates[1], data.geometry.coordinates[0]]}
  icon={new Icon({ iconUrl: DefiIcon2, iconSize: [30, 30], iconAnchor: [12, 41] })}>
  <Popup closeOnClick="true" offset={L.point(-2, -34)}>
    <div>
      <ul style={{ listStyle: "none" }}>
        <li>
          Verfügbarkeit: {data.properties.opening_hours}
        </li>
        <li>
          Betreiber:{data.properties.operator}
        </li>
        <li>
          im Gebäude: {data.properties.indoor}
        </li>
        <li>
          Ort:{data.properties['defibrillator:location']}
        </li>
        <li>
          Zugang:{data.properties.access}
        </li>
        <li>
          Notrufnummer:{data.properties['emergency:phone']}
        </li>
        <li>
          Telefon Defi:{data.properties.phone}
        </li>
        <li>
        <iframe src={data.properties.imageUrl} title="Image of Defi-Location"></iframe>
        </li>
      </ul>
    </div>
  </Popup>
</Marker>
))}

    </MarkerClusterGroup>
    </LayersControl.Overlay>    

    </LayersControl>
     
    <ZoomControl position="topright" zoomInText="+" zoomOutText="-" />

  
      {selectPosition && (

        <Marker position={locationSelcetion}
          icon={new Icon({ iconUrl: myMarker, iconSize: [25, 41], iconAnchor: [12, 41] })}
        >
          <Popup>
            Mein Standort
          </Popup>
        </Marker>

      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  )
}
/* {selectPosition && (
       
      <Marker position={locationSelcetion} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      
      )}
      
      
      {TestData[0].features.map(data => (
     <Marker 
     key={data.id} 
     position={data.geometry.coordinates} 
     icon={new Icon({iconUrl:myMarker, iconSize: [25, 41], iconAnchor: [12, 41]})}>
      console.log(data.features)
     </Marker>
     ))}
      
      
      
      */