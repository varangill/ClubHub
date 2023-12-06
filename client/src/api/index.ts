// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchData = (API_URL: any, method: any) => {
  fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/${API_URL}`, {
    method,
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export default fetchData;
