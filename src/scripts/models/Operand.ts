import Registers from "../core/Registers";

export interface Operand{
    get() : number;
    set(value : number) : void;
}

export class Register implements Operand{
    registerId : string;

    constructor(registerId : string){
        this.registerId = registerId;
    }

    public get() : number {
        return Registers.get(this.registerId);
    }

    public set(value : number) : void {
        Registers.set(this.registerId, value);
    }
}

export class Value implements Operand{
    value: number;
    constructor(value : number){
        this.value = value;
    }

    public get() : number {
        return this.value;
    }

    public set(value : number) : void {
        this.value = value;
    }
}
