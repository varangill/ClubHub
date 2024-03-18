// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getData = (API_URL: any) => {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${API_URL}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postData = (API_URL: any, bodyData: any) => {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${API_URL}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteData = (API_URL: any, bodyData: any) => {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${API_URL}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export { getData, postData, deleteData };
