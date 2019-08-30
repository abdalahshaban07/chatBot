import { App } from "./app";
import { APIBase } from "./core/routes/APIBase";
import { TwilioAPI } from "./api/routets/TwilioAPI";
import { SendOtpAPI } from "./api/routets/SendOtpAPI";
import { AddNewUserAPI } from './api/routets/AddNewUser';


const PORT = process.env.PROT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const ROUTES: APIBase[] = [
  new TwilioAPI(),
  new SendOtpAPI(),
  new AddNewUserAPI()
];
let app = new App(ROUTES);

app.listen(PORT, HOST);
