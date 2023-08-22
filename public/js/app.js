console.log('client side js file is loaded')

// selecting our form element and adding eventlistener submit
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
//always sleects the first matched type of element
// const messageOne=document.querySelector('p')
// '.className' in case of selecting class
// '#id' in case of particular id
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

// to change the text,use textContent property


weatherForm.addEventListener('submit',(e)=>{
    // prevents form from reloading(default behavior)
    e.preventDefault()

    const location=search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('url'+ location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
            }else{
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }
        })
    })
     
})