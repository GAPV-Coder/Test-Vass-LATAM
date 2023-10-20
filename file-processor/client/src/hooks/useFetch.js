import { useState, useEffect } from "react";

const useFetch = (apiUrl) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(apiUrl);

				if (!response.ok) {
					throw new Error(
						`Error: ${response.status} - ${response.statusText}`
					);
				}

				const result = await response.json();
				setData(result);
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		}

		fetchData();
	}, [apiUrl]);

	return { data, loading, error };
};

export default useFetch;
