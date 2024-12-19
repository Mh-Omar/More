var bookMarkName = document.getElementById('bookmarkName');
var bookMarkUrl = document.getElementById('bookmarkURL');
var tableContent = document.getElementById('tableContent');
var allWebsitesUrl;

if (localStorage.getItem("allWebsitesUrl") != null) {
    allWebsitesUrl = JSON.parse(localStorage.getItem("allWebsitesUrl"))
    display()

} else {
    allWebsitesUrl = []
}



// Function to add a new bookmark
function addWebUrl() {
    var webSiteUrl = {
        name: bookMarkName.value,
        url: bookMarkUrl.value,
    }

    allWebsitesUrl.push(webSiteUrl);
    localStorage.setItem("allWebsitesUrl", JSON.stringify(allWebsitesUrl))
    display();
    clearForm(); 
}

// Function to display bookmarks in the table
function display() {
    var newBookmark = '';
    for (var i = 0; i < allWebsitesUrl.length; i++) {
        newBookmark += `
              <tr>
                <td>${i + 1}</td>              
                <td>${allWebsitesUrl[i].name}</td>             
                <td>
                  <button class="btn btn-visit" data-index="${i}">
                    <i class="fa-solid fa-eye pe-2"></i> Visit
                  </button>
                </td>
                <td>
                  <button onclick="deleteWeb(${i})" class="btn btn-delete pe-2" data-index="${i}">
                    <i class="fa-solid fa-trash-can"></i> Delete
                  </button>
                </td>
              </tr>
        `;
    }

    tableContent.innerHTML = newBookmark;
    VisitButtons();
}

// Function to delete a bookmark by index
function deleteWeb(idx) {
    allWebsitesUrl.splice(idx, 1);
    display();
    localStorage.setItem("allWebsitesUrl", JSON.stringify(allWebsitesUrl))

}

// Function to clear the form fields
function clearForm() {
    bookMarkName.value = '';
    bookMarkUrl.value = '';
}

function VisitButtons() {
    var visitBtns = document.querySelectorAll('.btn-visit');
    for (var l = 0; l < visitBtns.length; l++) {
        visitBtns[l].addEventListener("click", function (e) {
            visitWebsite(e);
        });
    }
}

function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;

    var httpsRegex = /^https?:\/\//;

    var url = allWebsitesUrl[websiteIndex].url;
    if (!httpsRegex.test(url)) {
        url = `https://${url}`;
    }

    window.open(url, '_blank');
}

// Validation
var siteNameRegez = /^[A-Za-z1-9]{5,}$/
var httpsRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

function isValid (){

    if(siteNameRegez.test(bookMarkName.value)){
        return true
        
    }else{
        return false
    }

}
function isValidUrl (){

    if(httpsRegex.test(bookMarkUrl.value)){
        return true
        
    }else{
        return false
    }

}

bookMarkName.addEventListener('keyup',function(){
    if(isValid()){
        bookMarkName.classList.add('is-valid')
        bookMarkName.classList.remove('is-invalid')

    }else{
        bookMarkName.classList.add('is-invalid')
        bookMarkName.classList.remove('is-valid')
    }
})

bookMarkUrl.addEventListener('keyup',function(){
    if(isValidUrl()){
        bookMarkUrl.classList.add('is-valid')
        bookMarkUrl.classList.remove('is-invalid')

    }else{
        bookMarkUrl.classList.add('is-invalid')
        bookMarkUrl.classList.remove('is-valid')
    }
})















