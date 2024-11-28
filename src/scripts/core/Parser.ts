import { Operand, Register, DecimalValue, HexadecimalValue} from "../models/Operand";

import Operation from "../operations/Operation";

// Arithmetic operations
import { Add, Addu, Sub, Subu, Muls, Mulu, Divs, Divu } from "../operations/airthmetic";
import { And, Xor, Mask, Or } from "../operations/logic";

type OperationConstructor = { new(extension: string): Operation };
const TEXT_TO_OPERATIONS = new Map<string, typeof Operation | OperationConstructor>([
  // Arithmetic Operations
  ["add", Add],
  ["addu", Addu],
  ["sub", Sub],
  ["subu", Subu],
  ["muls", Muls],
  ["mulu", Mulu],
  ["divs", Divs],
  ["divu", Divu],
  // Logic Operations
  ["and", And],
  ["xor", Xor],
  ["mask", Mask],
  ["or", Or]
]);

const asmRegex = /^(?:(?<label>[A-Za-z][A-Za-z0-9]*):)?\s*(?<operation>[A-Za-z.]+)\s*(?<operands>[A-Za-z0-9, -]*)?\s*(?:;(?<comment>.*))?$/;
const registerRegex = /r([0-9]|[12][0-9]|3[01])/;

// Immediate values
const decimalRegex = /^-?\d{1,5}$/;
const hexadecimalRegex = /^0[xX][0-9a-fA-F]{1,4}$/;

export default class Parser{
    public static parseInstruction(instructionText : string){
        const match = instructionText.match(asmRegex);
        if (match){
            const groups = match.groups;
            return groups;
        } else {
            throw new Error("The instruction does not conform to format");
        }
    }

    public static parseOperands(operandsText : string) : Operand[] {
        const operands : Operand[] = [];
        const separatedText : string[] = operandsText.trim().split(',');
        
        for(let operand of separatedText){
            operand = operand.trim();
            if(operand.match(registerRegex)){
                operands.push(new Register(operand));
            } else if(operand.match(decimalRegex)) {
                operands.push(new DecimalValue(parseInt(operand)));
            } else if(operand.match(hexadecimalRegex)) {
                operands.push(new HexadecimalValue(operand))
            } else {
                throw new Error(`Cant find operand type for ${operand}`);
            }
        }

        return operands;
    }

    public static parseOperation(operationText : string) : [typeof Operation, Operation]{
        const [operationName, ...rest] = operationText.split('.');
        const extension = rest.join('.');

        const createOperation = TEXT_TO_OPERATIONS.get(operationName);
        if(!createOperation)
            throw new Error(`The operation ${operationName} does not exist`);

        return [createOperation as typeof Operation , new (createOperation as OperationConstructor)(extension)];
    }
}