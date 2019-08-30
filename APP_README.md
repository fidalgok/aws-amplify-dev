# Instructions for AWS integration

## Initialize React App

The first thing to do is use ```npx create-react-app``` to initialize an empty react app. This is where the logic for the front-end of the app will go. In this example todo app it's a very simple implementation of keeping track of todos.

Once the app is setup the next step is to get the backend configured.

## Initialize the AWS environment

With the react shell setup it's time to run ```amplify init```. This will configure the setup for the aws backend. It's how your app is able to talk to the amplify console and push changes as well as deploy your app from the cli tool.

The next step is to add some backend services like authentication, graphql api, serverless functions, etc.

### Add Authentication

run ```amplify add auth``` accept the default configuration and then run ```amplify push``` to push your changes to the aws console.

auth has been very hard for me to implement. The docs aren't exactly clear what to do or when to do it if you decide to deviate from the provided UI. I decided to follow a slew of tutorials and github examples until I landed on one solution that I liked. Now that I'm able to log in. Time to add an api

### Add API

I'm choosing to go with a graphql api to explore it's possibilites and ease of use when asking for and updating data. This app will have a todo's api