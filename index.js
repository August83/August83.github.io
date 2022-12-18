//function redirectToPage(page) {
    //var currentUrl = window.location.href; 
   // if (currentUrl.slice(-1) !== '/') {
   //     currentUrl += '/';
  //  }
  //  var url = currentUrl + page; 
 //   window.location.assign(url); 
//}

function redirectToPage(url) {
    window.location.assign(url); 
}

function validatePassword() {
    var pswdElement = document.getElementById('pass1');
    if (pswdElement) {
        var pswd = pswdElement.value;
        var password = '123';
        if (pswd === password) {
            redirectToPage('https://www.granath.top/home');
        } else {
            alert('no');
        }
    }
}