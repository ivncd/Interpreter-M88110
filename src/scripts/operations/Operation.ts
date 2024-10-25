import { Operand } from "../models/Operand";

export default interface Operation{
    extension : string;
    operands : Operand[];
    execute(operands : Operand[]) : void;
}