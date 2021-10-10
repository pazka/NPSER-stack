import {ItemDTO} from "../DTOs/ItemDTO";

let allRoomIds: string[] = []

export function getNewItem() {
    let item = new ItemDTO()
    item.id = newUniqueId(8)
    return item
}

function newUniqueId(l: number): string {
    const cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newId = new Array(l).fill(0).map(x => cs[Math.floor(Math.random() *
        cs.length)]).join('');

    return allRoomIds.includes(newId) ? newUniqueId(l) : newId
}
