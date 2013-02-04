var mini_server = {
  init: function(){
    //Config
    global.port = 3000;

    //Dependencies
    global.express        = require('express');
    global.routes         = require('./routes');
    global.http           = require('http');
    global.path           = require('path');
    global.engine         = require('ejs-locals');
    global.helpers        = require('express-helpers');
    global.ejs            = require('ejs');
    global.nib            = require('nib');
    global.connect_assets = require('connect-assets')

    global.app = express();

    //run middleware
    helpers(app);
    //run express with ejs support
    app.engine('ejs', engine);
    //custom ejs parser
    ejs.open  = '<?';
    ejs.close = '?>';

    //espress conficure app
    app.configure( this.configureApp );

    app.get('/', routes.index);

    http.createServer(app).listen(port, function(){
      console.log("Express server listening on port " + port);
    });

  },

  configureApp: function(){
    //run middleware
    app.set('port', this.port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    
    // app.use(express.static(path.join(__dirname, 'public'))); //example
    app.use('/img', express.static(__dirname + '/assets/img'));

    app.use(app.router);
    app.use(connect_assets());

  }
};

mini_server.init();