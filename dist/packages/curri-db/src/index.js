"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./lib/curri-db"), exports);
const Users = require("./models/Users");
const Deliveries = require("./models/Deliveries");
const Addresses = require("./models/Addresses");
const Models = {
    Users,
    Deliveries,
    Addresses,
};
exports.Models = Models;
//# sourceMappingURL=index.js.map