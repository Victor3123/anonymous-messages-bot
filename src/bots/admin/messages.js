const separator = '---------------------------';

/**
 * @param msg {object}
 */
export default function (msg) {
  return {
    superChatMessage: `Message:\n${msg.text}\n${separator}\nUsername: @${msg.from.username}\nName: ${msg.from.first_name}\nID: ${msg.from.id}`,
    defaultChatMessage: `Message:\n${msg.text}`
  }
}
