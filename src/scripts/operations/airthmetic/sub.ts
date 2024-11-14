import Operation from "../Operation";
import { Operand, Register, DecimalValue, HexadecimalValue } from "../../models/Operand";

const OPERANDS_NUM = 3
export default class Sub extends Operation{
    static EXTENSIONS : { [extension : string] : (operands : Operand[]) => number} =  {
        "" : (operands) => Sub.default(operands),
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
        ){
            return true;
        }
            
        return false;
    }


    public static default(operands : Operand[]) : number {
        let value = operands[1].get() - operands[2].get();

        return value
    }

    public execute(operands : Operand[]) : void{
        const func = Sub.EXTENSIONS[this.extension];
        operands[0].set(func(operands));
    }
}