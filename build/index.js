"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const models_1 = __importDefault(require("./models"));
const server = http_1.default.createServer(app_1.default);
const port = process.env.PORT || 3000;
app_1.default.set('port', port);
//Check if port is already in use an if it is exit the process.
function onError(error) {
    if (error.code === 'EADDRINUSE') {
        console.clear();
        console.error(`port ${port} already in use`);
        process.exit(1);
    }
    else {
        console.error('An error occurrred: ', error);
        process.exit(1);
    }
}
//Event Emmitter that listens to error Event
server.on('error', onError);
//Database connection
function databaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default.authenticate();
            yield Promise.all(models_1.default.map((model) => { model.sync(); }));
            console.log('Database connection was established succesfully');
        }
        catch (err) {
            console.log('Connection was not established an error occured', err);
            process.exit(1);
        }
    });
}
//Run the server
server.listen(port, (() => {
    console.clear();
    console.log(`Express API is running on port ${port}`);
    databaseConnection();
}));
