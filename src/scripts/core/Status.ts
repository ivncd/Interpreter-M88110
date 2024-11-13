import StatusTable from "../ui/StatusTable";

export default class Status{
    // Creates a map with registers from r0 to r31
    // r0 is 0 and the others are undefined
    public static map = new Map<string, number>([
        ['Overflow', 0],
        ['Carry', 0],
        ['Zero', 0],
        ['Negative', 0]
    ]);

    public static set(key: string, value : number) : void{
        Status.map.set(key, value);
        StatusTable.update(key);
    }

    public static get(key: string) : number{
        let value : number | undefined = Status.map.get(key);

        if(value === undefined)
            throw new ReferenceError(`The status register ${key} doesnt exist`);

        return value;
    }

    // Clear all values of the maps reset it
    public static reset() : void{
        Status.map = new Map<string, number>([
        ['Overflow', 0],
        ['Carry', 0],
        ['Zero', 0],
        ['Negative', 0]
        ]);
    }
}
