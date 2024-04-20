
## Agricultural Web Application Built with MERN


## Features

- Add/Delete Products
- Edit Profile
- Add/Edit Address
- Rent Machines based on Hours, Days, and Weeks
- Consumer
- Payapal Gateway
- Cart Page
- Change Quantity
- Remove Product from Cart Page
and much more

## Usage

### ES Modules in Node

Used ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
## If you find error related to fs,os or path error :
### Paste the following code in the file after your npm install in frontend folder : Farm-Equipment-Rental-System\frontend\node_modules\react-scripts\config\webpack.config.js

Code snippet : at 97 line 
```
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    // Other rules...
    plugins: [
        new NodePolyfillPlugin()
    ]
}

// webpack.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {

  plugins: [
    new Dotenv()
  ]
};
```
Code snippet : at 351 line 
```
fallback: {
        "fs": false,
        "os": false,
        "path": false
        },

```

### Error Invalid options object.
[Link](https://stackoverflow.com/questions/70374005/invalid-options-object-dev-server-has-been-initialized-using-an-options-object)

### Module not found: Error: Can't resolve 'crypto'
npm install crypto-browserify

Paste the following code in the file after your npm install in the frontend folder: Farm-Equipment-Rental-System\frontend\node_modules\react-scripts\config\webpack.config.js
```
  "browser": {
        "crypto": false,
        "stream": false
    }
```

### Install Redux Extension
[link](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
