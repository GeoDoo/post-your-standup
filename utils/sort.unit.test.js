const { sortByName } = require('./sort')

describe('sortByName', () => {
  it('should an array of objects by name property', () => {
    const array = [
      {
        name: 'George',
      },
      {
        name: 'Sue',
      },
      {
        name: 'Anne',
      },
    ]

    expect(sortByName(array)).toEqual([
      {
        name: 'Anne',
      },
      {
        name: 'George',
      },
      {
        name: 'Sue',
      },
    ])
  })
})
