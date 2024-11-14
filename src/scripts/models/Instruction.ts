import Operation from "../operations/Operation";
import { Operand } from "./Operand";

import Parser from "../core/Parser";

export default class Instruction{
    label : string | undefined;
    operation : Operation;
    operands : Operand[];
    comment : string | undefined;

    constructor(instructionText : string){
        const parsedInstruction = Parser.parseInstruction(instructionText)!;
        this.label = parsedInstruction.label;
        const [operationType, operation] = this.obtainOperation(parsedInstruction.operation);
        this.operands = this.obtainOperands(parsedInstruction.operands);
        this.comment = parsedInstruction.comment;

        if(!operationType.checkOperands(this.operands)){
            throw new Error("Operands doesn't match the ones used by the operation")
        }

        this.operation = operation;
    }

    private obtainOperands(operandsText : string) : Operand[]{
        return Parser.parseOperands(operandsText);
    }

    private obtainOperation(operationText : string) : [typeof Operation, Operation]{
        return Parser.parseOperation(operationText);
    }

    public execute() : void{
        this.operation.execute(this.operands);
    }
}