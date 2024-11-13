import Operation from "../Operation";
import { Operand, Register, DecimalValue, HexadecimalValue } from "../../models/Operand";

const OPERANDS_NUM = 3
export default class Divs implements Operation{
    static EXTENSIONS : { [extension : string] : (context : Divs) => number} =  {
        "" : (context) => context.signed(),
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
            (operands[2] instanceof DecimalValue || operands[2] instanceof HexadecimalValue || operands[2] instanceof Register))
        )
            throw new Error('Invalid operands for operation add')
            
        return true
    }

    public signed() : number {
        let secondValue = this.operands[2].get(true)
        let value = 0;
        if(secondValue != 0){
            value = this.operands[1].get() / secondValue;
        } else {
            throw new Error("No se puede dividir entre 0")
        }

        return value
    }

    public execute(operands : Operand[]) : void{
        if(this.checkOperands(operands)){
            this.operands = operands;
            const func = Divs.EXTENSIONS[this.extension];
            operands[0].set(func(this));
        }
    }
}