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