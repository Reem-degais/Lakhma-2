

const socket = io();
let myname
      

      // function to switch language of web page
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
       /*----paasing player name to back end-------*/
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
       
       socket.on("find", (e) => {


        let allPlayersArray = e.allPlayers
        console.log("html",allPlayersArray)
        
        document.getElementById("page1").style.display="none"
        document.getElementById("page2").style.display="block"
        
        let oppName
        let value
        const foundObject = allPlayersArray.find(obj => obj.p1.p1name == `${myname}` || obj.p2.p2name == `${myname}`);
        foundObject.p1.p1name == `${myname}` ? oppName = foundObject.p2.p2name : oppName = foundObject.p1.p1name
        foundObject.p1.p1name == `${myname}` ? value = foundObject.p1.p1value : value = foundObject.p2.p2value
        document.getElementById("opp").innerText = oppName
        document.getElementById("whosTurn").innerText = foundObject.p1.p1name
        
      })
      

        /*--------------------------------------------------------------------------------------------*/
        const form = document.getElementById('chatt');
        const input = document.getElementById('input-mas');
        const messages = document.getElementById('messages');

           
            /*send message to server*/
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (input.value) {
                socket.emit('chat message', input.value);
                input.value = '';
                }
            });
            socket.on('chat message', (msg) => {
                const item = document.createElement('li');
                item.textContent = msg;
                messages.appendChild(item);
                window.scrollTo(0, document.body.scrollHeight);
            });

            /*------------------findname----------------*/
            
            

            document.getElementById("rig").style.display="none"
            document.getElementById("wro").style.display="none" 

            const COLORtext = ["Red", "Blue", "Green", "Yellow", "Black", "Orange", "Purple", "Pink"] 
            const VALUE = ["red", "blue", "green", "yellow", "white", "orange", "purple"]

           class Deck {
       constructor(cards = freshDeck()) {
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i>0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {
    constructor(colortext, value) {
        this.colortext = colortext
        this.value = value
    }

    get color() {
        const colors = ["red", "blue", "black", "orange", "purple"]
        const randomIndex = Math.floor(Math.random() * colors.length);
        const textColor = colors[randomIndex];
        button1(textColor)
        return textColor;
        
      }
    
    backColor(col){
        const colorss = [ "Green", "Yellow", "White","Pink"]
        const randomIndexx = Math.floor(Math.random() * colorss.length);
        const baColor = colorss[randomIndexx];
        button2(baColor)
        return baColor;
    }
    getHTML() {
        const cardDiv = document.createElement("div")
        cardDiv.innerText = this.colortext
        let wow =this.color
        cardDiv.classList.add("five", wow)
        cardDiv.classList.add("five", this.backColor(this.value))
        cardDiv.dataset.value = `${wow}`
        return cardDiv
    }

}

function freshDeck() {
    return COLORtext.flatMap(colortext => {
        return VALUE.map(value => {
            return new Card(colortext, value)
        })
    })
}


const fivecard= document.querySelector('.five')
let timeleft = 4;

document.querySelectorAll(".card").forEach(e=>{
    e.addEventListener("click", function () {
        
        document.getElementById(e.id).style.display="none"
        let value = this.className
        console.log(this.className)
        /*-------------random card--------------------*/
        const deck = new Deck
        deck.shuffle()
        let keycolor=fivecard.appendChild(deck.cards[0].getHTML())
        button3()
        const text = keycolor.getAttribute("data-value");
        let classes = keycolor.className
        console.log(classes)
        socket.emit("playing", {value: value, id: e.id, name: myname, card: classes})
        
        document.addEventListener('click', function(evt) {
            let element = evt.target;
            let key = element.id
            console.log(key)
            console.log(text)
            /*clearInterval(timer);
            ResetTimer(timer);*/
            socket.emit('choices', {key: key, text:text})
        })
            
        
    })
})

socket.on("playing", (e) => {
    const foundObject = (e.allPlayers).find(obj => obj.p1.p1name == `${myname}` || obj.p2.p2name == `${myname}`);

    p1id = foundObject.p1.p1move
    p2id = foundObject.p2.p2move
    turn1 = foundObject.p1.p1name
    turn2 = foundObject.p2.p2name
    random1 = foundObject.p1.p1card
    random2 = foundObject.p2.p2card
    
    /*exchage turns*/
    if ((foundObject.sum) % 2 == 0) {
        document.getElementById("whosTurn").innerText = turn2 + "'s turn"
    }
    else {
        document.getElementById("whosTurn").innerText = turn1 + "'s turn"
    }

    if (p1id != '') {
        document.getElementById(`${p1id}`).style.display ="none"
        const timer = setInterval(() => {
            timeleft--;
            console.log(timeleft)
              if (timeleft < 0) {
              clearInterval(timer);
              ResetTimer(timer);
              console.log('Time is up!');
              displayMessage('Time is up!');
              document.getElementById(`${p1id}`).style.display="block"
            }
            else{
                document.getElementById("timer").innerHTML=`00:${timeleft}`
                socket.on("choices", (e)=>{
                    keys = e.key

                   let texts =e.kl
                    console.log(texts)
                    clearInterval(timer);
                    ResetTimer(timer);
                    console.log(keys)
                    if (texts =="black"){
                        if (keys == "choice2"){
                            document.getElementById("rig").style.display="block"
                            
                        }
                        else if(keys == "choice3" || keys =="choice1") {
                            document.getElementById("wro").style.display="block"
                          
                            
                        }
                    }
                    else {
                        if (keys == "choice1"){
                            document.getElementById("rig").style.display="block"
                            
                        }
                        else if(keys == "choice3" || keys =="choice2") {
                            document.getElementById("wro").style.display="block"
                            
                            
                        }
                    }
                })}
            
        },1000);    
        
    }
    if (p2id != '') {
        document.getElementById(`${p2id}`).style.display ="none"
        const timer = setInterval(() => {

            timeleft--;
            if (timeleft < 0) {
              clearInterval(timer);
              ResetTimer(timer);
              console.log('Time is up!');
              displayMessage('Time is up!');
              
              document.getElementById(`${p2id}`).style.display="block"
            }
            else{
                document.getElementById("timer").innerHTML=`00:${timeleft}`}
        },1000);    
        
    }

})

function disappear(crd) {
    
      
    
    /*setInterval(count, 1000)*/
    const deck = new Deck
    deck.shuffle()
    let keycolor=fivecard.appendChild(deck.cards[0].getHTML())
    button3()
    const text = keycolor.getAttribute("data-value");
    const timer = setInterval(() => {

        timeleft--;
        if (timeleft < 0) {
          clearInterval(timer);
          ResetTimer(timer);
          console.log('Time is up!');
          displayMessage('Time is up!');
          resetAnswer()
          document.getElementById(crd).style.display="block"
        }

        else{
            document.getElementById("timer").innerHTML=`00:${timeleft}`
    
            document.addEventListener('click', function(evt) {
                let element = evt.target;
                let key = element.id
                if (text =="black"){
                    if (key == "choice2"){
                        document.getElementById("rig").style.display="block"
                         
                    }
                    else if(key == "choice3" || key =="choice1") {
                        document.getElementById("wro").style.display="block"
                        document.getElementById(crd).style.display="block"
                       
                    }
                }
                else {
                    if (key == "choice1"){
                        document.getElementById("rig").style.display="block"
                        
                    }
                    else if(key == "choice3" || key =="choice2") {
                        document.getElementById("wro").style.display="block"
                        document.getElementById(crd).style.display="block"
                        
                    }
                }
                });
        }
        socket.emit('cardpress', crd)
        socket.on('cardpress', (crd) => {
          document.getElementById(crd).style.display="none"
        })
        }, 1000);

    
}
                
            async function resetAnswer(){
                setTimeout(() => {
                    // code to exclude after 2 seconds
                    let x =4
                    x--
                  }, 1000);

                document.getElementById("rig").style.display="none"
                document.getElementById("wro").style.display="none"
                document.getElementById('message').style.display="none"   
            }
           function ResetTimer(){
            timeleft = 4;
           }
                function displayMessage(message) {
                    // Display the message
                    const messageElement = document.getElementById('message');
                    messageElement.innerText = message;
                  }         
            
        
function button1(bu1) {
    let b = bu1
    document.getElementById("choice1").innerText=b
} 
           
function button2(bu2){
    let b = bu2
    document.getElementById("choice2").innerText=b
}  

function button3(){
    const choices = [ "Black", "Brown", "Gray"]
        const randomIndexx = Math.floor(Math.random() * choices.length);
        const othchi = choices[randomIndexx];
        document.getElementById("choice3").innerText=othchi 
}

function changeButtonPosition() {
      const buttons1 = document.getElementById("choice1");
      const buttons2 = document.getElementById("choice2");
      const buttons3 = document.getElementById("choice3");

      const temp = buttons1.style.left;
      buttons1.style.left = buttons2.style.left;
      buttons2.style.left = buttons3.style.left;
      buttons3.style.left = temp;
    }  
        