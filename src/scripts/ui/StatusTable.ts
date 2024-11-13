import Status from "../core/Status";

export default class StatusTable{
    static table : HTMLElement;
    static statusToElement: Map<String, HTMLElement> = new Map<String, HTMLElement>();

    public static build() : void{
        const table : HTMLElement = document.createElement("table")

        const pairsList: [string, number][] = Array.from(Status.map, ([key, value]) => [key, value]);
        const pairsOfPair : [[string, number], [string, number]][] = [
            [pairsList[0], pairsList[1]],
            [pairsList[2], pairsList[3]],
        ];

        for(let pairs of pairsOfPair){
            let cell : HTMLElement = document.createElement("tr");
            for(let pair of pairs){
                let [statusId, value] = pair
                const statusCell : HTMLElement = document.createElement("td");
                let  textCell = document.createTextNode(statusId);
                statusCell.appendChild(textCell);
                statusCell.classList.add('name');
                cell.appendChild(statusCell);

                const valueCell : HTMLElement = document.createElement("td");
                textCell = document.createTextNode(String(value));
                valueCell.appendChild(textCell);
                valueCell.classList.add('value');

                cell.appendChild(valueCell);
                StatusTable.statusToElement.set(statusId, valueCell);
            }
            table.appendChild(cell);
        }

        StatusTable.table = table
    }

    public static getTable() : HTMLElement {
        return StatusTable.table;
    }

    public static updateAll() : void {
        const keys = Status.map.keys();
        for(let key of keys){
            StatusTable.update(key)
        }
    }
    
    public static update(statusId: string) : void {
        const newValue = Status.get(statusId);
        const element = StatusTable.statusToElement.get(statusId);
        if(element == undefined)
            throw new ReferenceError(`The status ${statusId} doesnt exist`);

        element.textContent = String(newValue);
    }

}