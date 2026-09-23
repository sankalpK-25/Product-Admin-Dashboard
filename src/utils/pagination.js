export function parsePositiveInteger(value, fallback){
    const number = Number(value);

    if(!Number.isInteger(number) || number < 1){
        return fallback;
    }

    return number;
}

const VALID_PAGE_SIZES = [10,20,50];

export function parsePageSize(value, fallback = 20){
    const number = Number(value);

    if(! VALID_PAGE_SIZES.includes(number)) {
        return fallback;
    }

    return number;
}