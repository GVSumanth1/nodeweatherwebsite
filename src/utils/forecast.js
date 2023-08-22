const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url=''+latitude+','+longitude+'&units=f'//from documentation for units
    request({url,json:true},(error,{body})=>{//destructure response
        if(error){
            callback('unable to connecy',undefined)
        }else if(body.error){
            callback('unable to find',undefined)
        }else{
            callback(undefined,'.......')
        }
    })

}

module.export=forecast