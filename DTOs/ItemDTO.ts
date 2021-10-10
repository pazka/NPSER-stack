export class ItemDTO {
    id : string
    lastUpdate : number = Date.now()
    version : number = 0
    
    constructor(){
    }
}