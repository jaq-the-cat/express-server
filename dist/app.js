"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send("boop");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    return console.log(`listening on ${PORT}`);
});
//# sourceMappingURL=app.js.map