"use strict";
exports.__esModule = true;
exports.getNewItem = void 0;
var ItemDTO_1 = require("../DTOs/ItemDTO");
var allRoomIds = [];
function getNewItem() {
    var item = new ItemDTO_1.ItemDTO();
    item.id = newUniqueId(8);
    return item;
}
exports.getNewItem = getNewItem;
function newUniqueId(l) {
    var cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var newId = new Array(l).fill(0).map(function (x) { return cs[Math.floor(Math.random() *
        cs.length)]; }).join('');
    return allRoomIds.includes(newId) ? newUniqueId(l) : newId;
}
//# sourceMappingURL=itemController.js.map