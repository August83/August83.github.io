function redirectToPage(page) {
    const currentUrl = window.location.href; 
    const url = currentUrl + page; 
    window.location.assign(url); 
}

//

function validatePassword(){
    let pswd = document.getElementById("pass1").value
    if(pswd=="kakor"){
        redirectToPage("/home.html")
    }
    else{
        alert("wtf")
    }
}
