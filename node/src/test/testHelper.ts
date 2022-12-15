// import assert from 'assert';
import { describe, it } from 'node:test';
import { expect, assert } from 'chai';
// import { stringify } from 'querystring';

describe('test module', () => {
	it('1. should add unmbers', function (done) {
		// assert.strictEqual(1 + 1, 2, '這裡要 equal');
		assert.deepEqual({ a: 1 }, { a: 12 }, '這裡要一樣');
		done();
	});
});
