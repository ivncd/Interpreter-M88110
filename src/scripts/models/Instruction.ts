import Operation from "../operations/Operation";
import { Operand } from "./Operand";

import Parser from "../core/Parser";

export default class Instruction{
    label : string | undefined;
    operation : ;
    operands : Operand[];
    comment : string | undefined;

    constructor(instructionText : string){
        const parsedInstruction = Parser.parseInstruction(instructionText)!;
        this.label = parsedInstruction.label;
        this.operation = parsedInstruction.operation;
        this.operands = this.obtainOperands(parsedInstruction.operands);
        this.comment = parsedInstruction.comment;
    }

    private obtainOperation(operationText : string) : Operation {

    }

    private obtainOperands(operandsText : string) : Operand[]{
        return Parser.parseOperands(operandsText);
    }


    public execute() : void{

    }
}