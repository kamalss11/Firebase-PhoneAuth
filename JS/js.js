const ph = document.getElementById("ph")
const code = document.getElementById("code")
const errors = document.querySelectorAll(".er")
const form = document.querySelector("#form")
const otp = document.querySelector(".otp")
const login = document.querySelector(".login")

code.style.display = "none"
login.style.display = "none"

form.addEventListener("submit",function(e){
        e.preventDefault()
    }
)

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
   
const recaptcha = document.querySelector("#recaptcha-container")

window.onload = function(){
    render()
}

function render(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptcha)
    recaptchaVerifier.render()
}

function phoneAuth(){
    var number = document.getElementById("ph").value
    // phone number authentication

    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function(confirmationResult){
        window.confirmationResult = confirmationResult
        coderesult = confirmationResult
        console.log(coderesult)
        alert("Message Sent")
        code.style.display = "block"
        login.style.display = "block"
        ph.style.display = "none"
        otp.style.display = "none"
    }).catch(function (error){
        alert(error.message)
        code.style.display = "none"
        login.style.display = "none"
    })
}

function verification(){
    coderesult.confirm(code.value).then(function (result){
        alert("Successfully Verified")
        var user = result.user
        console.log(user)
    }).catch(function (error){
        alert(error.message)
    })
}