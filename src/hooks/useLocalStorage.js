import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const savedValue = localStorage.getItem(key);

            return savedValue
                ? JSON.parse(savedValue)
                : initialValue;
        } catch (error) {
            console.error("LocalStorage error:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;