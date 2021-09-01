const request = require('request')

const forecast =(latitude,longitude , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=702f8141be14517106b2b042822c4a8c&query='+ latitude + ',' + longitude +'&units=m'

    request({ url ,json:true}, (error, {body }) => {
        if(error){
            callback('Unable to connect to weathr service!',undefined)
        }else if(body.error){
        callback("Unable to find location",undefined)
        }
        
        else{
         callback(undefined,' it is currently '+ body.current.temperature + ' degree out.There is a ' + body.current.precip + ' % chance of rain.')
        }
    }) 
}
module.exports =forecast