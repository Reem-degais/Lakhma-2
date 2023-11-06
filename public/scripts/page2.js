
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
        
        document.getElementById("page1").style.display="none"
        document.getElementById("page2").style.display="block"
        document.getElementById("rig").style.display="none"
        document.getElementById("wro").style.display="none"
        
        let oppName
        let value
        const foundObject = allPlayersArray.find(obj => obj.p1.p1name == `${myname}` || obj.p2.p2name == `${myname}`);
        foundObject.p1.p1name == `${myname}` ? oppName = foundObject.p2.p2name : oppName = foundObject.p1.p1name
        foundObject.p1.p1name == `${myname}` ? value = foundObject.p1.p1value : value = foundObject.p2.p2value
        document.getElementById("opp").innerText = oppName
        document.getElementById("whosTurn").innerText = foundObject.p1.p1name
        
      })

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
let keys = ""
let text =""
document.querySelectorAll(".card").forEach(e=>{
    e.addEventListener("click", function () {
        let value = this.className
        const deck = new Deck
        deck.shuffle()
        let keycolor=fivecard.appendChild(deck.cards[0].getHTML())
        button3()
        text = keycolor.getAttribute("data-value");
        socket.emit("playing", {value: value, id: e.id, name: myname})

    })})

        document.querySelectorAll(".choice").forEach(e=>{
        e.addEventListener('click', function() {
            keys = this.id
            console.log(keys)
        socket.emit("choosing", { keys: keys} )})})
   
    socket.on("playing", (e) => {
        
        const foundObject = (e.allPlayers).find(obj => obj.p1.p1name == `${myname}` || obj.p2.p2name == `${myname}`);

    p1id = foundObject.p1.p1move
    p2id = foundObject.p2.p2move
    turn1 = foundObject.p1.p1name
    turn2 = foundObject.p2.p2name

    /*exchage turns*/
    if ((foundObject.sum) % 2 == 0) {
        document.getElementById("whosTurn").innerText = turn2 + "'s turn"
    }
    else {
        document.getElementById("whosTurn").innerText = turn1 + "'s turn"
    }

    if (p1id != '') {
        document.getElementById(`${p1id}`).style.display ="none"
        let sco1=5
        const timer = setInterval(() => {
            timeleft--;
            if (timeleft < 0) {
              clearInterval(timer);
              ResetTimer();
              console.log(timeleft)
              console.log('Time is up!');
              displayMessage('Time is up!');
              
              document.getElementById(`${p1id}`).style.display="block" 
            }
            else{
                document.getElementById("timer").innerHTML=`00:${timeleft}`
                 if(keys!=""){
                    clearInterval(timer);
                    ResetTimer();
                    console.log(keys)
                    if(text=="black"){
                        if(keys=="choice2"){
                            document.getElementById(keys).style.backgroundColor="green" 
                            sco1--
                        }
                        else if(keys=="choice1" || keys=="choice3"){
                            document.getElementById(keys).style.backgroundColor="red"
                        }

                    }
                    else{
                        if(keys=="choice1"){
                            document.getElementById(keys).style.backgroundColor="green"
                            sco1-- 
                        }
                        else if(keys=="choice2" || keys=="choice3"){
                            document.getElementById(keys).style.backgroundColor="red"
                           
                        }
                    }
                    
                    
                 }

            }
            console.log(sco1)
            keys=""
        },1000)
      
    }

    if (p2id != '') {
        document.getElementById(`${p2id}`).style.display ="none"
        const timer = setInterval(() => {
            timeleft--;
            if (timeleft < 0) {
              clearInterval(timer);
              ResetTimer();
              console.log(timeleft)
              console.log('Time is up!');
              displayMessage('Time is up!');
              document.getElementById(`${p2id}`).style.display="block"
              
            }
            else{
                document.getElementById("timer").innerHTML=`00:${timeleft}`
                if(keys!=""){
                    clearInterval(timer);
                    ResetTimer();
                    console.log(keys)
                    if(text=="black"){
                        if(keys=="choice2"){
                            document.getElementById(keys).style.backgroundColor="green" 
                        }
                        else if(keys=="choice1" || keys=="choice3"){
                            document.getElementById(keys).style.backgroundColor="red"
                        }
                    }
                    
                 }
                 else{
                    if(keys=="choice1"){
                        document.getElementById(keys).style.backgroundColor="green" 
                    }
                    else if(keys=="choice2" || keys=="choice3"){
                        document.getElementById(keys).style.backgroundColor="red"
                    }
                }
            }
            keys=""
        },1000)
        
    }
    })

    socket.on("choosing", (e)=>{
        keys= e.key
        console.log(keys)
    })

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
    
    function ResetTimer(){
        timeleft = 4;
        return timeleft
       }
            function displayMessage(message) {
                // Display the message
                const messageElement = document.getElementById('message');
                messageElement.innerText = message;
              }         

   
    