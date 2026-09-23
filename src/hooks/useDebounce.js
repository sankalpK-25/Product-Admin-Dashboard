import { useEffect, useState } from "react";


export function useDebounce(value, delay = 400){
    const [debouncedValue, setdebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setdebouncedValue(value);
        }, delay);


        return () => {
            clearTimeout(timer);
        };
    }, [value,delay]);

    return debouncedValue;

}