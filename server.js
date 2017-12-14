//Dependencies
const express         = require ( 'express' );
const moment          = require ( 'moment' );
const mongoose        = require ( 'mongoose' );
const morgan          = require ( 'morgan' );
const app             = express();
const db              = mongoose.connection;
require( 'pretty-error' ).start();

//Environment Variables
const mongoURI        = process.env.MONGODB_URI || 'mongodb://localhost/donuts_app';
const PORT            = process.env.PORT || 3003;

//Set mongoose Promise Library
mongoose.Promise      = global.Promise;

// Connect to Mongo
mongoose.connect ( mongoURI , { useMongoClient: true});

// Error / success
db.on( 'error', ( err ) => console.log( err.message + ' is Mongod not running?' ));
db.on( 'connected', () => console.log( 'mongo connected: ', mongoURI ));
db.on( 'disconnected', () => console.log( 'mongo disconnected' ));

// Open the connection to mongo
db.on( 'open' , ()=>{});

// Middleware
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON

// Use morgan
app.use ( morgan ( 'tiny' ) );

app.use( express.static( 'public' ));


//Routes
const donutsController = require( './controllers/donutsController.js' );
app.use ( '/donuts' , donutsController );

app.listen( PORT , () =>{
  console.log( moment().format('MMMM Do YYYY, h:mm:ss a') , '🎉' , 'celebrations happening on port' , PORT);
});
