/* 

function showPreview(event){
        if(event.target.files.length > 0){
          var src = URL.createObjectURL(event.target.files[0]);
          var preview = document.getElementById("file-ip-1-preview");
          preview.src = src;
          preview.style.display = "block";
        }
      }


 <div className="center">
                    <div className="form-input">
                        <div className="preview">
                            <img src="" alt="" id="file-ip-1-preview"></img>
                        </div>
                        <label  htmlFor="file-ip-1">Bild Hinzufügen</label>
                        <input type="file" id="file-ip-1" accept="image/*" onChange={(e)=> showPreview(e)}></input>
                    </div>
                </div>

**/


let files=[],
button = document.querySelector('.top button'),
form= document.querySelector('form'),
container= document.querySelector('.container'),
text= document.querySelector('.inner')
browse= document.querySelector('.select'),
input = document.querySelector('form input');

browse.addEventListener ('click', () => input.click());
// input change event
input.addEventListener('change', () => {
    let file= input.files;
    for ( let i=0; i<file.length; i++){
        if(files.every(e => e.name != file[i].name)) files.push(file[i])
    }
    form.reset();
    showImages();

})
/**
 * wird ein Bild hochgeladen so wird dieses mittels dieser Funktion angezeigt.
 */

const showImages=() => {
    let images='';
    files.forEach((e,i)=>{
        images += `<div class="image"> 
        <img src="${URL.createObjectURL(e)}" alt="image"> 
        <span onclick="delImage (${i})"> &times;</span>
    </div>`
    })
    container.innerHTML =images;
}
 
 const delImage = index => {
     files.splice(index,1)
     showImages()
 }

// drag and drop
form.addEventListener ('dragover', e=>{
    e.preventDefault()
    form.classList.add('dragover')
    text.innerHTML='Droop images here'
})
form.addEventListener ('dragleave', e=>{
    e.preventDefault()
    form.classList.remove('dragover')
    text.innerHTML=`Drag & Drop image here or <span class="select"> Browse
    </span>`
})


form.addEventListener('drop', e => {
    e.preventDefault()
    form.classList.remove('dragover')
    text.innerHTML=`Drag & Drop image here or <span class="select"> Browse</span>`

    let file = e.dataTransfer.files;
    for (let i =0; i< file.length;i++){
        if(files.every(e => e.name != file[i].name)) files.push(file[i]) 
    }
    showImages();
})

button.addEventListener('click',()=> {
let form = new FormData();
files.foreach((e,i) => form.append(`file[${i}]`,e))

 })
 