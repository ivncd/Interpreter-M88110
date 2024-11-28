import Operation from "../Operation";
import { Operand, Register, DecimalValue, HexadecimalValue } from "../../models/Operand";

const OPERANDS_NUM = 3
export default class Cmp extends Operation{
    static EXTENSIONS : { [extension : string] : (operands : Operand[]) => number} =  {
        "" : (operands) => Cmp.default(operands),
    };

    constructor(extension : string){
        super(extension);
    }

    public static checkOperands(operands : Operand[]) : boolean{
        if(operands.length !== OPERANDS_NUM)
            throw new Error('Operands number is insufficient for this operation')
               
        if(operands[0] instanceof Register &&
            operands[1] instanceof Register &&
            (operands[2] instanceof DecimalValue || operands[2] instanceof HexadecimalValue || operands[2] instanceof Register)
        )
            return true;
            
        return false;
    }

    public static default(operands : Operand[]) : number {
        let value : number = 0;

        value += operands[1].get() == operands[2].get() ? Math.pow(2,2) : Math.pow(2,3); // eq : ne
        console.log(`Paso X, value: ${value.toString(16)}`);

        value += operands[1].get() > operands[2].get() ? Math.pow(2,4) : Math.pow(2,5); // gt : le
        console.log(`Paso X, value: ${value.toString(16)}`);

        value += operands[1].get() < operands[2].get() ? Math.pow(2,6) : Math.pow(2,7); // lt : ge
        console.log(`Paso X, value: ${value.toString(16)}`);

        value += operands[1].get(false) > operands[2].get(false) ? Math.pow(2,8) : Math.pow(2,9); // hi : ls
        console.log(`Paso X, value: ${value.toString(16)}`);

        value += operands[1].get(false) < operands[2].get(false) ? Math.pow(2,10) : Math.pow(2,11); // lo : hs
        console.log(`Paso X, value: ${value.toString(16)}`);


        // be, nb
        let be_nb = 0
        for (let i = 0; i < 4 && be_nb == 0; i++) {
            if (((operands[1].get() >> (i * 8)) & 0xFF) === ((operands[2].get() >> (i * 8)) & 0xFF)) {
                be_nb = Math.pow(2,12);
            }
        }
        
        if(be_nb == 0)
            be_nb = Math.pow(2,13);

        value += be_nb
        console.log(`Paso X, value: ${value.toString(16)}`);


        //he, nh
        let he_nh = 0
        for (let i = 0; i < 2 && he_nh == 0; i++) {
            if (((operands[1].get() >> (i * 16)) & 0xFFFF) === ((operands[2].get() >> (i * 16)) & 0xFFFF)) {
                he_nh = Math.pow(2,14);
            }
        }
        
        if(he_nh == 0)
            he_nh = Math.pow(2,15);

        value += he_nh;
        console.log(`Paso X, value: ${value.toString(16)}`);


        return value
    }

    public execute(operands : Operand[]) : void{
        const func = Cmp.EXTENSIONS[this.extension];
        operands[0].set(func(operands));
    }
}