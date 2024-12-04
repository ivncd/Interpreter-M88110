import Operation from "../Operation";
import { Operand, Register, DecimalValue, HexadecimalValue } from "../../models/Operand";
import { isValidSigned } from "../../utils";
import { ExecutionError } from "../../error";


const OPERANDS_NUM = 3
export default class Divs extends Operation{
    static EXTENSIONS : { [extension : string] : (operands : Operand[]) => number} =  {
        "" : (operands) => Divs.default(operands),
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

    public static default(operands : Operand[]) : number {
        let secondValue = operands[2].get(true)
        let value = 0;
        if(secondValue != 0){
            value = operands[1].get() / secondValue;
        } else {
            throw new ExecutionError("Can't divide by 0", "Zero")
        }

        if(!isValidSigned(value))
            throw new ExecutionError("Exceeded signed 32 bit int range", "Overflow");

        return value
    }

    public execute(operands : Operand[]) : void{
        const func = Divs.EXTENSIONS[this.extension];
        operands[0].set(func(operands));
    }
}