
const socket = io();
            
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
            
            socket.on("game", (e) =>{
            document.getElementById("usercont").style.display="none"
            
            })

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

function disappear(crd) {
    /*document.getElementById(crd).style.display="none"*/
    socket.emit('card-clicked', crd);
    socket.on('card-disappeared', (cardId) => {
        const card = document.getElementById(cardId);
        card.style.display = 'none';
      
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
                clearInterval(timer);
                ResetTimer(timer);
                if (text =="black"){
                    if (key == "choice2"){
                        document.getElementById("rig").style.display="block"
                        resetAnswer() 
                    }
                    if(key == "choice3" || key =="choice1") {
                        document.getElementById("wro").style.display="block"
                        document.getElementById(crd).style.display="block"
                        resetAnswer()
                    }
                }
                else {
                    if (key == "choice1"){
                        document.getElementById("rig").style.display="block"
                        resetAnswer()
                    }
                    if(key == "choice3" || key =="choice2") {
                        document.getElementById("wro").style.display="block"
                        document.getElementById(crd).style.display="block"
                        resetAnswer()
                    }
                }
                });
        }
        
        }, 1000);
    })
}
                
   /* const deck = new Deck
    deck.shuffle()
    let keycolor=fivecard.appendChild(deck.cards[0].getHTML())
    button3()           
    const text = keycolor.getAttribute("data-value");  
                  
                document.addEventListener('click', function(evt) {
                let element = evt.target;
                let key = element.id
                if (text =="black"){
                    if (key == "choice2"){
                        document.getElementById("rig").style.display="block" 
                    }
                    if(key == "choice3" || key =="choice1") {
                        document.getElementById("wro").style.display="block"
                    }
                }
                else {
                    if (key == "choice1"){
                        document.getElementById("rig").style.display="block"
                    }
                    if(key == "choice3" || key =="choice2") {
                        document.getElementById("wro").style.display="block"
                    }
                }
                }); 

                
                }*/
            
            async function resetAnswer(){
                setTimeout(() => {
                    // code to exclude after 2 seconds
                  }, 2000);

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
    
    