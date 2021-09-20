# Image-Repository

*****INSTRUCTION OF USE************

This is a simple image repository, that uses the following technology

1) MongoDB 


2) JavaScript


3) Nodejs/Express and its dependencies


4) HTML and CSS


To use this app, you are required to set up mongoDB clusters. A handy tutorial can be found online


Once that is done, note your connection string.


Head over to clone this repository, CD into the directory and run "npm install"


This would instead all packages used for the app.


Go the server directory and locate db.js file, which is found in a sub folder of the directory titled 'model'


Replace the url with your MongoDB connection string copied previously.


In the server.js file located in the root directory, ensure to set your port with which the server would 
listen to either in a dotenv file or replace the '3000' with an interger 3000 see below:


const port = process.env.PORT || '3000' --> const port = process.env.PORT || 3000


Start the server by running, "npm start"

Follow the link printed on your console to access the dashboard.

You can begin to upload as many pictures as you please.

Only Admin have the privilege right to delete or modify any picture uploaded!


Happy Hacking....
