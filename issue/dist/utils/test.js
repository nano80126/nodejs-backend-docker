"use strict";
const obj = {
    a: 'a',
    b: 'b',
    c: 'c',
};
let payload;
async function func1(obj) {
    payload = {
        a: obj.a,
        b: obj.b,
        c: obj.c,
    };
}
async function func2(obj) {
    payload = {
        a: obj.a,
        b: obj.b,
        c: obj.c,
    };
}
async function func3(obj) {
    payload = {
        a: obj.a,
        b: obj.b,
        c: obj.c,
    };
}
for (let i = 0; i < 3; i++) {
    func1(obj);
    console.log(obj);
    func2(obj);
    console.log(obj);
    func3(obj);
    console.log(obj);
}
