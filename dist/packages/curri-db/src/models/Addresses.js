"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreate = void 0;
const tslib_1 = require("tslib");
const curri_db_1 = require("../lib/curri-db");
const findOrCreate = ({ addressLine1, addressLine2, city, state, postalCode, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const existingAddress = yield curri_db_1.prisma.address.findFirst({
        where: {
            addressLine1,
            addressLine2: addressLine2 || '',
            postalCode,
            city,
            state,
        }
    });
    if (existingAddress)
        return existingAddress;
    const createdAddress = yield curri_db_1.prisma.address.create({
        data: {
            addressLine1,
            addressLine2: addressLine2 || '',
            postalCode,
            city,
            state,
        }
    });
    return createdAddress;
});
exports.findOrCreate = findOrCreate;
//# sourceMappingURL=Addresses.js.map