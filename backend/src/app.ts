import * as bodyParser from 'body-parser';
// import * as cookie from 'cookie';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import { createServer } from 'http';
import * as path from 'path';

import { registry } from './services/registry';
import { StorageService } from './services/storage';

/**
 * Main entrypoint to the application
 * Spinning up an Express session on port 5000
 */
export class MainService {
    private app: express.Application = express();

    constructor() {
        this.initExpress();

        const server = createServer(this.app);
        console.log('Listening on port 5000');
        server.listen(5000);
    }

    /**
     * Initialialize all the endpoints for exchanging data with the different services.
     * todo: extract that into controller classes
     */
    private buildAPI() {
        registry.init(new StorageService());
        this.app.get('/cars', (req, res) => {
            const cars = registry.getCarService().cars();
            res.json({ data: cars });
        });
        this.app.post('/cars', (req, res) => {
            registry.getCarService().addCar(req.body);
            res.sendStatus(200);
        });
        this.app.put('/cars', (req, res) => {
            registry.getCarService().updateCar(req.body);
            res.sendStatus(200);
        });
        this.app.delete('/cars', (req, res) => {
            registry.getCarService().removeCar(req.body);
            res.sendStatus(200);
        });
        this.app.get('/users', (req, res) => {
            const users = registry.getUserService().users();
            res.json({ data: users });
        });
        this.app.get('/bookings', (req, res) => {
            const bookings = registry.getBookingService().demands();
            res.json({ data: bookings });
        });
    }

    /**
     * Initialize all Express related features, like middlewares, router and cors.
     * Also make it possible to later serve e SPA to the user.
     */
    private initExpress() {
        const corsOptions = {
            credentials: true,
            origin: (origin, callback) => {
                callback(null, true);
            }
        };

        this.app.use(cors(corsOptions));

        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: false,
            })
        );

        this.app.use(
            session({
                secret: 'Theverysecretsecret',
                name: 'MyCookie',
                resave: false,
                saveUninitialized: false,
                cookie: { path: '/', httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
            })
        );

        this.app.use(express.static(path.join(__dirname, 'public')));

        /** Build the API */
        this.buildAPI();

        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });

        this.app.use((req, res, next) => {
            const err = new Error('Not Found');
            res.status(404);
            next(err);
        });

        this.app.use(express.Router());
    }
}

// noinspection JSUnusedGlobalSymbols
export const main = new MainService();
