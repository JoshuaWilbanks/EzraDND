EzraDND is a simple website builder I developed for my brother.  
Using a C# API and a SQL Database, administrators are able to create, update, and delete various aspects of the website.  
With a built in text editor, adminstrators are able to update all page text.  
Administrators are identified based on their google login credentials.  

To run:  
1 - Restore the EzraDB SQLServer Database from the back up file.  
2 - Update the database connection string located in EzraDND/appsettings.json  
3 - Open and run the .NET API project under the EzraDND folder.  
4 - Open the React.js project under react-app-classic and issue the command "npm install" to install all necissary packages.  
5 - In the React.js project, issue the command "npm start" to launch the website.  
