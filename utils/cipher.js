require('dotenv').config()
const crypto = require('crypto')
const { ALGORITHM } = require('../constants')

const getIV = () => crypto.randomBytes(ALGORITHM.IV_BYTE_LEN)

const encrypt = text => {
  const iv = getIV()
  const cipher = crypto.createCipheriv(
    ALGORITHM.BLOCK_CIPHER,
    process.env.ENCRYPT_KEY,
    iv,
    { authTagLength: ALGORITHM.AUTH_TAG_BYTE_LEN },
  )

  let encryptedMessage = cipher.update(text)
  encryptedMessage = Buffer.concat([encryptedMessage, cipher.final()])
  return Buffer.concat([iv, encryptedMessage, cipher.getAuthTag()])
}

const decrypt = encrypted => {
  const authTag = encrypted.slice(-ALGORITHM.AUTH_TAG_BYTE_LEN)
  const iv = encrypted.slice(0, ALGORITHM.IV_BYTE_LEN)
  const encryptedMessage = encrypted.slice(
    ALGORITHM.IV_BYTE_LEN,
    -ALGORITHM.AUTH_TAG_BYTE_LEN,
  )

  const decipher = crypto.createDecipheriv(
    ALGORITHM.BLOCK_CIPHER,
    process.env.ENCRYPT_KEY,
    iv,
    { authTagLength: ALGORITHM.AUTH_TAG_BYTE_LEN },
  )
  decipher.setAuthTag(authTag)

  const decryptedMessage = decipher.update(encryptedMessage)
  return Buffer.concat([decryptedMessage, decipher.final()])
}

module.exports = { encrypt, decrypt }
