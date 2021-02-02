interface Options {
  url: string;
  method: string;
  body?: string;
}
export const apiRequest = async <T>(options: Options): Promise<T | null> => {
  options = Object.assign({}, options);
  const response = await fetch(options.url, options);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  } else if (response.status === 204) {
    return null;
  } else {
    return await response.json();
  }
};
