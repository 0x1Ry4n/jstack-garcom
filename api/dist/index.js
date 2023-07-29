"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const node_http_1 = __importDefault(require("node:http"));
const dotenv = __importStar(require("dotenv"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = require("./router");
const envPath = node_path_1.default.resolve(__dirname, "..", ".env");
dotenv.config({ path: envPath });
const app = (0, express_1.default)();
const server = node_http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server);
mongoose_1.default
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
    const port = 3000;
    app.use("/uploads", express_1.default.static(node_path_1.default.resolve(__dirname, "..", "uploads")));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(router_1.router);
    server.listen(port, () => {
        console.log(`Rodando API-Garcom na porta ${port}`);
    });
})
    .catch((e) => console.warn(`Erro ao conectar no MONGODB: ${e}`));
//# sourceMappingURL=index.js.map