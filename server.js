var express = require('express');
var app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
var path = require('path');
app.set('views', './views')
app.set('view engine', 'ejs')
const Detail=require('./models/detail')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var n=null;


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(()=>{
		console.log("connection open!!")
	})


const spawn = require("child_process").spawn;

const pythonProcess = spawn('python',["technology.py"]);
pythonProcess.stdout.on('data',(data) => {

	mystr = data.toString();
	tech_json = JSON.parse(mystr);
	console.log(tech_json.articles[0]);
	console.log('t');
});

const pythonProcess6 = spawn('python',["entertainment.py"]);
pythonProcess6.stdout.on('data',(data) => {

	mystr = data.toString();
	et_json = JSON.parse(mystr);
	console.log(et_json.articles[0]);
	console.log('et');

});

const pythonProcess1 = spawn('python',["science.py"]);
pythonProcess1.stdout.on('data',(data) => {

	mystr = data.toString();
	sci_json = JSON.parse(mystr);
	// console.log(sci_json.articles[0]);
	console.log('sci');

});

const pythonProcess2 = spawn('python',["health.py"]);
pythonProcess2.stdout.on('data',(data) => {

	mystr = data.toString();
	health_json = JSON.parse(mystr);
	console.log(health_json.articles[0]);
	console.log('h');

});

const pythonProcess3 = spawn('python',["general.py"]);
pythonProcess3.stdout.on('data',(data) => {

	mystr = data.toString();
	gen_json = JSON.parse(mystr);
	console.log(gen_json.articles[0]);
	console.log('g');

});

const pythonProcess4 = spawn('python',["sports.py"]);
pythonProcess4.stdout.on('data',(data) => {

	mystr = data.toString();
	spt_json = JSON.parse(mystr);
	console.log(spt_json.articles[0]);
	console.log('sp');

});

const pythonProcess5 = spawn('python',["business.py"]);
pythonProcess5.stdout.on('data',(data) => {

	mystr = data.toString();
	bsn_json = JSON.parse(mystr);
	console.log(bsn_json.articles[0]);
	console.log('b');

});


app.get('/feed/login',function(req,res){
	res.redirect('login');
});

app.get('/login',function(req,res){
	res.render('login.ejs');
});

app.post('/login', async (req,res)=>{
	Detail.find({username:req.body.username, password: req.body.password}).then(d=>{
		console.log(d.length)
		if(d.length!=0){
			console.log("Found")
			n=req.body.username;
			// res.redirect('feed');
			var string = encodeURIComponent(req.body.username);
			res.redirect('feed/?username=' + string)
		}	
		else{
			console.log("Not found")
			// const hashedPassword = await bcrypt.hash(req.body.password[0], 10)
			// const nDetail=new Detail({username:req.body.username,password:req.body.password})
			// nDetail.save()
			res.render('login.ejs',{message:'No match found'})
		}
	})
});

app.get('/signup',function(req,res){
	res.render('signup.ejs');
});

app.post('/signup', async (req,res)=>{
	Detail.find({username:req.body.username}).then(d=>{
		console.log(d.length)
		if(d.length!=0){
			console.log("not unique value")
			res.render('signup.ejs',{message:'Already exists'})
		}	
		else{
			console.log("unique value")
			n=req.body.username;
			const nDetail=new Detail({username:req.body.username,password:req.body.password[0]})
			nDetail.save().then(n=>{
				console.log('added ',n)
				var string = encodeURIComponent(nDetail.username);
				res.redirect('feed/?username=' + string)
			})
			
		}
	})
});

app.put('/feed/:username/:category', async (req,res)=>{
	username=req.params.username;
	category=req.params.category;
	console.log(username,category);

	if (category=='business'){
	Detail.updateOne({username:username}, {$inc: {business:1}},function(err, res){
		if (err) throw err;
		console.log("1 document updated");
	});
	}
	if (category=='technology'){
	Detail.updateOne({username:username}, {$inc: {technology:1}},function(err, res){
		if (err) throw err;
		console.log("1 document updated");
	});
	}
	if (category=='health'){
	Detail.updateOne({username:username}, {$inc: {health:1}},function(err, res){
		if (err) throw err;
		console.log("1 document updated");
	});
	}
	if (category=='science'){
	Detail.updateOne({username:username}, {$inc: {science:1}},function(err, res){
		if (err) throw err;
		console.log("1 document updated");
	});
	}
	if (category=='sport'){
	Detail.updateOne({username:username}, {$inc: {sport:1}},function(err, res){
		if (err) throw err;
		console.log("1 document updated");
	});
	}
	if (category=='entertainment'){
	Detail.updateOne({username:username}, {$inc: {entertainment:1}},function(err, res){
		if (err) throw err;
		console.log("1 document updated");
	});
	}

	// Detail.find({username:username}).then(d=>{
	// 	d.business=d.business+1;
	// 	d.save();
	// })


	res.send("done");
})


app.get('/feed',function(req,res){
	var username = req.query.username;
	res.render('feed.ejs',{username: username, sci: sci_json,et: et_json,spt: spt_json,gen: gen_json,tech: tech_json,health: health_json,bsn: bsn_json});

});



app.get('/analysis',async function(req,res){

	await Detail.find({username:n}).then(d=>{
		// console.log(d);
		// console.log(d[0]["business"]);

		// d=JSON.parse('"'+D+'"')
		sci=d[0]["science"];
		et=d[0]["entertainment"];
		spt=d[0]["sport"];
		tech=d[0]["technology"];
		health=d[0]["health"];
		bsn=d[0]["business"];
		console.log("Name is ",n);

		res.render('analysis',{username: n, sci: sci,et: et,spt: spt,tech: tech,health: health,bsn: bsn})
	})

});

app.post('/feed', urlencodedParser ,function(req,res){
	const pythonProcess9 = spawn('python',["getting_feed.py"]);
    pythonProcess9.stdout.on('data',(data) => {

	mystr = data.toString();
	search_json = JSON.parse(mystr);
	console.log(search_json.articles[0]);
	console.log('b');

});
    res.render('feed_search',{data: search_json});
});

const rooms = { }
 
app.get('/', (req, res) => {
  res.render('index', { rooms: rooms })
})

app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  rooms[req.body.room] = { users: {} }
  res.redirect(req.body.room)
  // Send message that new room was created
  io.emit('room-created', req.body.room)
})

app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }
  res.render('room', { roomName: req.params.room })
})

server.listen(3000)

io.on('connection', socket => {
  socket.on('new-user', (room, name) => {
    socket.join(room)
    rooms[room].users[socket.id] = name
    socket.to(room).broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (room, message) => {
    socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  })
  socket.on('disconnect', () => {
    getUserRooms(socket).forEach(room => {
      socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
      delete rooms[room].users[socket.id]
    })
  })
})

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name)
    return names
  }, [])
}
console.log('Now you are listening to port 3000');
