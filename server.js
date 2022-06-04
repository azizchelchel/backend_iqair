const express=require('express');

require('dotenv').config();

const mongoose= require("mongoose");


const cors=require('cors');

const bodyParser=require('body-parser');

const fetch=require('node-fetch') //npm install node-fetch


const PORT=5000;

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(cors({
    origin:/http:\/\/localhost/
}));

app.options('*',cors());
 


app.post('/', (req,res) => { 
            
    res.status(200).json('hello from home');
});







let key='282c5c6f-806f-49bb-9b84-16a85f343b49';     //api.airvisual.com key

const uri= 'mongodb+srv://iqairUser:iqairPass@iqair.miw63.mongodb.net/?retryWrites=true&w=majority'

// connecting to mongoDB  atlas

// for local database testing use 'mongodb://localhost:27017' instead of the used uri value


mongoose.connect(uri) 

.then(()=>{
    console.log("connected to mongoDB")
})
.catch(err=>{
    console.error(err)
})



//creating schema for the api output 'weatherSchema'

const weatherSchema=new mongoose.Schema(
  {
    dateInfo:{
      type:Date,
      required:false
    },

    ts:{
      type:String,
      required:false
    },

    aqius:{
      type:String,
      required:false
    }
    ,
    mainus:{
      type:String,
      required:false
    },

    aqicn:{
      type:String,
      required:false
    },
    
    maincn:{
      type:String,
      required:false
    }

  }
)

// create model for weatherSchema

const weatherModel= mongoose.model('weatherModel', weatherSchema);



// fetching data from IQAIR API and inserting it into DaataBase Atas


// let lat,lon;



const fetchAndInsertData= async(lat,lon)=>{

  await fetch(`http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${key}`)

  .then(res => res.json())

  .then(json => {
      
    
      const result=json.data.current.pollution

      console.log(result);
    

          // create model instance 'new_weather'

          const new_weather=new weatherModel({

            dateInfo:Date.now(),

            ts:result.ts,

            aqius:result.aqius,

            mainus:result.mainus,

            aqicn:result.aqicn,
      
            mainc:result.maincn
          });

          // insert model in DataBase

          new_weather.save().then(doc=>{

          console.log(doc)

          })

          .catch(err=>{

              throw err

          })

    })
    .catch(err => console.error(err));


}



// displaying Paris pollution every minute

var cron = require('node-cron');

cron.schedule('* * * * *', () => {
  fetchAndInsertData(48.856613,2.352222);  //paris coordinates

});



app.listen(PORT, (err) => { 
    
        
        if (err) {

            console.error("error");

            
        } else {
            console.log(`server running on http://localhost:${PORT}`)
        }

        

 })