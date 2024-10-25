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
        this.operands = this.obtainOperands(parsedInstruction.operands);
        this.operation = this.obtainOperation(parsedInstruction.operation);
        this.comment = parsedInstruction.comment;
    }

    private obtainOperands(operandsText : string) : Operand[]{
        return Parser.parseOperands(operandsText);
    }

    private obtainOperation(operationText : string) : Operation {
        return Parser.parseOperation(operationText);
    }

    public execute() : void{
        this.operation.execute(this.operands);
    }
}