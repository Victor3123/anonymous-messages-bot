import Telebot from 'telebot';
import messages from './messages.js';
import pkg from 'lodash';
import WebSocket from 'ws';

/**
 * @param client_bot {object}
 * @return {Promise<unknown>}
 */
export default function client({client_bot}) {
  return new Promise((resolve, reject) => {
    try {
      const clientBot = new Client(client_bot);
      if (pkg.isEmpty(clientBot)) {
        throw new Error('ClientBot: Not implemented');
      } else {
        resolve(clientBot);
      }

    } catch (e) {
      reject(e);
    }
  });
}

class Client {
  /**
   * @param client_bot {object}
   */
  constructor(client_bot) {
    this.token = client_bot.token;
    this.messages = messages;
    this.bot = new Telebot(this.token);
  }

  start() {
    this.#websocket();
    this.ws.on('open', () => {
      console.log('connected')
      this.#onEvent();
    })
    this.bot.start();
  }

  #websocket() {
    this.ws = new WebSocket('ws://localhost:1201');
  }

  #onEvent() {
    this.bot.on('/start', msg => this.bot.sendMessage(msg.from.id, this.messages(msg).greeting));

    this.bot.on('/help', msg => this.bot.sendMessage(msg.from.id, this.messages(msg).help));

    this.bot.on('text', msg => this.ws.send(JSON.stringify(msg)))

    // this.bot.on('message', msg =>
  }

  // #resendToAdmin(msg) {
  //   this.bot.sendMessage(msg.)
  // }
}
