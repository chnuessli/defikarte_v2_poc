import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import Maps from "./Maps";
import { Octokit, App } from "octokit";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

/** 
 * stell letzendlich unsere ganze Formular Seite da
*/
const Formular = () => {
  const [Melder, setMelder] = useState('');
  const [Standort, setStandort] = useState('');
  const [Beschreibung, setBeschreibung] = useState('');
  const [Öffnungszeiten, setÖffnungszeiten] = useState('');
  const [Betreiber, setBetreiber] = useState('');
  const [Telefon, setTelefon] = useState('');

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");

/**
 * 
 * @returns ladet das Bild auf Google Firebase hich und speichert die URL des Bildes in image URL
 */
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls([url]);
        console.log("Image uploaded")

      });
    });
  };
  //console.log(imageUrls[0])
  /**
   * 
   * @param {*} event
   * Zeigt das Bild auf der Webseite an  
   */

  function showPreview(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  }

/**
 * JSON Feld Element, welches mit den nötigen Informationen gefüllt wird
 */
  const newDefiJson = {
    "type": "Feature",
    "id": "",
    "properties": {
      "Melder": "",
      "access": "",
      "defibrillator:location": "",
      "emergency": "defibrillator",
      "emergency:phone": "144",
      "level": "0",
      "opening_hours": "",
      "wheelchair": "",
      "id": "",
      "imageUrl": "",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [

      ]
    }
  }
  const [data24h, setData24h] = useState([]);
  const [dataNot24h, setDataNot24h] = useState([]);
  const [Sha24, setSha24] = useState(null);
  const [ShaNot24, setShaNot24] = useState(null);



/**
 * Token zum Authenthfiziern mit der Github-API
 */
  const octokit = new Octokit({
    auth: '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'
  })
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer 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");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
/**
 * Runterladen des SHA
 */
  fetch("https://api.github.com/repos/AhmadAbuG/TestApi2/contents/defis_ch_24h.json", requestOptions)
    .then(response => response.json())
    .then(result => {
      //console.log(result.sha)
      setSha24(result.sha)
      //console.log("refreshed")
    })
    .catch(error => console.log('error', error));
/**
 * Runterladen des SHA
 */
  fetch("https://api.github.com/repos/AhmadAbuG/TestApi2/contents/defis_ch_not_24h.json", requestOptions)
    .then(response => response.json())
    .then(result => {
      //console.log(result.sha)
      setShaNot24(result.sha)
    })
    .catch(error => console.log('error', error));

/**
 * runterladen der JSON-Datein 
 */
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/AhmadAbuG/TestApi2/main/defis_ch_24h.json')
      .then(res => { return res.json(); })
      .then(data => {
        //console.log(data);
        setData24h(data)
        console.log(data.features.length)
        console.log("NewFetch1");
      });
  }, []);
/**
 * runterladen der JSON-Datein 
 */
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/AhmadAbuG/TestApi2/main/defis_ch_not_24h.json')
      .then(res => { return res.json(); })
      .then(data => {
        //console.log(data);
        setDataNot24h(data)
        console.log("NewFetch2");
      });
  }, []);

  
  /** 
   * Lädt nochmals alle Datein von Figma neu. Diese Funktion ist nicht relevant und dient nur um mittels der Konsole zu prüfen ob alles korrekt impmentiert wurde.
  */
 async function fetchData(){
    fetch('https://raw.githubusercontent.com/AhmadAbuG/TestApi2/main/defis_ch_24h.json')
      .then(res => { return res.json(); })
      .then(data => {
        //console.log(data);
        setData24h(data)
        console.log("NewFetch1");
        console.log(data.features.length)
      });

    fetch('https://raw.githubusercontent.com/AhmadAbuG/TestApi2/main/defis_ch_not_24h.json')
    .then(res => { return res.json(); })
    .then(data => {
      //console.log(data);
      setDataNot24h(data)
      console.log("NewFetch2");
    });
    fetch("https://api.github.com/repos/AhmadAbuG/TestApi2/contents/defis_ch_24h.json", requestOptions)
    .then(response => response.json())
    .then(result => {
      //console.log(result.sha)
      setSha24(result.sha)
      console.log(result.sha)
      console.log("refreshedSha1")
    })
    .catch(error => console.log('error', error));

  fetch("https://api.github.com/repos/AhmadAbuG/TestApi2/contents/defis_ch_not_24h.json", requestOptions)
    .then(response => response.json())
    .then(result => {
      //console.log(result.sha)
      setShaNot24(result.sha)
      console.log(result.sha)
      console.log("refreshedSha2")
    })
    .catch(error => console.log('error', error));
    
  }

  /*  async function UploadData(sha){
      await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'AhmadAbuG',
        repo: 'TestApi2',
        path: 'Test.json',
        message: 'a new commit message',
        committer: {
          name: 'Monalisa Octocat',
          email: 'octocat@github.com'
        },
        content: {newDefiJson},
        sha: 
      })}*/
  const center = {
    lat: 46.8182,
    lng: 8.2275,
  }
  const [position2, setPosition2] = useState(center);

/**
 * 
 * @param {*} Position der verschiebaren Markers  
 */
  function updateState2(posi) {
    setPosition2(posi);

  }
  //console.log(position2)
  return (

    <div>
      <form className="formular">

        <h2>
          Neuen Defibrillator melden
        </h2>

        <div style={{ width: "100%", height: "30vh" }}>
          <Maps callparentfunction={(posi) => updateState2(posi)} />

        </div>


        <div action="">

          <label>Melder</label>
          <input type="text" placeholder="z.B: Max Mustermann" value={Melder} onChange={(e) => setMelder(e.target.value)} />

          <label> Standort</label>
          <textarea placeholder="z.B: Schulhaus Zürich West, neben dem Eingang" value={Standort} onChange={(e) => setStandort(e.target.value)} />

          <label> Beschreibung</label>
          <textarea placeholder="z.B: Verfügbar innerhalb der Öffnungszeiten" value={Beschreibung} onChange={(e) => setBeschreibung(e.target.value)} />

          <label> Öffnungszeiten</label>
          <textarea placeholder="z.B: Mo-Fr: 8:00-17:00 oder 24/7" value={Öffnungszeiten} onChange={(e) => setÖffnungszeiten(e.target.value)} />

          <label> Betreiber</label>
          <input placeholder="z.B: Gemeinde, Verein, Unternehmen" value={Betreiber} onChange={(e) => setBetreiber(e.target.value)} />

          <label> Telefon</label>
          <input placeholder="z.B: Verfügbar innerhalb der Öffnungszeiten" value={Telefon} onChange={(e) => setTelefon(e.target.value)} />


          <div className="center">
            <div className="form-input">
              <div className="preview">
                <img src="" alt="" id="file-ip-1-preview" required></img>
              </div>
              <label htmlFor="file-ip-1">Bild Hinzufügen</label>
              <input type="file" id="file-ip-1" onChange={(e) => {
                showPreview(e);
                setImageUpload(e.target.files[0]);
              }}></input>
            </div>
          </div>
          <button type="button" onClick={uploadFile}> Upload Image</button>

          <button type="button" onClick={() => {
              fetchData();
          }}>Refresh</button>


          <button type="button" onClick={() => {
           const test1= async()=> await fetchData();
            newDefiJson.id = v4();
            newDefiJson.properties.Melder = Melder;
            newDefiJson.properties.access = "Ja";
            newDefiJson.properties["defibrillator:location"] = Standort;
            newDefiJson.properties.emergency = "112";
            newDefiJson.properties["emergency:phone"] = Telefon;
            newDefiJson.properties.opening_hours = Öffnungszeiten;
            newDefiJson.properties.imageUrl = imageUrls[0];
            newDefiJson.geometry.coordinates = [position2.lng, position2.lat]                        //console.log(Melder, Standort, Beschreibung, Öffnungszeiten, Betreiber, Telefon);
            // console.log(newDefiJson);
            const octokit = new Octokit({
              auth: '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'
            })

            if (newDefiJson.properties.opening_hours == "24/7") {
              console.log(data24h.features.length);
              data24h.features[data24h.features.length] = newDefiJson;
        
              console.log(data24h.features.length);
              const e = JSON.stringify(data24h);
              const Buffer = require('buffer/').Buffer;
              const b = Buffer.from(e);
              const s = b.toString('base64');
              //console.log(s)

              const test = async () => await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: 'AhmadAbuG',
                repo: 'TestApi2',
                path: 'defis_ch_24h.json',
                message: 'a new commit message',
                committer: {
                  name: 'Ahmad',
                  email: 'ahmadkane@rocketmail.com'
                },
                content: s,
                sha: Sha24
              })
              test()
              console.log("Json uploaded s24")
            }
            else {

              //dataNot24h.features[dataNot24h.features.length] = newDefiJson;
              dataNot24h.features = [...dataNot24h.features, newDefiJson];

              const e = JSON.stringify(dataNot24h);
              const Buffer = require('buffer/').Buffer;
              const b = Buffer.from(e);
              const s = b.toString('base64');
              //console.log(s)

              const test = async () => await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: 'AhmadAbuG',
                repo: 'TestApi2',
                path: 'defis_ch_not_24h.json',
                message: 'a new commit message',
                committer: {
                  name: 'Ahmad',
                  email: 'ahmadkane@rocketmail.com'
                },
                content: s,
                sha: ShaNot24
              })
              test()
              console.log("Json uploaded sn24")
            }
            //console.log(data24h.features.length);
            //console.log(dataNot24h.features.length);

          }
          }> Neuen Defibrillator zur Karte Hinzufügen</button>
        </div>

      </form>
    </div>

  )
}

export default Formular;