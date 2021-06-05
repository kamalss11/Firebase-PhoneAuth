const ph = document.getElementById("ph")
const code = document.getElementById("code")
const errors = document.querySelectorAll(".er")

ph.addEventListener("blur",function(){
    console.log(ph.value)
    let val = /\d[0-9]{9,}$/
    if(ph.value === ''){
        error("This field is required",0)
    }

    else if(ph.value.length > 10){
        error("Number must contains 10 digits",0)
    }

    else if(!ph.value.match(val)){
        error("Enter only numbers",0)
    }

    else{
        errors[0].classList.remove("active")
    }
})

code.addEventListener("blur",function(){
    if(code.value === ''){
        error("Enter your OTP",1)
    }

    else{
        errors[1].classList.remove("active")
    }
})

function error(err,n){
    errors[n].innerHTML = err
    errors[n].classList.add("active")
}

// Phone Auth

window.onload = function(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    recaptchaVerifier.render()
}