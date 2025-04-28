"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByUserId = void 0;
const tslib_1 = require("tslib");
const curri_db_1 = require("../lib/curri-db");
const findByUserId = ({ id }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield curri_db_1.prisma.user.findFirst({
        where: {
            id
        },
    });
    return user;
});
exports.findByUserId = findByUserId;
//# sourceMappingURL=Users.js.map