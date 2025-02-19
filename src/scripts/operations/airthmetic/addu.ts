import Operation from "../Operation";
import { Operand, Register, DecimalValue, HexadecimalValue } from "../../models/Operand";
import { MAX_UNSIGNED_32} from "../../consts";
import Status from "../../core/Status";

const OPERANDS_NUM = 3
export default class Addu extends Operation{
    static EXTENSIONS : { [extension : string] : (operands : Operand[]) => number} =  {
        "" : (operands) => Addu.default(operands),
        "co" : (operands) => Addu.default(operands, true, false),
        "ci" : (operands) => Addu.default(operands, false, true),
        "cio" : (operands) => Addu.default(operands, true, true),
    };

    constructor(extension : string){
        super(extension);
    }

    public static checkOperands(operands : Operand[]) : boolean{
        if(operands.length !== OPERANDS_NUM)
            throw new Error('Operands number is insufficient for this operation')
               
        if(operands[0] instanceof Register &&
            operands[1] instanceof Register &&
            (operands[2] instanceof DecimalValue || operands[2] instanceof HexadecimalValue || operands[2] instanceof Register)
        )
            return true;
            
        return false;
    }

    public static default(operands : Operand[], updateCarry : boolean = false, useCarry : boolean = false) : number {
        let value = operands[1].get(false) + operands[2].get(false);

        if(useCarry)
            value += Status.get("Carry");

        if(value > MAX_UNSIGNED_32){
            value = value - MAX_UNSIGNED_32 - 1;
            if(updateCarry)
                Status.set("Carry", 1);

        } else {
            if(updateCarry)
                Status.set("Carry", 0);
        }

        // TODO: Move it from here to interpreter 
        Status.set("Zero", value == 0 ? 1 : 0);

        return value
    }

    public execute(operands : Operand[]) : void{
        const func = Addu.EXTENSIONS[this.extension];
        operands[0].set(func(operands));
    }
}