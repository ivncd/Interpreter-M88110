//import RegistersTable from "../ui/MemoryTable";

export default class Memory{
    // Creates a map with memory
    public static map = new Map<number, number | null>([
        [0, 1],
        [4, 2]
    ]);

    public static isRegister(key : number) {
        return Memory.map.has(key);
    }

    public static set(key: number, value : number) : void{
        Memory.map.set(key, value);
        //RegistersTable.update(key);
    }

    public static get(key: number) : number{
        let value : number | undefined | null = Memory.map.get(key);

        // TODO: add memory constraints not undefined
        if(value === undefined)
            throw new ReferenceError(`The memory${key} doesnt exist`);
        else if(value === null)
                throw new Error(`The value of the memory ${key} is null`);

        return value;
    }

    // Clear all values of the maps reset it
    public static reset() : void{
        Memory.map =  new Map<number, number | null>([
            [0, null]
        ]);

        //RegistersTable.updateAll();
    }
}
