# BrokersIsland
BrokersIsland is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.  It serves as a platform to facilitate easy communication and access for users looking to connect with brokers offering the standardized brokerage rates for all.
Table of Contents
1. Features
2. Getting Started
3. Prerequisites
4. Installation
5. Usage

FEATURES
User Authentication: BrokersIsland provides user-friendly sign-in pages for both users and brokers. It also includes session management to enhance the overall user experience, ensuring seamless navigation throughout the platform.

Interest-Based Communication: Users have the flexibility to select the properties or sites they are interested in. Brokers are then notified of these interests, allowing them to initiate contact with users who have shown interest in their property listings.

Broker Access to User Details: Brokers can view a list of users who have expressed interest in their properties. They have the ability to access contact details for these users, streamlining the communication process and fostering efficient interactions.

Easy Broker Onboarding: BrokersIsland offers an opportunity for individuals to become brokers without the need for a brokerage license. This inclusive approach opens doors for anyone interested in the real estate industry.

Standardized Brokerage Income: The platform charges brokers a nominal 5% fee of the sale price while ensuring they receive standardized brokerage income. This fair model benefits both brokers and users by maintaining transparency and consistency in earnings.

GETTING STARTED
To get started with BrokersIsland, follow these steps:

Prerequisites
1. Node.js: BrokersIsland is built using Node.js for both the frontend and backend. You can download it from nodejs.org.

2. npm (Node Package Manager): npm is bundled with Node.js. You'll need it to manage project dependencies.

3. React: BrokersIsland's frontend is built with React.js, a popular JavaScript library for building user interfaces. You can learn more and get started with React at reactjs.org.

4. Express: The backend of BrokersIsland is powered by Express.js, a minimal and flexible Node.js web application framework. You can find more information on Express at expressjs.com.

5. IDE (Integrated Development Environment): You'll need an IDE or code editor of your choice to work on and run the project. Popular options include Visual Studio Code, WebStorm, and Atom.

INSTALLATION
1. Clone the repository:
```git clone https://github.com/alanstan08/BrokersIsland.git```
2. Navigate to the project directory:
  ```cd BrokersIsland```
3. Install server dependencies
  ```cd backend/```
  ```npm install```
4. install client dependencies
  ```cd client```
 ``` npm install```
5. Create a .env file in the server directory and set environment variables (e.g., database connection string, API keys):
  ```PORT=4000```
  ```MONGO_URI=ur database url```
  SECRET_KEY=any secret key```
6. ```
   start client
   cd client/
   npm start
   ```
7. start server
    ```
    cd backend/
   npm start
    ```
USAGE
1. add a few properties in the database following the properties model schema as seen in the models folder
2. create a user and login. the user page should look like this: 
![image](https://github.com/alanstan08/BrokersIsland/assets/67495993/40ed4b9d-2291-4726-a357-ec1fab36c692)
3. create a broker and login, the broker dashboard should look like this: 
![image](https://github.com/alanstan08/BrokersIsland/assets/67495993/762dcc39-f871-4ce6-82b1-2764d12b9eef)

 


