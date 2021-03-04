# Desciption
this project was created in order to be the backend of my personal website / blog.
https://welitonsousa.vercel.app

# Getting Started with fire functions

1 - run 'npm install' or 'yarn install'
2 - log in to firebase using the command 'firebase login'
3 - create a file auth.json with a object {"token":"your token for create new posts"}
4 - in your firebase project, generate your key, rename it to "firebase-key.json" and move it to the functions folder

# Starting a project
1 - in the project's root folder, run the command "firebase emulators: start"
2 - ready, your project is running on your localhost

# Don't forget to define all your routes as public in this project
1 - In your Google Cloud account, go to Cloud Functions
2 - click on the route you want to make public (in the case of this project, you will repeat this step on all routes)
3 - click permissions
4 - add
5 - in the new member field, type allUsers
6 - In the paper field, select the cloud functions caller option

# build aplication
run 'firebase deploy'