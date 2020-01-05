const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

let cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders:['X-App-Version'],
    exposeHeaders: []
});

const logger = require('./services/logging');

const etcd = require('./services/etcd');

const options = {
    name: 'lpp-feedback',
    version: process.env.npm_package_version
};

const server = restify.createServer(options);

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.pre(cors.preflight);
server.use(cors.actual);

server.get('/', (req, res, next) => {
    res.json({
        name: 'lpp-feedback',
        version: process.env.npm_package_version,
        description: 'Handles feedback from passengers'
    });

    return next();
});

require('./routes/healthRoutes')(server);
require('./routes/metricsRoutes')(server);
require('./routes/etcdRoutes')(server);

require('./api/feedback')(server);

server.listen(8080, () => {
    console.log(`${options.name} ${options.version} listening at ${server.url}`);
    
    logger.info(`${options.name} ${options.version} listening at ${server.url}`);
});