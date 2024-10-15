export default class Operand{
    private type : "inmediate" | "register";
    private value : number;

    constructor(type : "inmediate" | "register", value : number){
        this.type = type;
        this.value = value;
    }
}