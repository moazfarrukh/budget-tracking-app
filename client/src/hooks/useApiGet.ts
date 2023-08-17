import { useState, useEffect } from "react";


export function useApiGet<DataType, ResponseType>(url: string,
    extractFunction: (res: ResponseType) => DataType
) {
    const [data, setData] = useState<DataType | null>()
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const responseData = await response.json();

                setData(extractFunction(responseData));

                setLoading(false);

            } catch (error) {
                setError("Error Fetching data");
                setLoading(false);
            }
        };
        fetchData();
    }, [extractFunction, url]);
    return { data, loading, error };

};