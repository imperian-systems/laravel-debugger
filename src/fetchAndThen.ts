const getAndThen = (url: string, key: string, setState: Function, setError: Function) => {
  fetch(url, {
    headers: {
      'X-Laravel-Debugger-Key': key
    }
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.error) {
      setError(data.error);
      return;
    }
    setState(data);
  })
  .catch((err) => console.log(err));
};

export { getAndThen };
