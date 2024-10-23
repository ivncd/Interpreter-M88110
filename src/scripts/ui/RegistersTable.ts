import Registers from "../core/Registers";
import { to32BitHex } from "../utils";

export default class RegistersTable {
    static table : HTMLElement;
    static registersToElement : Map<String, HTMLElement> = new Map<String, HTMLElement>();

    public static build() : void{
        const table : HTMLElement = document.createElement("table")
        Registers.map.forEach((value , registerId) => {
            const cell : HTMLElement = document.createElement("tr");
            
            const registerCell : HTMLElement = document.createElement("td");
            let  textCell = document.createTextNode(registerId);
            registerCell.appendChild(textCell);
            cell.appendChild(registerCell);

            const valueCell : HTMLElement = document.createElement("td");
            textCell = document.createTextNode(value == null ? "" : to32BitHex(value));
            valueCell.appendChild(textCell);
            cell.appendChild(valueCell);

            table.appendChild(cell);
            RegistersTable.registersToElement.set(registerId, registerCell);
        }) 

        RegistersTable.table = table
    }

    public static getTable() : HTMLElement {
        return RegistersTable.table;
    }

    public static updateAll() : void {
        const keys = Registers.map.keys();
        for(let key of keys){
            RegistersTable.update(key)
        }
    }
    
    public static update(registerId : string) : void {
        const newValue = Registers.get(registerId);
        const element = RegistersTable.registersToElement.get(registerId);
        if(element == undefined)
            throw new ReferenceError(`The register ${registerId} doesnt exist`);

        element.textContent = to32BitHex(newValue);
    }

}