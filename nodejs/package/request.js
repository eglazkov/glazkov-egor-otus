/***
  * Скрипт тестирования запросов к локальному серверу localhost:3000
  * 2 режима выполнения запросов: последовательный - sync и параллельный - async
  * Для выполнения тестирования, задать скрипт test в package.json вида "test": "node request.js @numOfReq @reqType",
  * где numOfReq - количество запросов, reqType - тип запроса (async, sync)
  * Старт теста осуществляется командой npm run ci
  */

const http = require('http');
const reqType = process.argv[2];
const numOfReq = process.argv[3];

console.log('Request type = ' + reqType + '\n' + 'Number of requests = ' + numOfReq);

const createHttpPromise = (indexOfReq) =>
  new Promise((resolve, reject) => {
    let req = http.request({
      host:'localhost',
      port: 3000,
      path:'/'
    }, (res) => {
      const timeMoment = new Date();
      console.log(`Индекс запроса ${indexOfReq};\nТекущее время: ${timeMoment.getHours()} часов, ${timeMoment.getMinutes()} минут, ${timeMoment.getSeconds()} секунд`);
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error('statusCode=' + res.statusCode));
      }
      let body = [];
      res.on('data', (chunk) => {
        body.push(chunk);
      });
      res.on('end', () => {
        try {
          body = Buffer.concat(body).toString();
        } catch(e) {
          reject(e);
        }
        resolve(body);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });

const createArrayOfRequest = (arr, size, promiseReq) => {
  for (let i=0; i<=size; i++) {
    promiseReq.reqIndex = i;
    arr.push(
      promiseReq
    );
  }
  return arr;
};

const promiseReduce = (asyncFunctions, reduce) => {
  asyncFunctions.reduce((prevPromise, curPromise, index) => {
    return prevPromise.then(() => curPromise(index)).then((res) => {
      return reduce(res);
    });
  }, Promise.resolve());
};

const runRequest = (requestType, numberOfReqs) => {
  const arrOfReqs = createArrayOfRequest([], numberOfReqs, createHttpPromise);
  switch (requestType) {
    case 'async': {                                                                     //параллельные запросы, метод Promise.all
      Promise.all(arrOfReqs.map((func, index) => func(index))).then((res) => {
        return console.log(res);
      });
      break;
    }
    case 'sync': {                                                                      //последовательные запросы, конвейер промисов через Array.reduce
      promiseReduce(arrOfReqs, (p) => console.log(p));
      break;
    }
    default: {
      console.log('Please, pass request type');
    }
  }
};

runRequest(reqType, numOfReq);