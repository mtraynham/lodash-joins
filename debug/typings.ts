import _ from 'lodash-joins';

interface Person {
    name: string;
    date: Date;
}

interface Student {
    name: string;
    login: Date;
}

const a: Person[] = [{name: 'eric', date: new Date()}, {name: 'margaret', date: new Date()}];
const b: Student[] = [{name: 'eric', login: new Date()}, {name: 'margaret', login: new Date()}];

const c: Person[] = _.hashFullOuterJoin(a, (item: Person) => item.name, a);
const d: (Person | Student | Person & Student)[] = _.hashFullOuterJoin(a, (item: Person | Student) => item.name, b);
const e: (Person | Student | Person & Student)[] = _.hashFullOuterJoin(a, (item: Person) => item.name, b, (item: Student) => item.name);
const bb: {left: Person, right: Student}[] = _.hashFullOuterJoin(
    a,
    (item: Person) => item.name,
    b,
    (item: Student) => item.name,
    (left: Person, right: Student): {left: Person, right: Student} => ({left, right}));

const f: Person[] = _.hashInnerJoin(a, (item: Person) => item.name, a);
const h: (Person & Student)[] = _.hashInnerJoin(a, (item: Person | Student) => item.name, b);
const i: (Person & Student)[] = _.hashInnerJoin(a, (item: Person) => item.name, b, (item: Student) => item.name);

const j: Person[] = _.hashLeftAntiJoin(a, (item: Person) => item.name, a);
const k: Person[] = _.hashLeftAntiJoin(a, (item: Person | Student) => item.name, b);
const l: Person[] = _.hashLeftAntiJoin(a, (item: Person) => item.name, b, (item: Student) => item.name);

const m: Person[] = _.hashLeftOuterJoin(a, (item: Person) => item.name, a);
const n: (Person | Person & Student)[] = _.hashLeftOuterJoin(a, (item: Person | Student) => item.name, b);
const o: (Person | Person & Student)[] = _.hashLeftOuterJoin(a, (item: Person) => item.name, b, (item: Student) => item.name);

const p: Person[] = _.hashLeftSemiJoin(a, (item: Person) => item.name, a);
const q: Person[] = _.hashLeftSemiJoin(a, (item: Person | Student) => item.name, b);
const r: Person[] = _.hashLeftSemiJoin(a, (item: Person) => item.name, b, (item: Student) => item.name);

const s: Person[] = _.hashRightAntiJoin(a, (item: Person) => item.name, a);
const t: Student[] = _.hashRightAntiJoin(a, (item: Person | Student) => item.name, b);
const u: Student[] = _.hashRightAntiJoin(a, (item: Person) => item.name, b, (item: Student) => item.name);

const v: Person[] = _.hashRightOuterJoin(a, (item: Person) => item.name, a);
const w: (Student | Person & Student)[] = _.hashRightOuterJoin(a, (item: Person | Student) => item.name, b);
const x: (Student | Person & Student)[] = _.hashRightOuterJoin(a, (item: Person) => item.name, b, (item: Student) => item.name);

const y: Person[] = _.hashRightSemiJoin(a, (item: Person) => item.name, a);
const z: Student[] = _.hashRightSemiJoin(a, (item: Person | Student) => item.name, b);
const aa: Student[] = _.hashRightSemiJoin(a, (item: Person) => item.name, b, (item: Student) => item.name);
