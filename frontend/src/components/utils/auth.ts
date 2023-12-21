export const setToken = (token: string) => {
  localStorage.setItem("lodgenow", JSON.stringify({ token: token }));
};

export const clearToken = () => {
  const storedData = localStorage.getItem("lodgenow");

  if (storedData) {
    const parsedData = JSON.parse(storedData);
    delete parsedData.token;

    localStorage.setItem("lodgenow", JSON.stringify(parsedData));
  }
};

export const getToken = (): string | null => {
  const storedData = localStorage.getItem("lodgenow");

  if (storedData) {
    const parsedData = JSON.parse(storedData);
    return parsedData.token;
  } else return null;
};
