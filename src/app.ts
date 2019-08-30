import express = require("express");
import bodyParser = require("body-parser");
let cors = require("cors");
let i18n = require("i18n");
let path = require('path');
let session = require('express-session')
import { APIBase } from "./core/routes/APIBase";



export class App {
  private app: express.Application;

  constructor(Route: APIBase[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoute(Route);
    i18n.configure({
      locales: ["en", "ar"],
      directory: __dirname + "/locales",
      defaultLocale: "en"
    });
  }
  /**
   * @description server listen method to givin port
   * @param port
   */
  public listen(port: string | number, host: string) {
    this.app.listen({ port, host }, () => {
      console.log(`App listening on the port ${port} on host ${host}`);
    });
  }

  /**
   * @description return app after all intializtions
   */
  public getServer() {
    return this.app;
  }
  /**
   * @description set app global middlewares
   */
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(i18n.init);
    this.app.set('view engine', 'ejs')
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('views', path.join(__dirname, './api/views'))
    this.app.use(express.static(path.join(__dirname, './api/public')));
    this.app.use(session({
      secret: 'chatBot',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }))
  }

  /**
   * init app routes with path and routes mehtods
   * @param Route
   */
  private initializeRoute(Route: APIBase[]) {
    Route.forEach(Route => {
      this.app.use(Route.path, Route.router);
    });
  }
}
