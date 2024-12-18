import Instruction from "../models/Instruction";

export default class Interpreter{
    instructions : Instruction[];

    constructor(instructions : Instruction[]){
        this.instructions = instructions;
    }

    public executeAll() : void {
        for(let lineNumber = 1; lineNumber <= this.instructions.length; lineNumber++){
            try {
                this.executeLine(lineNumber);
            } catch {
                console.log("AAA")
            }
        }
    }

    public executeLines(lineFromNumber : number, lineToNumber : number) : void {
        if(lineFromNumber <= 0 || lineToNumber > this.instructions.length)
            throw new RangeError(`The lines should be from ${1} to ${this.instructions.length}`);

        for(let lineNumber = lineFromNumber; lineNumber < lineToNumber; lineNumber++){
            this.executeLine(lineNumber);
        }
    }

    public executeLine(lineNumber : number) : void{
        this.instructions[lineNumber - 1].execute();
    }
}