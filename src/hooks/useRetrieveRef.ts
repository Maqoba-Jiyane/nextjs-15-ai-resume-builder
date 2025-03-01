import { useEffect, useState } from "react";

export function useRetrieveRef() {
    const [ref, setRef] = useState<string | null>(null);

    useEffect(() => {
        const refCookie = document.cookie
            .split("; ")
            .find(row => row.startsWith("coupon="));

        if (refCookie) {
            const refValue = refCookie.split("=")[1];
            setRef(refValue);
        }
    }, []);

    return ref;
}
