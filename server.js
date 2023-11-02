const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { start } = require('repl');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

/*to import css file*/
app.use(express.static(join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'page1.html'));
})

app.get('/page1.js', function (req, res) {
	res.sendFile(join(__dirname ,'/public/scripts/page1.js'));
});

let arr=[]
let playingArray=[]


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    socket.on("find",(e)=>{

        if(e.name!=null){

            arr.push(e.name)

            if(arr.length>=2){
                let p1obj={
                    p1name:arr[0],
                    p1value:"card one",
                    p1move:"",
                    p1card:""
                }
                let p2obj={
                    p2name:arr[1],
                    p2value:"card three",
                    p2move:"",
                    p2card:""
                }

                let obj={
                    p1:p1obj,
                    p2:p2obj,
                    sum:1
                }
                playingArray.push(obj)

                arr.splice(0,2)

                io.emit("find",{allPlayers:playingArray})

            }

        }
    })

    socket.on("playing",(e)=>{
        if(e.value=="card one"){
            let objToChange=playingArray.find(obj=>obj.p1.p1name==e.name)

            objToChange.p1.p1move=e.id
            objToChange.p1.p1card=e.classes
            objToChange.sum++
        }
        else if(e.value=="card three"){
            let objToChange=playingArray.find(obj=>obj.p2.p2name==e.name)

            objToChange.p2.p2move=e.id
            objToChange.p1.p2card=e.classes
            objToChange.sum++
        }

        io.emit("playing",{allPlayers:playingArray})

    })
})
server.listen(8080, () => {
    console.log('server running at http://localhost:8080');
})