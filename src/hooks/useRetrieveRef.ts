import { useEffect, useState } from "react";

export function useRetrieveRef() {
    const [ref, setRef] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0);

    useEffect(() => {
        if (typeof window === "undefined") return; // Prevents SSR execution

        const refCookie = document.cookie
            .split("; ")
            .find(row => row.startsWith("coupon="));

        console.log("refCookie: ", refCookie);

        if (refCookie) {
            const refValue = refCookie.split("=")[1];
            setRef(refValue);
        }
    }, []);

    useEffect(() => {
        if (!ref) return; // ✅ Prevents unnecessary API calls when `ref` is empty

        async function getDiscount() {
            try {
                const response = await fetch(`/api/coupon?code=${ref}`);
                if (!response.ok) throw new Error("Failed to fetch discount");

                const data = await response.json();
                if (data.discount !== undefined) {
                    console.log("Discount from DB:", data.discount);
                    setDiscount(data.discount);
                }
            } catch (error) {
                console.error("Error fetching discount:", error);
            }
        }

        getDiscount();
    }, [ref]); // ✅ Runs only when `ref` is set

    return discount;
}
