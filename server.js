var express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    mongoose = require( 'mongoose' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

require('./server/config/mongoose.js');

mongoose.Promise=global.Promise;
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

var routes_setter=require('./server/config/routes.js')
routes_setter(app);

app.use( express.static( path.join( root, './client' )));
app.use( express.static( path.join( root, './bower_components' )));

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
