import { privateConfig } from '../private/config.js';
import client from './bots/client/index.js';
import admin from './bots/admin/index.js';

async function main(config) {
  const clientBot = await client(config)
  const adminBot = await admin(config)
  clientBot.start()
  adminBot.start()
}
main(privateConfig);
