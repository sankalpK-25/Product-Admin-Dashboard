export const VALID_SORTS = ["price", "rating", "title"];

export const VALID_SORT_ORDERS = ["asc", "desc"]

export function parseSort(value){
    if(!VALID_SORTS.includes(value)){
        return "";
    }

    return value;
}

export function parseSortOrder(value){
    if(!VALID_SORT_ORDERS.includes(value)){
        return "";
    }

    return value;
}