export function to32BitHex(num : number) {
    let hexString = (num >>> 0).toString(16);

    return '0x' + hexString.padStart(8, '0');
}