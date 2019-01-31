import { GraphQLClient } from 'graphql-request';
let config = process.argv[2]
if(!config){
  console.log(`pass a relative path to a config file`);
  process.exit(0)
}
console.log(`Welcome to a fun profiling! Config(${config})`);

const {
  QUERY,
  API,
  TOKEN,
  ITERATIONS,
  PARALLEL,
} = require(config)



let max = Number.MIN_SAFE_INTEGER;
let min = Number.MAX_SAFE_INTEGER;
let times = [];
let errors = [];
const client = new GraphQLClient(API, {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

let profiledRequest = (...args) => {
  let start = new Date();
  return client
    .request(...args)
    .then(data => {
      let end = new Date();
      let duration = end.getTime() - start.getTime();
      if (duration < min) {
        min = duration;
      }
      if (duration > max) {
        max = duration;
      }
      times.push(duration);
      return data;
    })
    .catch(e => {
      errors.push(e);
    });
};



console.log(`Running with query: ${QUERY}`);
console.log(`Profiling: ${API}`);
console.log(`Using API Key: ${TOKEN}`);

const runTest = async () => {
  for (let i = 0; i < ITERATIONS; i++) {
    try {
      await Promise.all(Array(PARALLEL).fill(profiledRequest(QUERY)));
    } catch (error) {
      console.error(error);
    }
  }
};
async function main() {
  try {
    await runTest();
    let msg = `Max: ${max}ms
Mean: ${times.reduce((acc, v) => acc + v, 0) / times.length}ms
Min ${min}ms
Errors ${errors.length}/${PARALLEL * ITERATIONS}
Example Error: ${errors[0]}`;
    console.log(msg);
  } catch (err) {
    console.log(`Caught an error while profiling: ${err} ${err.stack}`);
  }
}

main();
