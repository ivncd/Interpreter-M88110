import Instruction from '../models/Instruction';

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