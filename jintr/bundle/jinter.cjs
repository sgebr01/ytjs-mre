/* eslint-disable */
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/index.js
var dist_exports = {};
__export(dist_exports, {
  Jinter: () => Jinter,
  Nodes: () => nodes_exports,
  Utils: () => utils_exports,
  default: () => dist_default
});
module.exports = __toCommonJS(dist_exports);

// dist/nodes/index.js
var nodes_exports = {};
__export(nodes_exports, {
  ArrayExpression: () => ArrayExpression,
  ArrowFunctionExpression: () => ArrowFunctionExpression,
  AssignmentExpression: () => AssignmentExpression,
  BinaryExpression: () => BinaryExpression,
  BlockStatement: () => BlockStatement,
  BreakStatement: () => BreakStatement,
  CallExpression: () => CallExpression,
  ConditionalExpression: () => ConditionalExpression,
  ContinueStatement: () => ContinueStatement,
  ExpressionStatement: () => ExpressionStatement,
  ForOfStatement: () => ForOfStatement,
  ForStatement: () => ForStatement,
  FunctionDeclaration: () => FunctionDeclaration,
  FunctionExpression: () => FunctionExpression,
  Identifier: () => Identifier,
  IfStatement: () => IfStatement,
  Literal: () => Literal,
  LogicalExpression: () => LogicalExpression,
  MemberExpression: () => MemberExpression,
  NewExpression: () => NewExpression,
  ObjectExpression: () => ObjectExpression,
  Property: () => Property,
  ReturnStatement: () => ReturnStatement,
  SequenceExpression: () => SequenceExpression,
  SwitchCase: () => SwitchCase,
  SwitchStatement: () => SwitchStatement,
  ThisExpression: () => ThisExpression,
  ThrowStatement: () => ThrowStatement,
  TryStatement: () => TryStatement,
  UnaryExpression: () => UnaryExpression,
  UpdateExpression: () => UpdateExpression,
  VariableDeclaration: () => VariableDeclaration,
  WhileStatement: () => WhileStatement
});

// dist/nodes/BaseJSNode.js
var BaseJSNode = class {
  constructor(node, visitor) {
    this.node = node;
    this.visitor = visitor;
  }
  run() {
  }
};

// dist/nodes/ArrayExpression.js
var ArrayExpression = class extends BaseJSNode {
  run() {
    return this.node.elements.map((el) => this.visitor.visitNode(el));
  }
};

// dist/utils/index.js
var utils_exports = {};
__export(utils_exports, {
  JinterError: () => JinterError,
  namedFunction: () => namedFunction
});
var namedFunction = (name, fn) => Object.defineProperty(fn, "name", { value: name });
var JinterError = class extends Error {
  constructor(message, info) {
    super(message);
    if (info) {
      this.info = info;
    }
  }
};

// dist/nodes/ArrowFunctionExpression.js
var ArrowFunctionExpression = class extends BaseJSNode {
  run() {
    const { params, body } = this.node;
    const fn = namedFunction("anonymous function", (args) => {
      let index = 0;
      for (const param of params) {
        this.visitor.visitNode(param);
        if (param.type === "Identifier") {
          this.visitor.scope.set(param.name, args[index]);
        } else {
          console.warn("Unhandled param type", param.type);
        }
        index++;
      }
      return this.visitor.visitNode(body);
    });
    return fn;
  }
};

// dist/nodes/AssignmentExpression.js
var AssignmentExpression = class extends BaseJSNode {
  run() {
    const operator = this.node.operator;
    const right_node = this.visitor.visitNode(this.node.right);
    switch (operator) {
      case "=":
        if (this.node.left.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.left.object);
          const prop = this.visitor.visitNode(this.node.left.property);
          return obj[prop] = right_node;
        } else if (this.node.left.type === "Identifier") {
          this.visitor.scope.set(this.node.left.name, right_node);
          return this.visitor.scope.get(this.node.left.name);
        }
        console.warn("Unhandled left node", this.node.left);
        break;
      case "+=":
        if (this.node.left.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.left.object);
          const prop = this.visitor.visitNode(this.node.left.property);
          return obj[prop] += right_node;
        } else if (this.node.left.type === "Identifier") {
          const result = this.visitor.visitNode(this.node.left) + right_node;
          this.visitor.scope.set(this.node.left.name, result);
          return this.visitor.scope.get(this.node.left.name);
        }
        console.warn("Unhandled left node", this.node.left);
        break;
      case "-=":
        if (this.node.left.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.left.object);
          const prop = this.visitor.visitNode(this.node.left.property);
          return obj[prop] -= right_node;
        } else if (this.node.left.type === "Identifier") {
          const result = this.visitor.visitNode(this.node.left) - right_node;
          this.visitor.scope.set(this.node.left.name, result);
          return this.visitor.scope.get(this.node.left.name);
        }
        console.warn("Unhandled left node", this.node.left);
        break;
      case "*=":
        if (this.node.left.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.left.object);
          const prop = this.visitor.visitNode(this.node.left.property);
          return obj[prop] *= right_node;
        } else if (this.node.left.type === "Identifier") {
          const result = this.visitor.visitNode(this.node.left) * right_node;
          this.visitor.scope.set(this.node.left.name, result);
          return this.visitor.scope.get(this.node.left.name);
        }
        console.warn("Unhandled left node", this.node.left);
        break;
      case "/=":
        if (this.node.left.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.left.object);
          const prop = this.visitor.visitNode(this.node.left.property);
          return obj[prop] /= right_node;
        } else if (this.node.left.type === "Identifier") {
          const result = this.visitor.visitNode(this.node.left) / right_node;
          this.visitor.scope.set(this.node.left.name, result);
          return this.visitor.scope.get(this.node.left.name);
        }
        console.warn("Unhandled left node", this.node.left);
        break;
      case "%=":
        if (this.node.left.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.left.object);
          const prop = this.visitor.visitNode(this.node.left.property);
          return obj[prop] %= right_node;
        } else if (this.node.left.type === "Identifier") {
          const result = this.visitor.visitNode(this.node.left) % right_node;
          this.visitor.scope.set(this.node.left.name, result);
          return this.visitor.scope.get(this.node.left.name);
        }
        console.warn("Unhandled left node", this.node.left);
        break;
      case "**=":
        if (this.node.left.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.left.object);
          const prop = this.visitor.visitNode(this.node.left.property);
          return obj[prop] **= right_node;
        } else if (this.node.left.type === "Identifier") {
          const result = this.visitor.visitNode(this.node.left) ** right_node;
          this.visitor.scope.set(this.node.left.name, result);
          return this.visitor.scope.get(this.node.left.name);
        }
        console.warn("Unhandled left node", this.node.left);
        break;
      case "<<=":
        if (this.node.left.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.left.object);
          const prop = this.visitor.visitNode(this.node.left.property);
          return obj[prop] <<= right_node;
        } else if (this.node.left.type === "Identifier") {
          const result = this.visitor.visitNode(this.node.left) << right_node;
          this.visitor.scope.set(this.node.left.name, result);
          return this.visitor.scope.get(this.node.left.name);
        }
        console.warn("Unhandled left node", this.node.left);
        break;
      case ">>=":
        if (this.node.left.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.left.object);
          const prop = this.visitor.visitNode(this.node.left.property);
          return obj[prop] >>= right_node;
        } else if (this.node.left.type === "Identifier") {
          const result = this.visitor.visitNode(this.node.left) >> right_node;
          this.visitor.scope.set(this.node.left.name, result);
          return this.visitor.scope.get(this.node.left.name);
        }
        console.warn("Unhandled left node", this.node.left);
        break;
      case ">>>=":
        if (this.node.left.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.left.object);
          const prop = this.visitor.visitNode(this.node.left.property);
          return obj[prop] >>>= right_node;
        } else if (this.node.left.type === "Identifier") {
          const result = this.visitor.visitNode(this.node.left) >>> right_node;
          this.visitor.scope.set(this.node.left.name, result);
          return this.visitor.scope.get(this.node.left.name);
        }
        console.warn("Unhandled left node", this.node.left);
        break;
      case "&=":
        if (this.node.left.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.left.object);
          const prop = this.visitor.visitNode(this.node.left.property);
          return obj[prop] &= right_node;
        } else if (this.node.left.type === "Identifier") {
          const result = this.visitor.visitNode(this.node.left) & right_node;
          this.visitor.scope.set(this.node.left.name, result);
          return this.visitor.scope.get(this.node.left.name);
        }
        console.warn("Unhandled left node", this.node.left);
        break;
    }
  }
};

// dist/nodes/BinaryExpression.js
var BinaryExpression = class extends BaseJSNode {
  run() {
    const operator = this.node.operator;
    const left_node = this.visitor.visitNode(this.node.left);
    const right_node = this.visitor.visitNode(this.node.right);
    switch (operator) {
      case "!=":
        return left_node != right_node;
      case "!==":
        return left_node !== right_node;
      case "%":
        return left_node % right_node;
      case "&":
        return left_node & right_node;
      case "*":
        return left_node * right_node;
      case "**":
        return left_node ** right_node;
      case "+":
        return left_node + right_node;
      case "-":
        return left_node - right_node;
      case "/":
        return left_node / right_node;
      case "<":
        return left_node < right_node;
      case "<<":
        return left_node << right_node;
      case "<=":
        return left_node <= right_node;
      case "==":
        return left_node == right_node;
      case "===":
        return left_node === right_node;
      case ">":
        return left_node > right_node;
      case ">=":
        return left_node >= right_node;
      case ">>":
        return left_node >> right_node;
      case ">>>":
        return left_node >>> right_node;
      case "^":
        return left_node ^ right_node;
      case "|":
        return left_node | right_node;
      case "in":
        return left_node in right_node;
      case "instanceof":
        return left_node instanceof right_node;
    }
  }
};

// dist/nodes/BlockStatement.js
var BlockStatement = class extends BaseJSNode {
  run() {
    for (const stmt of this.node.body) {
      const result = this.visitor.visitNode(stmt);
      if (stmt.type === "ReturnStatement")
        return result;
      if (result === "break" || result === "continue")
        return result;
      if ((stmt.type === "WhileStatement" || stmt.type === "IfStatement" || stmt.type === "ForStatement" || stmt.type === "TryStatement") && !!result) {
        return result;
      }
    }
  }
};

// dist/nodes/BreakStatement.js
var BreakStatement = class extends BaseJSNode {
  run() {
    return "break";
  }
};

// dist/nodes/CallExpression.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CallExpression_instances;
var _CallExpression_throwError;
var _CallExpression_getCalleeString;
var CallExpression = class extends BaseJSNode {
  constructor() {
    super(...arguments);
    _CallExpression_instances.add(this);
  }
  run() {
    let exp_object;
    let exp_property;
    if (this.node.callee.type === "MemberExpression") {
      exp_object = this.visitor.getName(this.node.callee.object);
      exp_property = this.visitor.getName(this.node.callee.property);
    } else if (this.node.callee.type === "Identifier") {
      exp_property = this.node.callee.name;
    }
    if (exp_object && this.visitor.listeners[exp_object]) {
      const cb = this.visitor.listeners[exp_object](this.node, this.visitor);
      if (cb !== "__continue_exec") {
        return cb;
      }
    }
    if (exp_property && exp_property !== "toString" && this.visitor.listeners[exp_property]) {
      const cb = this.visitor.listeners[exp_property](this.node, this.visitor);
      if (cb !== "__continue_exec") {
        return cb;
      }
    }
    if (this.node.callee.type === "MemberExpression") {
      if (Builtins.has(this.node, this.visitor)) {
        return Builtins.execute(this.node, this.visitor);
      }
      const obj = this.visitor.visitNode(this.node.callee.object);
      const prop = this.node.callee.computed ? this.visitor.visitNode(this.node.callee.property) : this.visitor.getName(this.node.callee.property);
      const args2 = this.node.arguments.map((arg) => this.visitor.visitNode(arg));
      if (!obj)
        __classPrivateFieldGet(this, _CallExpression_instances, "m", _CallExpression_throwError).call(this);
      if (typeof obj[prop] !== "function")
        __classPrivateFieldGet(this, _CallExpression_instances, "m", _CallExpression_throwError).call(this);
      if (obj[prop].toString().includes("[native code]"))
        return obj[prop](...args2);
      return obj[prop](args2);
    }
    const fn = this.visitor.visitNode(this.node.callee);
    const args = this.node.arguments.map((arg) => this.visitor.visitNode(arg));
    if (typeof fn !== "function")
      __classPrivateFieldGet(this, _CallExpression_instances, "m", _CallExpression_throwError).call(this);
    return fn(args);
  }
};
_CallExpression_instances = /* @__PURE__ */ new WeakSet(), _CallExpression_throwError = function _CallExpression_throwError2() {
  if (this.node.callee.type === "MemberExpression" || this.node.callee.type === "Identifier") {
    const callee_string = __classPrivateFieldGet(this, _CallExpression_instances, "m", _CallExpression_getCalleeString).call(this, this.node.callee);
    throw new JinterError(`${callee_string} is not a function`);
  } else if (this.node.callee.type === "SequenceExpression") {
    const call = [];
    const items = [];
    call.push("(");
    this.node.callee.expressions.forEach((expr) => {
      if (expr.type === "Literal") {
        items.push(expr.raw || "");
      } else if (expr.type === "Identifier") {
        items.push(expr.name);
      } else if (expr.type === "MemberExpression") {
        if (expr.computed) {
          items.push(`${this.visitor.getName(expr.object)}[${this.visitor.getName(expr.property) || "..."}]`);
        } else {
          items.push(`${this.visitor.getName(expr.object)}.${this.visitor.getName(expr.property)}`);
        }
      }
    });
    call.push(items.join(", "));
    call.push(")");
    throw new JinterError(`${call.join("")} is not a function`);
  }
}, _CallExpression_getCalleeString = function _CallExpression_getCalleeString2(node) {
  if (node.type === "Identifier") {
    return node.name;
  } else if (node.type === "MemberExpression") {
    const object_string = __classPrivateFieldGet(this, _CallExpression_instances, "m", _CallExpression_getCalleeString2).call(this, node.object);
    const property_string = node.computed ? `[${this.visitor.getName(node.property) || "..."}]` : `.${this.visitor.getName(node.property)}`;
    return `${object_string}${property_string}`;
  }
  return "<unknown>";
};
var Builtins = class {
  static has(node, visitor) {
    var _a;
    if (node.callee.type === "MemberExpression") {
      return !!((_a = this.builtins) === null || _a === void 0 ? void 0 : _a[visitor.getName(node.callee.property) || ""]);
    }
    return false;
  }
  static execute(node, visitor) {
    if (node.callee.type === "MemberExpression") {
      return this.builtins[visitor.getName(node.callee.property) || ""](node, visitor);
    }
  }
};
Builtins.builtins = {
  // Override the forEach method so that the "this" arg is set correctly
  forEach: (node, visitor) => {
    const args = node.arguments.map((arg) => visitor.visitNode(arg));
    if (node.callee.type === "MemberExpression") {
      const arr = visitor.visitNode(node.callee.object);
      if (args.length > 1) {
        visitor.scope.set("_this", args.slice(-1)[0]);
      }
      let index = 0;
      for (const element of arr) {
        args[0]([element, index++, arr]);
      }
    } else {
      console.warn("Unhandled callee type:", node.callee.type);
    }
  },
  // Also override the toString method so that it stringifies the correct object
  toString: (node, visitor) => {
    if (node.callee.type === "MemberExpression") {
      return visitor.visitNode(node.callee.object).toString();
    }
  }
};

// dist/nodes/ConditionalExpression.js
var ConditionalExpression = class extends BaseJSNode {
  run() {
    const { test, consequent, alternate } = this.node;
    const check = this.visitor.visitNode(test);
    if (check) {
      return this.visitor.visitNode(consequent);
    }
    return this.visitor.visitNode(alternate);
  }
};

// dist/nodes/ContinueStatement.js
var ContinueStatement = class extends BaseJSNode {
  run() {
    return "continue";
  }
};

// dist/nodes/ExpressionStatement.js
var ExpressionStatement = class extends BaseJSNode {
  run() {
    return this.visitor.visitNode(this.node.expression);
  }
};

// dist/nodes/ForOfStatement.js
var ForOfStatement = class extends BaseJSNode {
  run() {
    this.visitor.visitNode(this.node.left);
    const right_node = this.visitor.visitNode(this.node.right);
    for (const el of right_node) {
      if (this.node.left.type === "VariableDeclaration" && this.node.left.declarations[0].id.type === "Identifier") {
        this.visitor.scope.set(this.node.left.declarations[0].id.name, el);
      } else if (this.node.left.type === "VariableDeclaration" && this.node.left.declarations[0].id.type === "ObjectPattern") {
        for (const propert of this.node.left.declarations[0].id.properties) {
          if (propert.type === "Property" && (propert.value.type === "Identifier" && propert.key.type === "Identifier")) {
            this.visitor.scope.set(propert.value.name, el[propert.key.name]);
          }
        }
      }
      const body = this.visitor.visitNode(this.node.body);
      if (body === "break") {
        break;
      }
      if (body === "continue") {
        continue;
      }
      if (body && this.node.body.type !== "ExpressionStatement") {
        return body;
      }
    }
  }
};

// dist/nodes/ForStatement.js
var ForStatement = class extends BaseJSNode {
  run() {
    if (this.node.init) {
      this.visitor.visitNode(this.node.init);
    }
    const test = () => {
      return this.node.test ? this.visitor.visitNode(this.node.test) : true;
    };
    for (; ; ) {
      const _test = test();
      if (!_test) {
        break;
      }
      const body = this.visitor.visitNode(this.node.body);
      if (body === "continue") {
        continue;
      }
      if (body === "break") {
        break;
      }
      if (this.node.update) {
        this.visitor.visitNode(this.node.update);
      }
      if (body && this.node.body.type !== "ExpressionStatement") {
        return body;
      }
    }
  }
};

// dist/nodes/FunctionDeclaration.js
var FunctionDeclaration = class extends BaseJSNode {
  run() {
    const { params, body } = this.node;
    const id = this.visitor.visitNode(this.node.id);
    const fn = namedFunction(id, (args) => {
      let index = 0;
      for (const param of params) {
        this.visitor.visitNode(param);
        if (param.type === "Identifier") {
          this.visitor.scope.set(param.name, args[index]);
        } else {
          console.warn("Unhandled param type", param.type);
        }
        index++;
      }
      return this.visitor.visitNode(body);
    });
    this.visitor.scope.set(id, fn);
  }
};

// dist/nodes/FunctionExpression.js
var FunctionExpression = class extends BaseJSNode {
  run() {
    const { params, body } = this.node;
    const fn = namedFunction("anonymous function", (args) => {
      let index = 0;
      for (const param of params) {
        this.visitor.visitNode(param);
        if (param.type === "Identifier") {
          this.visitor.scope.set(param.name, args[index]);
        } else {
          console.warn("Unhandled param type", param.type);
        }
        index++;
      }
      return this.visitor.visitNode(body);
    });
    return fn;
  }
};

// dist/nodes/Identifier.js
var Identifier = class extends BaseJSNode {
  run() {
    if (this.visitor.listeners[this.node.name]) {
      const cb = this.visitor.listeners[this.node.name](this.node, this.visitor);
      if (cb !== "__continue_exec") {
        return cb;
      }
    }
    if (this.visitor.scope.has(this.node.name))
      return this.visitor.scope.get(this.node.name);
    return this.node.name;
  }
};

// dist/nodes/IfStatement.js
var IfStatement = class extends BaseJSNode {
  run() {
    const test = this.visitor.visitNode(this.node.test);
    if (test) {
      return this.visitor.visitNode(this.node.consequent);
    } else if (this.node.alternate) {
      return this.visitor.visitNode(this.node.alternate);
    }
  }
};

// dist/nodes/Literal.js
var Literal = class extends BaseJSNode {
  run() {
    return this.node.value;
  }
};

// dist/nodes/LogicalExpression.js
var LogicalExpression = class extends BaseJSNode {
  run() {
    const operator = this.node.operator;
    switch (operator) {
      case "&&": {
        const left_side = this.visitor.visitNode(this.node.left);
        if (left_side === true)
          return this.visitor.visitNode(this.node.right);
        return left_side;
      }
      case "||": {
        const left_side = this.visitor.visitNode(this.node.left);
        return left_side || this.visitor.visitNode(this.node.right);
      }
      case "??": {
        const left_side = this.visitor.visitNode(this.node.left);
        return left_side !== null && left_side !== void 0 ? left_side : this.visitor.visitNode(this.node.right);
      }
    }
  }
};

// dist/nodes/MemberExpression.js
var MemberExpression = class extends BaseJSNode {
  run() {
    const { object, property, computed } = this.node;
    const obj = this.visitor.visitNode(object);
    const prop = computed ? this.visitor.visitNode(property) : this.visitor.getName(property);
    if (prop !== void 0 || prop !== null) {
      if (this.visitor.listeners[prop]) {
        const cb = this.visitor.listeners[prop](this.node, this.visitor);
        if (cb !== "__continue_exec") {
          return cb;
        }
      }
      return obj === null || obj === void 0 ? void 0 : obj[prop];
    }
  }
};

// dist/nodes/NewExpression.js
var NewExpression = class extends BaseJSNode {
  run() {
    const callee = this.visitor.visitNode(this.node.callee);
    const args = this.node.arguments.map((arg) => this.visitor.visitNode(arg));
    return args.length ? new callee(args) : new callee();
  }
};

// dist/nodes/ObjectExpression.js
var ObjectExpression = class extends BaseJSNode {
  run() {
    let result = {};
    for (const prop of this.node.properties) {
      if (prop.type === "Property") {
        result = Object.assign(Object.assign({}, result), this.visitor.visitNode(prop));
      } else {
        throw new Error(`Unhandled property type: ${prop.type}`);
      }
    }
    return result;
  }
};

// dist/nodes/Property.js
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Property_instances;
var _Property_init;
var _Property_get;
var _Property_set;
var Property = class extends BaseJSNode {
  constructor() {
    super(...arguments);
    _Property_instances.add(this);
  }
  run() {
    switch (this.node.kind) {
      case "init":
        return __classPrivateFieldGet2(this, _Property_instances, "m", _Property_init).call(this);
      case "get":
        return __classPrivateFieldGet2(this, _Property_instances, "m", _Property_get).call(this);
      case "set":
        return __classPrivateFieldGet2(this, _Property_instances, "m", _Property_set).call(this);
      default:
        throw new Error(`Unhandled property kind: ${this.node.kind}`);
    }
  }
};
_Property_instances = /* @__PURE__ */ new WeakSet(), _Property_init = function _Property_init2() {
  const key = this.node.computed ? this.visitor.visitNode(this.node.key) : this.visitor.getName(this.node.key);
  const value = this.visitor.visitNode(this.node.value);
  if (key) {
    return { [key]: value };
  }
}, _Property_get = function _Property_get2() {
  throw new TypeError("Not implemented: Property.get");
}, _Property_set = function _Property_set2() {
  throw new TypeError("Not implemented: Property.set");
};

// dist/nodes/ReturnStatement.js
var ReturnStatement = class extends BaseJSNode {
  run() {
    if (this.node.argument) {
      return this.visitor.visitNode(this.node.argument);
    }
  }
};

// dist/nodes/SequenceExpression.js
var SequenceExpression = class extends BaseJSNode {
  run() {
    let result;
    for (const expression of this.node.expressions) {
      result = this.visitor.visitNode(expression);
    }
    return result;
  }
};

// dist/nodes/SwitchCase.js
var SwitchCase = class extends BaseJSNode {
  run() {
    for (const stmt of this.node.consequent) {
      const result = this.visitor.visitNode(stmt);
      if (stmt.type === "ContinueStatement" || stmt.type === "BreakStatement") {
        return result;
      }
    }
  }
};

// dist/nodes/SwitchStatement.js
var SwitchStatement = class extends BaseJSNode {
  run() {
    const discriminant = this.visitor.visitNode(this.node.discriminant);
    let matched = false;
    let default_case = -1;
    let index = 0;
    while (true) {
      const _case = this.node.cases[index];
      if (matched) {
        const result = this.visitor.visitNode(_case);
        if (result === "break") {
          break;
        }
        if (result === "continue") {
          return result;
        }
        ++index;
        if (index >= this.node.cases.length) {
          index = 0;
          break;
        } else {
          continue;
        }
      }
      matched = _case && discriminant === this.visitor.visitNode(_case.test);
      if (matched === void 0 && index > this.node.cases.length)
        break;
      if (_case && !matched && !_case.test) {
        default_case = index;
        index += 1;
        continue;
      }
      if (!_case && !matched && default_case !== -1) {
        matched = true;
        index = default_case;
        continue;
      }
      if (!matched) {
        ++index;
      }
    }
  }
};

// dist/nodes/ThisExpression.js
var ThisExpression = class extends BaseJSNode {
  run() {
    return this.visitor.scope.get("_this");
  }
};

// dist/nodes/ThrowStatement.js
var ThrowStatement = class extends BaseJSNode {
  run() {
    const arg = this.visitor.visitNode(this.node.argument);
    throw arg;
  }
};

// dist/nodes/TryStatement.js
var TryStatement = class extends BaseJSNode {
  run() {
    try {
      return this.visitor.visitNode(this.node.block);
    } catch (e) {
      if (this.node.handler) {
        if (this.node.handler.param && this.node.handler.param.type === "Identifier") {
          this.visitor.scope.set(this.node.handler.param.name, e);
        }
        return this.visitor.visitNode(this.node.handler.body);
      }
    } finally {
      this.visitor.visitNode(this.node.finalizer);
    }
  }
};

// dist/nodes/UnaryExpression.js
var UnaryExpression = class extends BaseJSNode {
  run() {
    const operator = this.node.operator;
    switch (operator) {
      case "-": {
        const arg = this.visitor.visitNode(this.node.argument);
        return -arg;
      }
      case "+": {
        const arg = this.visitor.visitNode(this.node.argument);
        return +arg;
      }
      case "!": {
        const arg = this.visitor.visitNode(this.node.argument);
        return !arg;
      }
      case "~": {
        const arg = this.visitor.visitNode(this.node.argument);
        return ~arg;
      }
      case "void": {
        this.visitor.visitNode(this.node.argument);
        return void 0;
      }
      case "typeof": {
        const arg = this.visitor.visitNode(this.node.argument);
        return typeof arg;
      }
      case "delete": {
        if (this.node.argument.type === "MemberExpression") {
          const obj = this.visitor.visitNode(this.node.argument.object);
          const prop = this.node.argument.computed ? this.visitor.visitNode(this.node.argument.property) : this.visitor.getName(this.node.argument.property);
          return delete obj[prop];
        } else if (this.node.argument.type === "Identifier") {
          return this.visitor.scope.delete(this.node.argument.name);
        }
        return true;
      }
      default:
        console.warn("Unhandled UnaryExpression operator", operator);
    }
  }
};

// dist/nodes/UpdateExpression.js
var UpdateExpression = class extends BaseJSNode {
  run() {
    const operator = this.node.operator;
    switch (operator) {
      case "++":
        {
          if (this.node.argument.type === "MemberExpression") {
            const target_node = this.visitor.visitNode(this.node.argument.object);
            return target_node[this.visitor.visitNode(this.node.argument.property)]++;
          } else if (this.node.argument.type === "Identifier") {
            let target_node = this.visitor.visitNode(this.node.argument);
            this.visitor.scope.set(this.node.argument.name, target_node + 1);
            return this.node.prefix ? ++target_node : target_node;
          }
        }
        break;
      case "--":
        {
          if (this.node.argument.type === "MemberExpression") {
            const target_node = this.visitor.visitNode(this.node.argument.object);
            return target_node[this.visitor.visitNode(this.node.argument.property)]--;
          } else if (this.node.argument.type === "Identifier") {
            let target_node = this.visitor.visitNode(this.node.argument);
            this.visitor.scope.set(this.node.argument.name, target_node - 1);
            return this.node.prefix ? --target_node : target_node;
          }
        }
        break;
    }
  }
};

// dist/nodes/VariableDeclaration.js
var VariableDeclaration = class extends BaseJSNode {
  run() {
    this.node.declarations.forEach((declar) => {
      const { id, init } = declar;
      const key = this.visitor.getName(id);
      const value = init ? this.visitor.visitNode(init) : void 0;
      if (key)
        this.visitor.scope.set(key, value);
      if (typeof value === "object" && value !== null)
        this.visitor.scope.set("_this", value);
    });
  }
};

// dist/nodes/WhileStatement.js
var WhileStatement = class extends BaseJSNode {
  run() {
    while (this.visitor.visitNode(this.node.test)) {
      const body = this.visitor.visitNode(this.node.body);
      if (body === "break")
        break;
      if (body === "continue")
        continue;
      if (body)
        return body;
    }
  }
};

// dist/visitor.js
var __classPrivateFieldGet3 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Visitor_instances;
var _Visitor_getNode;
var Visitor = class {
  constructor() {
    _Visitor_instances.add(this);
    this.scope = /* @__PURE__ */ new Map();
    this.listeners = {};
    this.ast = [];
  }
  setAST(ast) {
    this.ast = ast;
  }
  run() {
    let result;
    for (const node of this.ast) {
      result = this.visitNode(node);
    }
    return result;
  }
  /**
   * Visits a given node and executes it.
   */
  visitNode(node) {
    if (!node)
      return null;
    const target_node = __classPrivateFieldGet3(this, _Visitor_instances, "m", _Visitor_getNode).call(this, node.type);
    if (target_node) {
      const instance = new target_node(node, this);
      return instance.run();
    }
  }
  /**
   * Gets the name of a node.
   * @param node - The target node.
   */
  getName(node) {
    if (node.type === "Identifier")
      return node.name;
    else if (node.type === "Literal")
      return node.value;
  }
  /**
   * Listens for node calls. Can be used to override default behavior or add new functionality.
   * @param node_name - The node to listen for.
   * @param listener - The callback function.
   */
  on(node_name, listener) {
    this.listeners[node_name] = listener;
  }
};
_Visitor_instances = /* @__PURE__ */ new WeakSet(), _Visitor_getNode = function _Visitor_getNode2(type) {
  const node = nodes_exports[type];
  if (!node) {
    console.warn("[JINTER]:", `JavaScript node "${type}" not implemented!
If this is causing unexpected behavior, please report it at https://github.com/LuanRT/Jinter/issues/new`);
  }
  return node;
};

// dist/main.js
var import_acorn = require("acorn");
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet4 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Jinter_ast;
var Jinter = class {
  constructor() {
    _Jinter_ast.set(this, []);
    this.visitor = new Visitor();
    this.scope = this.visitor.scope;
    this.scope.set("print", (args) => console.log(...args));
    this.defineObject("console", console);
    this.defineObject("Math", Math);
    this.defineObject("String", String);
    this.defineObject("Array", Array);
    this.defineObject("Date", Date);
  }
  defineObject(name, obj) {
    this.visitor.on(name, (node, visitor) => {
      if (node.type === "Identifier")
        return obj;
      if (node.type === "CallExpression" && node.callee.type === "MemberExpression") {
        const prop = visitor.visitNode(node.callee.property);
        const args = node.arguments.map((arg) => visitor.visitNode(arg));
        const callable = obj[prop];
        if (!callable)
          return "__continue_exec";
        return callable.apply(obj, args);
      }
      return "__continue_exec";
    });
  }
  /**
   * Evaluates the program.
   * @returns The result of the last statement in the program.
   */
  evaluate(input) {
    try {
      const program = (0, import_acorn.parse)(input, { ecmaVersion: 2020 });
      __classPrivateFieldSet(this, _Jinter_ast, program.body, "f");
    } catch (e) {
      throw new JinterError(e.message);
    }
    this.visitor.setAST(__classPrivateFieldGet4(this, _Jinter_ast, "f"));
    return this.visitor.run();
  }
};
_Jinter_ast = /* @__PURE__ */ new WeakMap();

// dist/index.js
var dist_default = Jinter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Jinter,
  Nodes,
  Utils
});
//# sourceMappingURL=jinter.cjs.map