const contactForm = document.querySelector('.contact-form');
let pname = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
   let formData = {
       pname: pname.value,
       email: email.value,
       phone: phone.value,
       subject: subject.value,
       message: message.value
   }

   let xhr = new XMLHttpRequest();
   xhr.open('POST', '/');
   xhr.setRequestHeader('content-type', 'application/json');
   xhr.onload = function(){
       console.log(xhr.responseText);
       if(xhr.responseText == 'success'){
           alert('Your email has been sent! Recon Plumbing will be in touch shortly.');
           pname.value = '';
           email.value = '';
           phone.value = '';
           subject.value = '';
           message.value = '';
       }else{
           alert('Something went wrong!')
       }
   }

   xhr.send(JSON.stringify(formData));

})