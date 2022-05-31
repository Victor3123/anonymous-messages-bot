import messages from './messages.js';
import WebSocket from 'ws';
import Bot from '../../Bot.js';

export default class Client extends Bot {
  /**
   * @param client_bot {object}
   * @param fullAddress {string}
   */
  constructor(client_bot, {fullAddress}) {
    super('Client', client_bot.token)
    this.#openWebsocket(fullAddress, super.getBot(), messages);
  }

  start() {
    super.getBot().start();
  }

  /**
   * @param wsAddress {string}
   * @param bot {object}
   * @param messages {function}
   */
  #openWebsocket(wsAddress, bot, messages) {
    this.ws = new WebSocket(wsAddress);
    this.ws.on('open', () => {
      super.botLog('Client side websocket connection: success!');
      this.#onEvent(bot, this.ws, messages);
    })
  }

  /**
   * @param bot {object}
   * @param ws {object}
   * @param messages {function}
   */
  #onEvent(bot, ws, messages) {
    bot.on('/start', msg => bot.sendMessage(msg.from.id, messages(msg).greeting));
    bot.on('/help', msg => bot.sendMessage(msg.from.id, messages(msg).help));
    bot.on('text', msg => ws.send(JSON.stringify(msg)));
  }
}
