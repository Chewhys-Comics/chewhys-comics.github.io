const form = document.querySelector('form');
const fullName = document.getElementById("name")
const email = document.getElementById("email")

const scriptURL = 'https://script.google.com/macros/s/AKfycbyI0Ul7EV9LuTt_7ioF_cAjTD13fi5ndm6y2Yrow0QWAHUt7npoFn_jaTZWW6RCe74ULQ/exec'

form.addEventListener('submit', e => {
 e.preventDefault()
 fetch(scriptURL, { method: 'POST', body: new FormData(form)})
 .then(response => alert("Thank you! Your form is submitted successfully." ))
 .then(() => { window.location.reload(); })
 .catch(error => console.error('Error!', error.message))
})


function sendEmail() {
    const hostBodyMessage = `${fullName.value} with email ${email.value} has successfully subscribed to Chewhys Comics.`;
    const senderBodyMessage = `Chewhys Comics<br><br> Hello, ${fullName.value} (${email.value})!<br>You have successfully subscribed to Chewhys Comics and will receive latest updates from us.`;

    Email.send({
        SecureToken: "8a7f1c08-be83-44e8-ba94-d03a6e295a85",
        Host : "smtp.elasticemail.com",
        Username : "chewhyscomics@gmail.com",
        Password : "38439EFC2A446113ADB155E4B7ACF0442E5C",
        To : 'chewhyscomics@gmail.com',
        From : "chewhyscomics@gmail.com",
        Subject : `${fullName.value}`+" has successfully subscribed to Chewhys Comics.",
        Body : hostBodyMessage
    })
    Email.send({
        SecureToken: "8a7f1c08-be83-44e8-ba94-d03a6e295a85",
        Host : "smtp.elasticemail.com",
        Username : "chewhyscomics@gmail.com",
        Password : "38439EFC2A446113ADB155E4B7ACF0442E5C",
        To : `${email.value}`,
        From : "chewhyscomics@gmail.com",
        Subject : "Thanks for Subscribing to Chewhys Comics!",
        Body : senderBodyMessage
    })
    .then(
      message => {
        if (message == "OK"){
            Swal.fire({
                title: "Success!",
                text: "Thanks for subscribing!",
                icon: "success"
              });
        }
      }
    );
}

function checkInputs(){
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value=="") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value !=""){
            checkEmail();
        }

        items[1].addEventListener("keyup",()=>{
            checkEmail();
        });

        item.addEventListener("keyup", ()=> {
            if (item.value != ""){
                item.classList.remove("error");
            item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
            item.parentElement.classList.add("error");
            }
        })
    }
}


function checkEmail() {
    const emailRegex=/^([a-z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email");
    if (!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != ""){
            errorTxtEmail.innerText = "Enter a valid email address";
        }
        else {
            errorTxtEmail.innerText = "Email Adress can't be blank";
        }
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit",(e)=> { 
    e.preventDefault();
    checkInputs();
    
    if (!fullName.classList.contains("error") &&!email.classList.contains("error")){
        sendEmail();

        form.reset();
        return false;
    }
});