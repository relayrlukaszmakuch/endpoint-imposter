const { withServer, resolveMockFile } = require('../testUtils/server');
const waitForExpect = require('wait-for-expect');
const https = require('https');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

it('spins up an HTTPS server with a self signed certificate', () => withServer({
  '--mocks': resolveMockFile('https.js'),
  '--https-port': 3001,
}, async () => {
  const res = await axios.get(
    'https://localhost:3001/s/ping', 
    {
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    }
  );
  expect(res.data).toEqual('🔏');
}));

it('spins up an HTTPS server with the provided certificate', () => withServer({
    '--mocks': resolveMockFile('https.js'),
    '--https-cert': path.resolve(__dirname, '../testUtils/server.cert'),
    '--https-key': path.resolve(__dirname, '../testUtils/server.key'),
    '--https-port': 3001,
}, async () => {
  const res = await axios.get('https://localhost:3001/s/ping');
  expect(res.data).toEqual('🔏');
}));
