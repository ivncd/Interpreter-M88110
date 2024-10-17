import Operation from "../operations/Operation";
import Operand from "./Operand";

export default class Instruction{
    operation : Operation;
    operands : Operand[];

    constructor(instructionText : string){
        this.operation = this.obtainOperation(instructionText);
        this.operands = this.obtainOperands(instructionText);
    }

    //TODO: make the operation and operands parser
    private obtainOperation(instructionText : string) : Operation | null{
    }

    private obtainOperands(instructionText : string) : Operand[] | null{
    }


    public execute() : void{

    }
}