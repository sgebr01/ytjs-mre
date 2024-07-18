var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Jinter_ast;
import Visitor from './visitor.js';
import { parse } from 'acorn';
import { JinterError } from './utils/index.js';
export default class Jinter {
    constructor() {
        _Jinter_ast.set(this, []);
        this.visitor = new Visitor();
        this.scope = this.visitor.scope;
        this.scope.set('print', (args) => console.log(...args));
        this.defineObject('console', console);
        this.defineObject('Math', Math);
        this.defineObject('String', String);
        this.defineObject('Array', Array);
        this.defineObject('Date', Date);
    }
    defineObject(name, obj) {
        this.visitor.on(name, (node, visitor) => {
            if (node.type === 'Identifier')
                return obj;
            if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
                const prop = visitor.visitNode(node.callee.property);
                const args = node.arguments.map((arg) => visitor.visitNode(arg));
                const callable = obj[prop];
                if (!callable)
                    return '__continue_exec';
                return callable.apply(obj, args);
            }
            return '__continue_exec';
        });
    }
    /**
     * Evaluates the program.
     * @returns The result of the last statement in the program.
     */
    evaluate(input) {
        try {
            const program = parse(input, { ecmaVersion: 2020 });
            __classPrivateFieldSet(this, _Jinter_ast, program.body, "f");
        }
        catch (e) {
            throw new JinterError(e.message);
        }
        this.visitor.setAST(__classPrivateFieldGet(this, _Jinter_ast, "f"));
        return this.visitor.run();
    }
}
_Jinter_ast = new WeakMap();
