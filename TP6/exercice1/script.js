const helice = document.querySelector('img'); 
window.onscroll = function () {
    scrollRotate();
};
function scrollRotate() { 
    helice.style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
}
