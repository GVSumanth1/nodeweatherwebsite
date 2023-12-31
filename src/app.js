const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app = express()
const port=process.env.PORT || 3000
// env is an object from where we can access enviroment variables


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){ 
        return  res.send({
            error:'you must provide address'
        })
    }

    //set some dafult value to not destructure undefined values
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'snow',
    //     location:'india',
    //     address:req.query.address
    // })
})


app.get('/products',(req,res)=>{

    if(!req.query.search){
        //sending back json   
        return  res.send({
            error:'you must provide a search term'
        })
    }

    console.log(req.query.search)//to grab value of search
    res.send({
        products:[] 
    })
})

//anything that is not mentioned
//and need to be mentioned below all as it searches from top to bottom in this file lines order
//express provided wildcard character for the purpose
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'andrew',
        errorMessage:'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'andrew',
        errorMessage:'Page not found'
    })

})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

//heroku provides port value