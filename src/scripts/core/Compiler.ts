import Instruction from '../models/Instruction';

export default class Compiler{
    lines : string[];

    constructor(programText : string){
        this.lines = this.filterLines(programText.split("\n"));
    }

    private filterLines(lines : string[]) : string[] {
        return lines.filter(line => line.trim() !== '');
    }

    public updateText(programText : string){
        this.lines = this.filterLines(programText.split("\n"));
    }

    public getInstructions() : Instruction[] {
        const instructions : Instruction[] = [];

        for(let line of this.lines){
            instructions.push(new Instruction(line));
        }

        return instructions;
    }
}