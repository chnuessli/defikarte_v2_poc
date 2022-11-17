import React, { useState } from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import myMarker from './myMarker.png'

// Optimieren mit debounce

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: '',
    format: 'json',
    adressdetails: 'adressdetails'
}
/**
 * 
 * @param {*} Koordinaten 
 * @returns Adress-Suchleiste  
 */
export default function SearchBox(props) {
    const { selectPosition, setSelectPosition } = props;
    const [searchText, setSearchText] = useState("");
    const [delayedSearchText, setDelayedSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);
    
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchText);
      // Send Axios request here
      setDelayedSearchText(searchText);
    }, 6000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);
    
    return (
        <div >
            <div >
                <div >
                    <OutlinedInput
                    autoFocus
                    type="text"
                    autoComplete="off"
                    placeholder='Wo befinden Sie sich ?'
                        style={{ width: "100%" }}
                        value={searchText}
                        onChange={(event) => {
                            const element= document.getElementById('AdressBox');
                            console.log(searchText.length);
                            if(searchText.length === 1) {element.style.display='none';}
                            else{ element.style.display='block';}
                            setSearchText(event.target.value);
                            const params = {
                                q: searchText,
                                countrycodes:'CH',
                                limit:'5',
                                format: 'json',
                                adressdetails: 1,
                                polygon_geojson: 0
                            };
    
                            const queryString = new URLSearchParams(params).toString();
                            const requestOptions = {
                                method: "GET",
                                redirect: "follow"
                            };
                            fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                                .then((response) => response.text())
                                .then((result) => {
                                    //console.log(JSON.parse(result));
                                    setListPlace(JSON.parse(result));
                                })
                                .catch((err) => console.log("err:", err));
                        }} />
                </div>
                
            </div>
            <div id='AdressBox' style={{height:"20vh" , overflowY:"scroll",overflowX :"hidden",display:"none"}} >
                <List component="nav" aria-label="main mailbox folders" >
                    {listPlace.map((item) => {
                        return (
                            <div key={item?.place_id}>
                                <ListItem button onClick={() => {
                                    const element= document.getElementById('AdressBox');
                                    element.style.display='none';
                                    setSelectPosition(item);
                                }}>
                                    <ListItemIcon>
                                        <img src={myMarker} alt="Placeholder" style={{ width: 20, height: 30 }} />
                                    </ListItemIcon>
                                    <ListItemText primary={item?.display_name} />
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })}
                </List>


            </div>
        </div>
    )
}

/*
<div style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}>
                    <Button variant="contained" color="primary" onClick={() => {

                        const params = {
                            q: searchText,
                            format: 'json',
                            adressdetails: 1,
                            polygon_geojson: 0
                        };

                        const queryString = new URLSearchParams(params).toString();
                        const requestOptions = {
                            method: "GET",
                            redirect: "follow"
                        };

                        fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                            .then((response) => response.text())
                            .then((result) => {
                               // console.log(JSON.parse(result));
                                setListPlace(JSON.parse(result));
                            })
                            .catch((err) => console.log("err:", err));
                    }}>
                        Search
                    </Button>
                </div>*/