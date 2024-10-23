import RegistersTable from "../ui/RegistersTable";

export default class Registers{
    // Creates a map with registers from r0 to r31
    // r0 is 0 and the others are undefined
    public static map = new Map<string, number | null>(
        Array.from({ length: 32 }, (_, i) => [`r${i}`, i === 0 ? 0 : null])
    );

    public static isRegister(register : string) {
        return Registers.map.has(register);
    }

    public static set(key: string, value : number) : void{
        Registers.map.set(key, value);
        RegistersTable.update(key);
    }

    public static get(key: string) : number{
        let value : number | undefined | null = Registers.map.get(key);

        if(value === undefined)
            throw new ReferenceError(`The register ${key} doesnt exist`);
        else if(value === null)
                throw new Error(`The value of the register ${key} is null`);

        return value;
    }

    // Clear all values of the maps reset it
    public static reset() : void{
        Registers.map = new Map<string, number | null>(
            Array.from({ length: 32 }, (_, i) => [`r${i}`, i === 0 ? 0 : null])
        );

        RegistersTable.updateAll();
    }
}
