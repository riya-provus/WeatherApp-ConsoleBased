console.log("Weather Application");
require('dotenv').config();

const APIKEY = process.env.APIKEY;


const { stdin, stdout } = require("process");
const readings=require("readline");

const r1=readings.createInterface({
    input:stdin,
    output:stdout
})
const mapdata={
        "1":"current",
        "2":"forecast",
        "3":"history",
        "4":"alerts",
        "5":"future"
}
function displayCurrent(data) {
    const { name, country } = data.location;
    const { temp_c, humidity } = data.current;
    console.log("\n****** CURRENT WEATHER Details *****");
    console.log(`City Name      : ${name}, ${country}`);
    console.log(`Temperature of city: ${temp_c}°C`);
    console.log(`Humidity   : ${humidity}%`);
}

function forecastdisplay(data) {
    console.log("\n*** FORECAST ***");
    data.forecast.forecastday.forEach(single => {
        console.log(`${single.date} -> ${single.day.avgtemp_c}°C -> ${single.day.condition.text}`);
    });
}

function displayHistory(data) {
    console.log("\n*** HISTORY ***");
    if(data.error){
        console.log(data.error.message);
        return;        
    }
    data.forecast.forecastday.map(single => {
        console.log(`${single.date} -> Avg Temp: ${single.day.avgtemp_c}°C -> Overall Summary :${single.day.condition.text}`);
    });
}

function FutureDisplay(data) {
    console.log("\n*** Future ***");
    if(data.error){
        console.log("Error occured : "+data.error.message);
        return;                                    
    }
    data.forecast.forecastday.map(single => {
        console.log(`${single.date} -> Avg Temp: ${single.day.avgtemp_c}°C -> Predictions is ${single.day.condition.text}`);
    });
}

function displayalerts(data){
    console.log("****** Alerts ******");
    if(data.alerts.alert.length<1){
        console.log("No alerts currently");        
    }
    else{
        const {headlines,severity}=data.alerts.alert;
        console.log(`Headline: ${headlines}`);
        console.log(`Severity: ${severity}`);        
    }    
}

async function choices(choice,data){
        if(choice=="current"){
            displayCurrent(data);
        }else if(choice=="alerts"){
            displayalerts(data);
        }else if(choice=="forecast"){
            forecastdisplay(data);
        }else if(choice=="history"){
            displayHistory(data);
        }else if(choice=="future"){
            FutureDisplay(data);
        }
}

async function askquestion(que) {
    return new Promise((resolve,reject)=>{
        r1.question(que, async function getanswer(answer){
            if(answer==""){
                reject("Input is needed");                
            }
            resolve(answer);
        });
    })
}

async function History_Api(getdomain,city){
    const dateinfo=await askquestion("Enter the date in format (YYYY-MM-DD) :");
    const APIwithDate=`https://api.weatherapi.com/v1/${getdomain}.json?key=${APIKEY}&q=${city}&dt=${dateinfo}`;
    const DateBased=await fetch(APIwithDate);
    const historydata=await DateBased.json();
    await choices(getdomain,historydata);
}

async function Forecast_Api(getdomain,city){
    const days=await askquestion("Enter the number of days :");
    const APIwithDay=`https://api.weatherapi.com/v1/${getdomain}.json?key=${APIKEY}&q=${city}&days=${days}`;
    const daybased=await fetch(APIwithDay);
    const forecastdata=await daybased.json();
    await choices(getdomain,forecastdata);
}

async function Alerts_Api(getdomain,city){
    const APIwithoutDate=`https://api.weatherapi.com/v1/${getdomain}.json?key=${APIKEY}&q=${city}`;
    const DomainBased=await fetch(APIwithoutDate);
    const alertdata=await DomainBased.json();
    await choices(getdomain,alertdata);
}

async function Current_Api(getdomain,city){
    const APIwithoutDate=`https://api.weatherapi.com/v1/${getdomain}.json?key=${APIKEY}&q=${city}`;
    const DomainBased=await fetch(APIwithoutDate);
    const currentdata=await DomainBased.json();
    await choices(getdomain,currentdata);
}

async function Future_Api(getdomain,city){
    const dateinfo=await askquestion("Enter the date in format (YYYY-MM-DD) :");
    const APIwithDate=`https://api.weatherapi.com/v1/${getdomain}.json?key=${APIKEY}&q=${city}&dt=${dateinfo}`;
    const DateBased=await fetch(APIwithDate);
    const futuredata=await DateBased.json();
    await choices(getdomain,futuredata);
}
async function getdata(domain){
        try{
            if(!mapdata[domain]) {
                console.log("No domain exist");                
                return;
            }
            let getdomain=mapdata[domain];
            const city=await askquestion("Enter the city name ");
            if(!city) {
                console.log("City name is mandatory");                
                return;
            }
            switch(getdomain){
                case "history":
                    await History_Api(getdomain,city);
                    break;
                case "future":
                    await Future_Api(getdomain,city);
                    break;
                case "forecast":
                    await Forecast_Api(getdomain,city);
                    break;
                case "current":
                    await Current_Api(getdomain,city);
                    break;
                case "alerts":
                    await Alerts_Api(getdomain,city);
                    break;
                default:
                    console.log("No choice exist");
                    break;            
            }
        }catch(err){
            console.log(err);            
        }
}

async function start() {  
    let ch;  
    do{
        console.log("Enter the domain to get the info(Choice number)");
        console.log("1.Current weather\n2.Forecast\n3.History\n4.Alerts\n5.Future");
        try{
            const domain=await askquestion("Enter your domain choice");
            await getdata(domain);       
        }catch(err){
            console.log(err);        
        }      
        ch=await askquestion("Do u want to continue ? (y or n)");
    }while(ch!="n");
    console.log("Application ended successfully");        
    r1.close();
}

start();
