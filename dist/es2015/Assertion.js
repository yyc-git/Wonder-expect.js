import { ExpectData } from "./ExpectData";
import { JudgeUtils } from "wonder-commonlib/dist/es2015";
var Assertion = (function () {
    function Assertion() {
    }
    Assertion.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(Assertion.prototype, "not", {
        get: function () {
            ExpectData.isNot = true;
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Assertion.prototype, "be", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Assertion.prototype, "true", {
        get: function () {
            var source = ExpectData.source;
            this._assert(!!source === true, "true");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Assertion.prototype, "false", {
        get: function () {
            var source = ExpectData.source;
            this._assert(!!source === false, "false");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Assertion.prototype, "exist", {
        get: function () {
            var source = ExpectData.source;
            this._assert(source !== null && source !== void 0, "exist");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Assertion.prototype, "null", {
        get: function () {
            var source = ExpectData.source;
            this._assert(source === null, "null");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Assertion.prototype, "undefined", {
        get: function () {
            var source = ExpectData.source;
            this._assert(source === void 0, "undefined");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Assertion.prototype.equal = function (n) {
        var source = ExpectData.source;
        this._assert(source === n, "equal", n);
        return this;
    };
    Assertion.prototype.gt = function (n) {
        var source = ExpectData.source;
        this._assert(source > n, ">", n);
        return this;
    };
    Assertion.prototype.gte = function (n) {
        var source = ExpectData.source;
        this._assert(source >= n, ">=", n);
        return this;
    };
    Assertion.prototype.lt = function (n) {
        var source = ExpectData.source;
        this._assert(source < n, "<", n);
        return this;
    };
    Assertion.prototype.lte = function (n) {
        var source = ExpectData.source;
        this._assert(source <= n, "<=", n);
        return this;
    };
    Assertion.prototype.a = function (type) {
        var source = ExpectData.source;
        switch (type) {
            case "number":
                this._assert(JudgeUtils.isNumber(source), "number");
                break;
            case "array":
                this._assert(JudgeUtils.isArrayExactly(source), "array");
                break;
            case "boolean":
                this._assert(JudgeUtils.isBoolean(source), "boolean");
                break;
            case "string":
                this._assert(JudgeUtils.isStringExactly(source), "string");
                break;
            default:
                break;
        }
    };
    Assertion.prototype._buildFailMsg = function (operationStr, target) {
        if (!!target) {
            return "expected " + this._format(ExpectData.source) + " to be " + operationStr + " " + target;
        }
        return "expected " + this._format(ExpectData.source) + " to be " + operationStr;
    };
    Assertion.prototype._assert = function (passCondition, failMsg, target) {
        var pass = null, failMessage = null;
        if (ExpectData.isNot) {
            pass = !passCondition;
        }
        else {
            pass = passCondition;
        }
        if (pass) {
            ExpectData.isNot = false;
            return;
        }
        failMessage = this._buildFailMsg(failMsg, target);
        if (ExpectData.isNot) {
            ExpectData.isNot = false;
            failMessage = failMessage.replace("to be", "not to be");
        }
        throw new Error(failMessage);
    };
    Assertion.prototype._format = function (source) {
        return source;
    };
    return Assertion;
}());
export { Assertion };
//# sourceMappingURL=Assertion.js.map