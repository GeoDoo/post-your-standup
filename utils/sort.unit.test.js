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
      {
        name: 'George',
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
        name: 'George',
      },
      {
        name: 'Sue',
      },
    ])
  })
})
