import Telebot from 'telebot';
import pkg from 'lodash';
import WebSocket, {WebSocketServer} from 'ws';
import axios from 'axios';

const _ = pkg

/**
 * @param admin_bot{object}
 * @param super_users{string[]}
 * @param admin_chats{object[]}
 * @return {Promise<unknown>}
 */
export default function admin({admin_bot, super_users, admin_chats}) {
  return new Promise((resolve, reject) => {
    try {
      const adminBot = new Admin(admin_bot, super_users, admin_chats);
      if (_.isEmpty(adminBot)) {
        throw new Error('AdminBot: Not implemented');
      } else {
        resolve(adminBot);
      }

    } catch (e) {
      reject(e);
    }
  })
}

class Admin {
  /**
   * @param admin_bot {object}
   * @param superUsers {string[]}
   * @param adminChats {object[]}
   */
  constructor(admin_bot, superUsers, adminChats) {
    this.token = admin_bot.token;
    this.bot = new Telebot(this.token)
    this.adminChats = adminChats
  }

  start() {
    this.#openSocket()
    this.#onEvents()
    this.bot.start()
  }

  // TODO: remove 'govnokod'
  #openSocket() {
    const bot = this.bot
    const chats = this.adminChats
    this.wss = new WebSocketServer({port: 1201})
    this.wss.on('connection', function connection(ws) {
      ws.on('message', data => {
        chats.map((chat) => {
          if (chat.isSuperChat) {
            bot.sendMessage(chat.id, `Message:\n${JSON.parse(data).text}\nUsername:@${JSON.parse(data).from.username}`);
          } else {
            if (JSON.parse(data).text[0] !== '/') {
              bot.sendMessage(chat.id, `Message:\n${JSON.parse(data).text}`);
            }
          }
        })
      });
    });
  }

  #onEvents() {
    this.bot.on('/start', msg => console.log(msg.chat.id))

    this.bot.on('message', msg => console.log(msg.chat.id))
  }
}