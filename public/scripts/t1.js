
const socket = io();
let myname

let language_content =
      {
         "en": {
          "1": "How to play",
          "2": "How to play",
          "3": "If the color of the text is black then the answer is the background color",
          "4": "If the color of the text is not black then the answer is the text color",
          "5": "Play",
          "6": "Enter your name",
          "7": "Start"
      
         },
         "ar": {
          "1": "طريقة اللعب",
          "2": "طريقة اللعب",
          "3": " اذا كان لون النص اسود فان الاجابة الصحيحة هي لون الخلفية",
          "4": "اذا لم يكن لون النص اسود فان الاجابة هي لون النص",
          "5": "العب",
          "6": "ادخل اسمك",
          "7": "ابدا"
         }
      }
      
      function changeLanguage(lang) {
         for (let key in language_content[lang]) {
            document.getElementById(key).innerHTML = language_content[lang][key];
         }
       }


       document.getElementById("page2").style.display='none'
        document.getElementById("loading").style.display='none'

        document.getElementById("7").addEventListener("click", function() {
       
            myname = document.getElementById("name").value
            document.getElementById("user").innerText=myname
              
             if(myname==null || myname==''){
               alert("enter your name, please")
             }
     
             else{
               socket.emit('find', { name: myname })
               document.getElementById("loading").style.display="block"
               document.getElementById("7").disabled=true 
             }
     
            })