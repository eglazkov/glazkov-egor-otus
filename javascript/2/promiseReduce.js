function promiseReduce(asyncFunctions, reduce, initialValue) {
  const promiseWithResult = asyncFunctions.reduce((prevPromise, curPromise) => {
    return prevPromise.then(curPromise).then((res) => {
      return reduce(res, initialValue);
    });
  }, Promise.resolve());

  return Promise.resolve(promiseWithResult);
}
