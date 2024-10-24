import Instruction from "../models/Instruction";
import { Operand, Register, Value } from "../models/Operand";


export default class Parser{
    private static asmRegex = /^(?:(?<label>[A-Za-z][A-Za-z0-9]*):)?\s*(?<operation>[A-Za-z.]+)\s*(?<operands>[A-Za-z0-9, ]*)?\s*(?:;(?<comment>.*))?$/;

    public static parseInstruction(instructionText : string){
        const match = instructionText.match(Parser.asmRegex);
        if (match){
            const groups = match.groups;
            return groups;
        } else {
            throw new Error("The instruction does not conform to format");
        }

    }

    public static parseOperands(operandsText : string) : Operand[] {
        const operands : Operand[] = [];
        return operands;
    }
}