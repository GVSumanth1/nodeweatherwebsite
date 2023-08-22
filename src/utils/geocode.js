const request=require('request')

const geocode=(address,callback)=>{
    const url='njknjn'+address+'jhggv'
     
    request({url,json:true},(error,{body} )=>{//destructure response
        if(error){
            callback('Unable to connect',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location.try another seardch',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name

            })
        }
    })


}

module.export= geocode
