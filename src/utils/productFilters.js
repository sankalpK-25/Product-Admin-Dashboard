export const VALID_SORTS = ["price", "rating", "title"];

export function parseSort(value){
    if(!VALID_SORTS.includes(value)){
        return "";
    }

    return value;
}