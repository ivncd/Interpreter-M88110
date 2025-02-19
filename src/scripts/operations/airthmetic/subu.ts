import Operation from "../Operation";
import { Operand, Register, DecimalValue, HexadecimalValue } from "../../models/Operand";
import { MIN_UNSIGNED_32 } from "../../consts";
import Status from "../../core/Status";

const OPERANDS_NUM = 3
export default class Subu extends Operation{
    static EXTENSIONS : { [extension : string] : (operands : Operand[]) => number} =  {
        "" : (operands) => Subu.default(operands),
        "co" : (operands) => Subu.default(operands, true, false),
        "ci" : (operands) => Subu.default(operands, false, true),
        "cio" : (operands) => Subu.default(operands, true, true),
    };

    constructor(extension : string){
        super(extension);
    }

    public static checkOperands(operands : Operand[]) : boolean{
        if(operands.length !== OPERANDS_NUM)
            throw new Error('Operands number is insufficient for this operation')
               
        if(!(operands[0] instanceof Register &&
            operands[1] instanceof Register &&
            (operands[2] instanceof DecimalValue || operands[2] instanceof HexadecimalValue || operands[2] instanceof Register))
        )
            throw new Error('Invalid operands for operation add')
            
        return true
    }


    public static default(operands : Operand[], updateCarry : boolean = false, useCarry: boolean = false) : number {
        let value = operands[1].get(false) - operands[2].get(false);

        if(useCarry)
            value += Status.get("Carry");

        if(value < MIN_UNSIGNED_32){
            if(updateCarry)
                Status.set("Carry", 1);

        } else {
            if(updateCarry)
                Status.set("Carry", 0);
        }

        Status.set("Zero", value == 0 ? 1 : 0);

        return value
    }

    public execute(operands : Operand[]) : void{
        const func = Subu.EXTENSIONS[this.extension];
        operands[0].set(func(operands));
    }
}