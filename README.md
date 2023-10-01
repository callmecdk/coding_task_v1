To install and run the project locally, follow these steps:

1.	Download and install Node.js
https://nodejs.org/en/download

2.	Open your referred IDE. In this guide, we use Visual Studio Code. Select Source Control -> Clone Repository. Then, use these URLs to clone the repository
+ For backend repository
https://github.com/callmecdk/weather_json_endpoint.git 

+ For frontend repository
https://github.com/callmecdk/coding_task_v1.git 

3.	Running the backend:
Once we finish cloning the repository, we should have two projects windows (json_endpoint and coding_task_v1). Firstly, the backend server needs to operate in order to allow the JSON API exposing the weather data. 

Run the server.js file in the json_endpoint project window with this following command. Please note, this is an important step. 

npm start

Access the json api endpoint at this address:
http://localhost:5000/api/weather 

4.	Running the frontend:
Run the app.js file in the coding_task_v1 project window with this following command

npm start

Access the weather web application at this address
http://localhost:3000 
