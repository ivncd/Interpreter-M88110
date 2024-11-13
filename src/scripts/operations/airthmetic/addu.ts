import Operation from "../Operation";
import { Operand, Register, DecimalValue, HexadecimalValue } from "../../models/Operand";

const OPERANDS_NUM = 3
export default class Addu implements Operation{
    static EXTENSIONS : { [extension : string] : (context : Addu) => number} =  {
        "" : (context) => context.unsigned(),
    };

    extension : string;
    operands !: Operand[];

    constructor(extension : string) {
        this.extension = extension;
    }

    private checkOperands(operands : Operand[]) : boolean{
        if(operands.length !== OPERANDS_NUM)
            throw new Error('Operands number is insufficient for this operation')
               
        if(!(operands[0] instanceof Register &&
            operands[1] instanceof Register &&
            (operands[2] instanceof DecimalValue || operands[2] instanceof HexadecimalValue))
        )
            throw new Error('Invalid operands for operation add')
            
        return true
    }


    public unsigned() : number {
        let value = this.operands[1].get() + this.operands[2].get(false);

        return value
    }

    public execute(operands : Operand[]) : void{
        if(this.checkOperands(operands)){
            this.operands = operands;
            const func = Addu.EXTENSIONS[this.extension];
            operands[0].set(func(this));
        }
    }
}