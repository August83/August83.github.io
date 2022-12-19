//function redirectToPage(page) {
    //var currentUrl = window.location.href; 
   // if (currentUrl.slice(-1) !== '/') {
   //     currentUrl += '/';
  //  }
  //  var url = currentUrl + page; 
 //   window.location.assign(url); 
//}

function redirectToPage(url, event) {
    window.location.assign(url); 
    event.preventDefault();

}

function validatePassword(event) {
    var pswdElement = document.getElementById('pass1');
    if (pswdElement) {
        var pswd = pswdElement.value;
        var password = '123';
        if (pswd === password) {
            redirectToPage('home.html', event);
        } else {
        window.location.reload();
        event.preventDefault();
        }
    }
}