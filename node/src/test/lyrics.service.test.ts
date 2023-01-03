import { expect } from 'chai';
// import sinon from 'sinon';

import { getLyrics } from '../services/lyrics.service';

// import mocha, { describe, it } from 'mocha';
// import mocha from 'mocha';
// import { describe, it } from 'node:test';

// mocha.setup('bdd');

describe('get lyrics list', () => {
	before(function () {
		// run before all tests in this block
	});

	after(function () {
		// run after all tests in this block
	});

	beforeEach(function () {
		// run before each test in this block
	});

	afterEach(function () {
		// run after each test in this block
	});

	it('shoud return a list', async () => {
		expect((await getLyrics('', '怪物'))?.data.length).to.be.equal(33);
	});
});

// mocha.run();

// class A {
// 	constructor() {
// 		//
// 	}
// 	add(a: number, b: number) {
// 		const sum = a + b;
// 		return sum;
// 	}
// }
// describe('test A', () => {
// 	it('demo usage of stub API', function () {
// 		const a = new A(); // 1) API:callsFake
// 		sinon.stub(a, 'add').callsFake(function (a, b) {
// 			return 0;
// 		});
// 		const sum = a.add(1, 2);
// 		expect(a.add(1, 2)).to.equal(0); // 2) Restore add
// 		a.add.restore();
// 		expect(a.add(1, 2)).to.equal(3); // 3) API:withArgs,callThrough
// 		const obj = {
// 			sum: function sum(a: number, b: number) {
// 				return a + b;
// 			},
// 		};
// 		// obj.sum = function sum(a, b) {
// 		// 	return a + b;
// 		// };
// 		sinon.stub(obj, 'sum');
// 		obj.sum.withArgs(2, 2).callsFake(function foo() {
// 			return 'bar';
// 		});
// 		obj.sum.callThrough();
// 		expect(obj.sum(2, 2)).to.equal('bar');
// 		expect(obj.sum(1, 2)).to.equal(3);
// 		obj.sum.restore();
// 		expect(obj.sum(2, 2)).to.equal(4);
// 	});
// });
