import Operation from "../Operation";
import { Operand } from "../../models/Operand";

class Add implements Operation{
    static EXTENSIONS : { [extension : string] : (context : Add) => number} =  {
        "" : (context) => context.signed(),
        "u" : (context) => context.unsigned()
    };

    extension : string;
    operands : Operand[];
    constructor(extension : string, operands : Operand[]){
        this.extension = extension;
        this.operands = operands;
    }

    // TODO: Make these operations
    public unsigned() : number {
        let value = this.operands[1].get() + this.operands[2].get();

        return value
    }

    public signed() : number {
        let value = this.operands[1].get() + this.operands[2].get();

        return value
    }

    public execute() : void{
        const func = Add.EXTENSIONS[this.extension];
        this.operands[0].set(func(this));
    }
}