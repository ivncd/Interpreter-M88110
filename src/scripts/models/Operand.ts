import Registers from "../core/Registers";

import { hexToDecimal } from "../utils";

export interface Operand{
    get(signed? : boolean) : number;
    set(value : number | string) : void;
}

export class Register implements Operand{
    registerId : string;

    constructor(registerId : string){
        this.registerId = registerId;
    }

    public get(signed : boolean = true) : number {
        if(signed)
            return Registers.get(this.registerId);
        else
            return Registers.get(this.registerId) >>> 0;
    }

    public set(value : number) : void {
        Registers.set(this.registerId, value);
    }
}

export class DecimalValue implements Operand{
    value: number;

    constructor(value : number){
        this.value = value;
    }

    public get(signed : boolean = true) : number {
        if(signed)
            return this.value;
        else
            return this.value >>> 0;
    }

    public set(value : number) : void {
        this.value = value;
    }
}

export class HexadecimalValue implements Operand{
    value: string;

    constructor(value : string){
        this.value = value;
    }

    public get(signed : boolean = true) : number{
        return hexToDecimal(this.value, signed);
    }

    public set(value : string) : void {
        this.value = value;
    }
}



