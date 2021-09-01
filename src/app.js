const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

console.log(__dirname)
console.log(__filename)

const app = express()

// Define Path For Express Config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialPath = path.join(__dirname,'../src/templates/partials')

//Setup Handlebars Engin and views
app.set('view engine' ,'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{

        title:'weather App',
        name:'Rajan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'RAJAN'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'RAJAN'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a Address'
        })
    }
    console.log(req.query.address)
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return  res.send({error})
          }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return  res.send({error})
          }
          res.send({
              forecast: forecastData,
              location,
              address: req.query.address
          })
    }) 
    })
   
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Rajan',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Rajan',
        errorMessage:'page not found'
    })
})

app.listen(3000 || process.env.PORT , ()=>{
    console.log('Server is up on port 300')
})