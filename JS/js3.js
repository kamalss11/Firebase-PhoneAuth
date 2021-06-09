// Loader

window.onload = () => {
    loader()
}

function loader(){
    setTimeout(function(){
        document.getElementById("loads").style.display = "none"
    },3000)
}