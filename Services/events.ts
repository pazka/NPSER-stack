
let events : any = {}

export function sub(name: string,cb: Function){
    if(!Object.keys(events).includes(name)){
        events[name] = []
    }

    events[name].push(cb) 
}

export function send(name : string,data : any){
    if(name !== On.MOUSE_ACTION){
        console.group(`[${name}]`)
        console.log(data)
        console.groupEnd()
    }
    
    if(!Object.keys(events).includes(name)){
        events[name] = []
    }

    if(Object.keys(events).includes(name)){
        events[name].forEach((cb : Function) => cb(data))
    }
}

const On = Object.freeze({
    ERROR : "ERROR",
    MOUSE_ACTION : "MOUSE_ACTION",
})


export {On};