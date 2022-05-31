import Telebot from 'telebot';

export default class Bot {
  #name;
  #id;
  #bot;

  /**
   * @param name {string}
   * @param token {string}
   */
  constructor(name, token) {
    this.#bot = new Telebot(token)
    this.#setName(name)
    this.#setId(this.#generateId())
  }

  /**
   * @return {object}
   */
  getBot() {  return this.#bot };
  /**
   * @return {string}
   */
  getName = () => this.#name;
  /**
   * @return {number}
   */
  getId = () => this.#id;

  /**
   * @param val {string}
   */
  #setName = (val) => this.#name = val
  /**
   * @param val {number}
   */
  #setId = (val) => this.#id = val
  /**
   * @return {number}
   */
  #generateId = () => Math.random()
  /**
   * @param text {string}
   */
  botLog(text) {
    console.log(`{\n  ${this.getName()} bot: '${text}'\n  ${this.getName()} id: ${this.getId()}\n}`)
  }
}
