import { MAX_SIGNED_32, MIN_SIGNED_32, MAX_UNSIGNED_32, MIN_UNSIGNED_32 } from "./consts";

export function to32BitHex(num: number): string {
    let adjustedNum = num >>> 0;
    let hexString = adjustedNum.toString(16);

    return '0x' + hexString.padStart(8, '0').toUpperCase();
}

export function hexToDecimal(hexNumber : string, signed = true) {
    const bitLength = hexNumber.length * 4;
    const num = parseInt(hexNumber, 16);

    if (signed) {
        const maxPositiveValue = 1 << (bitLength - 1);
        if (num >= maxPositiveValue) {
            return num - (1 << bitLength);
        }
    }

    return num;
}

export function isValidUnsigned(value : number) : boolean{
    return (value <= MAX_UNSIGNED_32 && value >= MIN_UNSIGNED_32);
}

export function isValidSigned(value : number) : boolean{
    return (value <= MAX_SIGNED_32 && value >= MIN_SIGNED_32);
}