import Memory from "../core/Memory";
import { to32BitHex } from "../utils";

export default class MemoryTable {
    static table : HTMLElement;
    static memoryToElement : Map<number , HTMLElement> = new Map<number, HTMLElement>();

    public static build() : void{
        const table : HTMLElement = document.createElement("table")
        Memory.map.forEach((value , key) => {
            const cell : HTMLElement = document.createElement("tr");
            
            const registerCell : HTMLElement = document.createElement("td");
            let  textCell = document.createTextNode(String(key));
            registerCell.appendChild(textCell);
            registerCell.classList.add('name')
            cell.appendChild(registerCell);

            const valueCell : HTMLElement = document.createElement("td");
            textCell = document.createTextNode(value == null ? "" : to32BitHex(value));
            valueCell.appendChild(textCell);
            valueCell.classList.add("value")
            cell.appendChild(valueCell);

            table.appendChild(cell);
            MemoryTable.memoryToElement.set(key, valueCell);
        }) 

        MemoryTable.table = table
    }

    public static getTable() : HTMLElement {
        return MemoryTable.table;
    }

    public static updateAll() : void {
        const keys = Memory.map.keys();
        for(let key of keys){
            MemoryTable.update(key)
        }
    }
    
    public static update(key: number) : void {
        const newValue = Memory.get(key);
        const element = MemoryTable.memoryToElement.get(key);
        if(element == undefined)
            //Constraints
            throw new ReferenceError(`The memory ${key} doesnt exist`);

        element.textContent = to32BitHex(newValue);
    }

}