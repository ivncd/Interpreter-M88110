import { MAX_SIGNED_32, MIN_SIGNED_32, MAX_UNSIGNED_32, MIN_UNSIGNED_32 } from "./consts";

export function to32BitHex(num: number): string {
    let adjustedNum = num >>> 0;
    let hexString = adjustedNum.toString(16);

    return '0x' + hexString.padStart(8, '0').toUpperCase();
}

export function hexToDecimal(hexNumber : string, signed = true) {
    hexNumber = hexNumber.includes('0x') ? hexNumber.substring(2) : hexNumber;
    const bitLength = hexNumber.length * 4;
    let num = parseInt(hexNumber, 16);
    if (signed) {
        const maxUnsignedValue = Math.pow(2, bitLength) - 1;
        const maxSignedValue = Math.pow(2, bitLength - 1) - 1;
        if(num > maxSignedValue){
            num -= maxUnsignedValue + 1;
            console.log(hexNumber, num)
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