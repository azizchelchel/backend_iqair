# backend_iqair


this script is done to accomplish this tasks

1: fetch weather data from API (iqair.com) for or a given coordinates and dispay them in console

2: fetch data from api for 'PARIS' city coordinates and load them to a database every minute

## used technology:

1:nodejs (enveronnement)

2: expressjs middleware (creation of the server)

3: mongoDB database

4: mongoose  library (handle database connection to expressjs)
 
5: cors express package to relax the security applied to an API

6:CRON to schedule tasks

## required installations: 

       npm i  express mongoose cors body-parser node-cron

note: 
      * database connection user and password are given in clear without using .env file (training database account)!

      ** the first insertion to database will be done after 60 seconds of the first execution (CRON JOB)
