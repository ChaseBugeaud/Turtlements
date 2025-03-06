import { should } from "chai"; should()

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      let arr = [1,2,3]
      let result = arr.indexOf(4)
      result.should.equal(-1)
    })
  })
})
