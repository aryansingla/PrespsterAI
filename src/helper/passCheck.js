const PASSWORD_SPECIAL_SYMBOL = '@$#%^&*!%)({{}}[]_'
export const msgPasswordLengthError = 'MSG_PASSWORD_LENGTH_ERROR'
export const MsgPasswordLowerLetterError = 'MSG_PASSWORD_LOWER_LETTER_ERROR'
export const MsgPasswordUpperLetterError = 'MSG_PASSWORD_UPPER_LETTER_ERROR'
export const msgPasswordNumberLetterError = 'MSG_PASSWORD_NUMBER_LETTER_ERROR'
export const MsgPasswordSpecialLetterError = 'MSG_PASSWORD_SPECIAL_LETTER_ERROR'

const getMsg = (m) => {
  if (m === msgPasswordLengthError) return msgPasswordLengthError
  if (m === MsgPasswordLowerLetterError) return MsgPasswordLowerLetterError
  if (m === MsgPasswordUpperLetterError) return MsgPasswordUpperLetterError
  if (m === msgPasswordNumberLetterError) return msgPasswordNumberLetterError
  if (m === MsgPasswordSpecialLetterError) return MsgPasswordSpecialLetterError
  return ''
}

function charIsLetter(char) {
  if (typeof char !== 'string') {
    return false
  }

  return /^[a-zA-Z]+$/.test(char)
}

export default function passCheck(strVar) {
  let upper = 0
  let lower = 0
  let number = 0
  let special = 0

  const passwordLength = strVar?.length
  const errorMsgs = []
  if (passwordLength < 8) {
    errorMsgs.push(getMsg('MSG_PASSWORD_LENGTH_ERROR'))
    // return { error: errorMsgs.length, errorMsgs }
  }

  for (let i = 0; i < strVar?.length; i += 1) {
    if (upper === 1 && lower === 1 && number === 1 && special === 1) {
      return { error: errorMsgs?.length, errorMsgs }
    }

    if (
      charIsLetter(strVar[i]) &&
      strVar[i] === strVar[i].toUpperCase() &&
      upper === 0
    ) {
      upper = 1
    } else if (
      charIsLetter(strVar[i]) &&
      strVar[i] === strVar[i].toLowerCase() &&
      lower === 0
    ) {
      lower = 1
    } else if (!Number.isNaN(Number(strVar[i])) && number === 0) {
      number = 1
    } else if (PASSWORD_SPECIAL_SYMBOL.includes(strVar[i]) && special === 0) {
      special = 1
    }
  }
  if (upper === 0) {
    errorMsgs.push(getMsg(MsgPasswordUpperLetterError))
  }
  if (lower === 0) {
    errorMsgs.push(getMsg(MsgPasswordLowerLetterError))
  }
  if (number === 0) {
    errorMsgs.push(getMsg(msgPasswordNumberLetterError))
  }
  if (special === 0) {
    errorMsgs.push(getMsg(MsgPasswordSpecialLetterError))
  }
  return { error: errorMsgs?.length, errorMsgs }
}

