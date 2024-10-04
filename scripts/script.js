var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var tableRow = document.getElementById("tableBody")
var mainBtn = document.getElementById("mainBtn")
var alertName = document.getElementById("alertName")
var alertUrl = document.getElementById("alertUrl")




mainBtn.onclick = function () {
  if (mainBtn.innerHTML == "update") {
    finalUpdate();}
  else {
    addWebPage()}
}


var arrWeb
if (localStorage.getItem("data") == null){
    arrWeb = []
}
else{
    arrWeb = JSON.parse(localStorage.getItem("data"))
    display(arrWeb)
}

function display(arrW){
    var box= ""
    for( var i = 0; i < arrW.length; i++){
        box +=`
        <tr>
            <td scope="row">${arrW[i].sName}</td>
            <td>
                <p class="small text-truncate" style="max-width: 300px">${arrW[i].sUrl}</p>
            </td>
            <td>
                <div class="hstack justify-content-center gap-2">
                    <a href="${arrW[i].sUrl}" target="_blank" class="btn btn-outline-dark">
                        <i class="fa-solid fa-eye"></i>
                    </a>

                    <button class="btn btn-outline-warning" onclick="updateFun(${i})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button class="btn btn-outline-danger" onclick="deleteFunc(${i})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>`

        tableRow.innerHTML = box
        
    }
}

function addWebPage(){
    
    var site = {
    sName: siteName.value,
    sUrl: siteUrl.value,
    }
    if(siteName.value != "" && siteUrl.value != ""){
        arrWeb.push(site)
        localStorage.setItem("data", JSON.stringify(arrWeb))
        display(arrWeb)
        clearForm()
        alertUrl.classList.replace('d-block','d-none')
        alertName.classList.replace('d-block','d-none')
    }
    
    else if(siteName.value !== "" && siteUrl.value === ""){
        alertUrl.classList.replace('d-none','d-block')
    }
    else if(siteName.value === "" && siteUrl.value != ""){
        alertName.classList.replace('d-none','d-block')
    }
    else if(siteName.value === "" && siteUrl.value === ""){
        alertUrl.classList.replace('d-none','d-block')
        alertName.classList.replace('d-none','d-block')
    }
    

}


function deleteFunc (index){
    arrWeb.splice(index,1)
    localStorage.setItem("data", JSON.stringify(arrWeb))
    display(arrWeb)
}


var globalIndex 
function updateFun(index){
    globalIndex = index
    siteName.value = arrWeb[index].sName
    siteUrl.value = arrWeb[index].sUrl
    mainBtn.innerHTML = "update"
}
function finalUpdate (){
    arrWeb[globalIndex].sName = siteName.value
    arrWeb[globalIndex].sUrl = siteUrl.value
    mainBtn.innerHTML = "add Product"
    localStorage.setItem("data", JSON.stringify(arrWeb))
    display(arrWeb)
    clearForm()
}


function search (term){
    
    var arrsearch=[]
    for (var i = 0; i < arrWeb.length; i++) {
        if (arrWeb[i].sName.toLowerCase().includes(term.toLowerCase())) {
          arrsearch.push(arrWeb[i]);
        }
    }
    console.log(arrsearch)
    display(arrsearch)
}
