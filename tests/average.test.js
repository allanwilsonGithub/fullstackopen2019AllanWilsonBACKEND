const average = require('../utils/for_testing').average

describe('average', () => {
    test('average of 2 + 6 + 10', () => {
      const result = average([2,6,10])

      expect(result).toEqual(6)
    })

    test('average of empty array is 0', () => {
      const result = average([])

      expect(result).toEqual(0)
    })
})