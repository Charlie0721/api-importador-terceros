import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import IndexRoutes from './routes/index.routes'
export class App {

    private app: Application;
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();

    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3001);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({limit: '50mb', extended: false }));
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(cors());
    }
    routes() {

       this.app.use(IndexRoutes);
    }


    async listen() {

        await this.app.listen(this.app.get('port'));
        console.log('server on port ', this.app.get('port'))
      
    }


}