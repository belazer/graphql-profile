
const API = 'https://api-euwest.contentql.com/v1/xxxxxxxxxxxxxxx/master';
const TOKEN = '';
const ITERATIONS = 1000;
const PARALLEL = 12;

const QUERY = `
{
  assets {
    id
  }
}
`;

module.exports = {
  QUERY,
  API,
  TOKEN,
  ITERATIONS,
  PARALLEL,
};
