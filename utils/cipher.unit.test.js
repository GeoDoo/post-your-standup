const { encrypt, decrypt } = require('./cipher')

describe('cipher', () => {
  it('should return the initial text after decrypting the encrypted message', function () {
    const plaintext = 'my message text to be encrypted'
    const encryptedText = encrypt(plaintext)

    expect(decrypt(encryptedText)).toBe(plaintext)
  })
})
