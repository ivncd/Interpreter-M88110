import Registers from "../core/Registers";

import { MAX_SIGNED_32, MAX_UNSIGNED_32 } from "../consts";
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
        let value = Registers.get(this.registerId);
        if(signed)
            return value > MAX_SIGNED_32 ? value - MAX_UNSIGNED_32 : value;
        else
            return value < 0 ? value + 1 + MAX_UNSIGNED_32 : value;
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
            return this.value > MAX_SIGNED_32 ? this.value - MAX_UNSIGNED_32 : this.value;
        else
            return this.value < 0 ? this.value + 1 + MAX_UNSIGNED_32 : this.value;
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
        console.log(this.value, signed)
        return hexToDecimal(this.value, signed);
    }

    public set(value : string) : void {
        this.value = value;
    }
}



