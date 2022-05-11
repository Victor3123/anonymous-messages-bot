import {privateConfig} from '../private/config.js';
import client from './bots/client/Client.js';
import admin from './bots/admin/Admin.js';

function main(config) {
  client(config)
    .then(bot => {
      bot.start();
    })
    .catch(err => {
      console.log('client error', err);
    });

  admin(config)
    .then(bot => {
      bot.start();
    })
    .catch(err => {
      console.log('admin error', err)
    })
}

main(privateConfig);
