import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import chalk from 'chalk'

const downloadMedia = async (message) => {

  let type = Object.keys(message)[0]
  let msg = message[type]
  if (type === 'buttonsMessage' || type === 'viewOnceMessageV2') {
    if (type === 'viewOnceMessageV2') {
      msg = message.viewOnceMessageV2?.message
      type = Object.keys(msg || {})[0]
    } else type = Object.keys(msg || {})[1]
    msg = msg[type]
  }
  const stream = await downloadContentFromMessage(msg, type.replace('Message', ''))
  let buffer = Buffer.from([])
  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
  }
  return buffer
}

export function logs(gcName, from, name, text, m, isGroup) {

  if (m.messages[0].message && isGroup) {
    console.log(
      "" + "\n" + chalk.black(chalk.bgWhite("[ GROUP ]   => ")),
      chalk.black(
        chalk.bgRed(gcName)
      ) +
      "\n" +
      chalk.black(chalk.bgWhite("[ SENDER ]  => ")),
      chalk.black(chalk.bgRed(name)) +
      "\n" +
      chalk.black(chalk.bgWhite("[ MESSAGE ] => ")),
      chalk.black(chalk.bgRed(text)) + "\n" + ""
    );
  }
  if (m.messages[0].message && !isGroup) {
    console.log(
      "" + "\n" + chalk.black(chalk.bgWhite("[ PRIVATE CHAT ] => ")),
      chalk.black(chalk.bgMagentaBright(from.split("@")[0])) +
      "\n" +
      chalk.black(chalk.bgWhite("[ SENDER ]       => ")),

      chalk.black(chalk.bgMagentaBright(name)) +
      "\n" +
      chalk.black(chalk.bgWhite("[ MESSAGE ]      => ")),
      chalk.black(chalk.bgMagentaBright(text)) + "\n" + ""
    );
  }
}
export default downloadMedia