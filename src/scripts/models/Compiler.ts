import Instruction from './Instruction.ts';

export default class Compiler{
    lines : string[];

    constructor(programText : string){
        this.lines = programText.split("\n");
    }

    public obtainInstructions() : Instruction[] {
        const instructions : Instruction[] = [];

        return instructions;
    }
}