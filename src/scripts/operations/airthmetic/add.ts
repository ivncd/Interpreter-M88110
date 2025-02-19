import Operation from "../Operation";
import { Operand, Register, DecimalValue, HexadecimalValue } from "../../models/Operand";
import { isValidSigned } from "../../utils";
import Status from "../../core/Status";


const OPERANDS_NUM = 3
export default class Add extends Operation{
    static EXTENSIONS : { [extension : string] : (operands : Operand[]) => number} =  {
        "" : (operands) => Add.default(operands),
        "co" : (operands) => Add.default(operands, true, false),
        "ci" : (operands) => Add.default(operands, false, true),
        "cio" : (operands) => Add.default(operands, true, true),
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
        let value = operands[1].get(true) + operands[2].get(true);

        if(useCarry)
            value += Status.get("Carry");

        if(!isValidSigned(value)){
            Status.set("Overflow", 1)    
            if(updateCarry)
                Status.set("Carry", 1);
        } else {
            Status.set("Overflow", 0);
            if(updateCarry)
                Status.set("Carry", 0);
        }

        //TODO: Move it from here to interpreter
        Status.set("Zero", value == 0 ? 1 : 0);

        return value
    }

    public execute(operands : Operand[]) : void{
        const func = Add.EXTENSIONS[this.extension];
        operands[0].set(func(operands));
    }
}