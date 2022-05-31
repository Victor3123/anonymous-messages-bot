/**
 * @param msg {object}
 */
export default function (msg) {
  return {
    greeting: `Hello, ${msg.from.first_name}.\n`
      +`I am main instrument for sending your anonymous messages to the teacher.`
      +` You can send me any message and I will send it to the teacher.`
      +` Click here 👉🏼 /help to get information how does it work`
    ,
    help: 'Send your anonymous message and then it will send to th teacher👇🏼',
  }
}
