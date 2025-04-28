"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDelivery = void 0;
const tslib_1 = require("tslib");
const curri_db_1 = require("../lib/curri-db");
const createDelivery = ({ originAddressId, destinationAddressId, orderNumber, userId, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const delivery = yield curri_db_1.prisma.delivery.create({
        data: {
            originAddressId,
            destinationAddressId,
            orderNumber: orderNumber || '',
            userId,
        }
    });
    return delivery;
});
exports.createDelivery = createDelivery;
//# sourceMappingURL=Deliveries.js.map