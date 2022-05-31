import pkg from 'lodash';
const _ = pkg
import Client from './Client.js';

/**
 * @param client_bot {object}
 * @param websocket {object}
 * @return {Promise<unknown>}
 */
export default function client({client_bot, websocket}) {
  return new Promise((resolve, reject) => {
    try {
      const clientBot = new Client(client_bot, websocket);
      if (_.isEmpty(clientBot)) {
        throw new Error('ClientBot: Not implemented');
      } else {
        resolve(clientBot);
      }
    } catch (e) {
      reject(e);
    }
  });
}