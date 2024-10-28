import Operation from "../Operation";
import { Operand } from "../../models/Operand";

export default class Add implements Operation{
    static EXTENSIONS : { [extension : string] : (context : Add) => number} =  {
        "" : (context) => context.signed(),
    };

    extension : string;
    operands !: Operand[];

    constructor(extension : string) {
        this.extension = extension;
    }

    public signed() : number {
        let value = this.operands[1].get() + this.operands[2].get();

        return value
    }

    public execute(operands : Operand[]) : void{
        this.operands = operands;
        const func = Add.EXTENSIONS[this.extension];
        operands[0].set(func(this));
    }
}