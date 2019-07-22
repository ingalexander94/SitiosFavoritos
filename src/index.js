const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport');

// INICIALIZACION
const app = express();
const inicio = require('./controllers/inicioCtrl');
const authentication = require('./controllers/authenticationCtrl');
const link = require('./controllers/linksCtrl');
require('./lib/passport');

// CONFIGURACION
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/helpers')
}));
app.set('view engine', '.hbs');

// MIDDLEWARES
app.use(session({
    secret: 'clavesecreta',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// VARIABLES GLOBALES
app.use((req,res,next)=>{
    app.locals.mensaje = req.flash('mensaje');
    app.locals.error = req.flash('error');
    app.locals.usuario = req.user;
    next();
});

// RUTAS
app.use(inicio);
app.use(authentication);
app.use('/links', link);

//PUBLICO
app.use(express.static(path.join(__dirname, 'public')));

// INICIAR SERVIDOR
app.listen(app.get('port'), () => {
    console.log("Servidor creado, http://localhost:" + app.get('port'));
});
