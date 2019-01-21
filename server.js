const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;
var app=express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getfullyear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method}${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err)=>{
    if(err){
      console.log('unable to append to server.log');
}

  });
  next();
});
/*app.use((req,res,nex)=>{
  res.render('maintanace.hbs');
});*/
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
  //res.send('hello world');
  res.render('home.hbs',{
    pagetitle:'home page',
    welcomemessage:'welcome to my page'


  });
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pagetitle:'about page'

  });
});

app.get('/project',(req,res)=>{
  res.render('project.hbs',{
    pagetitle:'project page'

  });
});
app.listen(port,()=>{
  console.log(`sever is upon port ${port}`);
});
