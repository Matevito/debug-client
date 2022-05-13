# Tickets!
Web app that handles a basic ticket-system thinked to be used as a kind of cronogram for developer groups. You can find the rest-api used to feed this app [here](https://github.com/Matevito/debug-api). It uses authentication with roles for protection and conditional rendering of different pages, and also let users according to it's role to edit or delete tickets or projects where these are stored.
Is built principally with React.js and with MUI. It has too muiltiple demo access with different roles to give it a look without the need to create an account.
# Live demo
Give it a look on this [link](https://matevito.github.io/debug-client/)
# Technologies
- React.js
- Javascript
-  HTML
-  CSS
-  [MUI](https://mui.com/)
-  Redux
-  [Victory](https://formidable.com/open-source/victory/)
-  Axios

# Installation
Be sure that you already own Node.js and git on your computer. Then go to your terminal and do the following:
1. Clone this repo

        git clone hhttps://github.com/Matevito/debug-client
    
2. Enter the app folder
    
        cd /debug-client

3. Install the npm packages of the app

        npm install
        
4. Set up the url of your rest-api
On the folder /src/features/ open the file api.js. Then setup the baseURL value of the *baseURL* variable on the axios component to where the rest-api you think to use as a backend is deployed

        const axios = require("axios")
        
        const api = axios.create({
            baseURL: <string with the url of the rest api>
            timeout: <integer value with the time your app expects to wait for a call>
        })
        
        export default api;

5. Build the distribution files

        npm run build
 
 6. Runt the test-suite to check eveything is running correctly
 
        npm run test

be sure that on the displayed console on your terminal select the option to run all the ".test.js" files on the app folder.

7. Start the app locally

        npm start
# Features
- Creation of accounts and login form with demo acconts accessible with the touch of a button.
- Authentication using JWT tokens.
-  Roles authentication that gives the app the possibility of conditional rendering according the user status.
-  Forms to create and edit project and ticket objects on db.
-  Display on the home  route some basic info about the user status and its related data (tickets taken and projects is part of and some more).
-  Basic graphics with info about the tickets status.
-  Admin able to delete all kind of data on the app.
-  Take or leave a ticket with just one click.
-  Visible changelog history of a ticket display on its main page.
-  Upload images to tickets or as comments on the app db.
-  Communicate with your teamates wroking on an issue on a chat displayed on the ticket page.
-  Links on the displayed user names to a page that display some basic info about them and their correspongin email to communicate with them!
- And some more!
# Contact
You can find me easily writing me an email to madiazt@unal.edu.co or sending me a message to my [git-hub account](https://github.com/Matevito).