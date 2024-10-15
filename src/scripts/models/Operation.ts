import Operand from "./Operand";

export default abstract class Operation {
    protected operationType : string;

    constructor(operationType : string){
        this.operationType = operationType;
    }

    abstract execute(operands : Operand[]) : void;
}