// import assert from 'assert';
// import { describe, it } from 'node:test';
import { expect } from 'chai';
// import { stringify } from 'querystring';
// import assert from 'assert';
import { sum } from '../sum';

// describe('Array', function () {
describe('indexOf()', function () {
	it('should return -1 when the value is not present', function () {
		expect(sum(1, 1)).to.be.equal(10);
		// assert.equal([1, 2, 3].indexOf(3), -1, 'Should be -1');
	});
});
// });
