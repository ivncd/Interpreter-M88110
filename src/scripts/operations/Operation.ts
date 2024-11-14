import { Operand } from "../models/Operand";

export default abstract class Operation {
    extension : string;
    constructor(extension : string){
        this.extension = extension;
    }

    static checkOperands(operands : Operand[]) : boolean{
        return operands.length == -1;
    }

    public abstract execute(operands : Operand[]) : void;
}