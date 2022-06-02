import Admin from './Admin.js';
import pkg from 'lodash';
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
