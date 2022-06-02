import {WebSocketServer} from 'ws';
import messages from './messages.js';
import Bot from '../../Bot.js';

export default class Admin extends Bot {
  /**
   * @param admin_bot {object}
   * @param superUsers {string[]}
   * @param adminChats {object[]}
   */
  constructor(admin_bot, superUsers, adminChats) {
    super('Admin', admin_bot.token)
    this.adminChats = adminChats
    this.#openSocket(super.getBot(), messages)
    this.#onEvents(super.getBot())
  }

  /**
   * @return {undefined}
   */
  async start() {
    super.getBot().start()
  }

  /**
   * @param bot {object}
   * @param messages {function}
   * @return {Promise<void>}
   */
  async #openSocket(bot, messages) {
    const ws = await this.#createWSS(1203)
    ws.on('message', data => this.#messageHandler(bot, data, messages));
  }

  /**
   * @param bot {object}
   */
  #onEvents(bot) {
    bot.on('/getChatId', msg => bot.sendMessage(msg.chat.id, `This chat id is: ${msg.chat.id}`));
    bot.on('message', msg => console.log(msg.chat.id));
  }

  /**
   * @param port {number}
   * @return {Promise<unknown>}
   */
  #createWSS(port) {
    return new Promise((resolve, reject) => {
      try {
        const wss = new WebSocketServer({port: port})
        super.botLog('Admin side websocket creating: success!');
        wss.on('connection', ws => {
          resolve(ws);
          super.botLog('Admin side websocket connection: success!');
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * @param bot {object}
   * @param data {string}
   * @param messages {function}
   */
  #messageHandler(bot, data, messages) {
    this.adminChats.map((chat) => {
      if (chat.isSuperChat) {
        bot.sendMessage(chat.id, messages(JSON.parse(data)).superChatMessage);
      } else if (JSON.parse(data).text[0] !== '/') {
        bot.sendMessage(chat.id, messages(JSON.parse(data)).defaultChatMessage);
      }
    })
  }
}
