var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = false;
$jscomp.ASSUME_NO_NATIVE_MAP = false;
$jscomp.ASSUME_NO_NATIVE_SET = false;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || typeof Object.defineProperties == 'function' ? Object.defineProperty : function(target, property, descriptor) {
  descriptor = descriptor;
  if (target == Array.prototype || target == Object.prototype) {
    return;
  }
  target[property] = descriptor.value;
};
$jscomp.getGlobal = function(maybeGlobal) {
  return typeof window != 'undefined' && window === maybeGlobal ? maybeGlobal : typeof global != 'undefined' && global != null ? global : maybeGlobal;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(target, polyfill, fromLang, toLang) {
  if (!polyfill) {
    return;
  }
  var obj = $jscomp.global;
  var split = target.split('.');
  for (var i = 0; i < split.length - 1; i++) {
    var key = split[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  var property = split[split.length - 1];
  var orig = obj[property];
  var impl = polyfill(orig);
  if (impl == orig || impl == null) {
    return;
  }
  $jscomp.defineProperty(obj, property, {configurable:true, writable:true, value:impl});
};
$jscomp.polyfill('Array.prototype.copyWithin', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, start, opt_end) {
    var len = this.length;
    target = Number(target);
    start = Number(start);
    opt_end = Number(opt_end != null ? opt_end : len);
    if (target < start) {
      opt_end = Math.min(opt_end, len);
      while (start < opt_end) {
        if (start in this) {
          this[target++] = this[start++];
        } else {
          delete this[target++];
          start++;
        }
      }
    } else {
      opt_end = Math.min(opt_end, len + start - target);
      target += opt_end - start;
      while (opt_end > start) {
        if (--opt_end in this) {
          this[--target] = this[opt_end];
        } else {
          delete this[target];
        }
      }
    }
    return this;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.SYMBOL_PREFIX = 'jscomp_symbol_';
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  if (!$jscomp.global['Symbol']) {
    $jscomp.global['Symbol'] = $jscomp.Symbol;
  }
};
$jscomp.Symbol = function() {
  var counter = 0;
  function Symbol(opt_description) {
    return $jscomp.SYMBOL_PREFIX + (opt_description || '') + counter++;
  }
  return Symbol;
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var symbolIterator = $jscomp.global['Symbol'].iterator;
  if (!symbolIterator) {
    symbolIterator = $jscomp.global['Symbol'].iterator = $jscomp.global['Symbol']('iterator');
  }
  if (typeof Array.prototype[symbolIterator] != 'function') {
    $jscomp.defineProperty(Array.prototype, symbolIterator, {configurable:true, writable:true, value:function() {
      return $jscomp.arrayIterator(this);
    }});
  }
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(array) {
  var index = 0;
  return $jscomp.iteratorPrototype(function() {
    if (index < array.length) {
      return {done:false, value:array[index++]};
    } else {
      return {done:true};
    }
  });
};
$jscomp.iteratorPrototype = function(next) {
  $jscomp.initSymbolIterator();
  var iterator = {next:next};
  iterator[$jscomp.global['Symbol'].iterator] = function() {
    return this;
  };
  return iterator;
};
$jscomp.iteratorFromArray = function(array, transform) {
  $jscomp.initSymbolIterator();
  if (array instanceof String) {
    array = array + '';
  }
  var i = 0;
  var iter = {next:function() {
    if (i < array.length) {
      var index = i++;
      return {value:transform(index, array[index]), done:false};
    }
    iter.next = function() {
      return {done:true, value:void 0};
    };
    return iter.next();
  }};
  iter[Symbol.iterator] = function() {
    return iter;
  };
  return iter;
};
$jscomp.polyfill('Array.prototype.entries', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i, v) {
      return [i, v];
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.fill', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(value, opt_start, opt_end) {
    var length = this.length || 0;
    if (opt_start < 0) {
      opt_start = Math.max(0, length + opt_start);
    }
    if (opt_end == null || opt_end > length) {
      opt_end = length;
    }
    opt_end = Number(opt_end);
    if (opt_end < 0) {
      opt_end = Math.max(0, length + opt_end);
    }
    for (var i = Number(opt_start || 0); i < opt_end; i++) {
      this[i] = value;
    }
    return this;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.findInternal = function(array, callback, thisArg) {
  if (array instanceof String) {
    array = String(array);
  }
  var len = array.length;
  for (var i = 0; i < len; i++) {
    var value = array[i];
    if (callback.call(thisArg, value, i, array)) {
      return {i:i, v:value};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill('Array.prototype.find', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(callback, opt_thisArg) {
    return $jscomp.findInternal(this, callback, opt_thisArg).v;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.findIndex', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(callback, opt_thisArg) {
    return $jscomp.findInternal(this, callback, opt_thisArg).i;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.from', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(arrayLike, opt_mapFn, opt_thisArg) {
    $jscomp.initSymbolIterator();
    opt_mapFn = opt_mapFn != null ? opt_mapFn : function(x) {
      return x;
    };
    var result = [];
    var iteratorFunction = arrayLike[Symbol.iterator];
    if (typeof iteratorFunction == 'function') {
      arrayLike = iteratorFunction.call(arrayLike);
      var next;
      var k = 0;
      while (!(next = arrayLike.next()).done) {
        result.push(opt_mapFn.call(opt_thisArg, next.value, k++));
      }
    } else {
      var len = arrayLike.length;
      for (var i = 0; i < len; i++) {
        result.push(opt_mapFn.call(opt_thisArg, arrayLike[i], i));
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Object.is', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(left, right) {
    if (left === right) {
      return left !== 0 || 1 / left === 1 / right;
    } else {
      return left !== left && right !== right;
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.includes', function(orig) {
  if (orig) {
    return orig;
  }
  var includes = function(searchElement, opt_fromIndex) {
    var array = this;
    if (array instanceof String) {
      array = String(array);
    }
    var len = array.length;
    var i = opt_fromIndex || 0;
    if (i < 0) {
      i = Math.max(i + len, 0);
    }
    for (; i < len; i++) {
      var element = array[i];
      if (element === searchElement || Object.is(element, searchElement)) {
        return true;
      }
    }
    return false;
  };
  return includes;
}, 'es7', 'es3');
$jscomp.polyfill('Array.prototype.keys', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i) {
      return i;
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.of', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(var_args) {
    return Array.from(arguments);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.values', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(k, v) {
      return v;
    });
  };
  return polyfill;
}, 'es8', 'es3');
$jscomp.makeIterator = function(iterable) {
  $jscomp.initSymbolIterator();
  var iteratorFunction = iterable[Symbol.iterator];
  return iteratorFunction ? iteratorFunction.call(iterable) : $jscomp.arrayIterator(iterable);
};
$jscomp.FORCE_POLYFILL_PROMISE = false;
$jscomp.polyfill('Promise', function(NativePromise) {
  if (NativePromise && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return NativePromise;
  }
  function AsyncExecutor() {
    this.batch_ = null;
  }
  AsyncExecutor.prototype.asyncExecute = function(f) {
    if (this.batch_ == null) {
      this.batch_ = [];
      this.asyncExecuteBatch_();
    }
    this.batch_.push(f);
    return this;
  };
  AsyncExecutor.prototype.asyncExecuteBatch_ = function() {
    var self = this;
    this.asyncExecuteFunction(function() {
      self.executeBatch_();
    });
  };
  var nativeSetTimeout = $jscomp.global['setTimeout'];
  AsyncExecutor.prototype.asyncExecuteFunction = function(f) {
    nativeSetTimeout(f, 0);
  };
  AsyncExecutor.prototype.executeBatch_ = function() {
    while (this.batch_ && this.batch_.length) {
      var executingBatch = this.batch_;
      this.batch_ = [];
      for (var i = 0; i < executingBatch.length; ++i) {
        var f = executingBatch[i];
        executingBatch[i] = null;
        try {
          f();
        } catch (error) {
          this.asyncThrow_(error);
        }
      }
    }
    this.batch_ = null;
  };
  AsyncExecutor.prototype.asyncThrow_ = function(exception) {
    this.asyncExecuteFunction(function() {
      throw exception;
    });
  };
  var PromiseState = {PENDING:0, FULFILLED:1, REJECTED:2};
  var PolyfillPromise = function(executor) {
    this.state_ = PromiseState.PENDING;
    this.result_ = undefined;
    this.onSettledCallbacks_ = [];
    var resolveAndReject = this.createResolveAndReject_();
    try {
      executor(resolveAndReject.resolve, resolveAndReject.reject);
    } catch (e) {
      resolveAndReject.reject(e);
    }
  };
  PolyfillPromise.prototype.createResolveAndReject_ = function() {
    var thisPromise = this;
    var alreadyCalled = false;
    function firstCallWins(method) {
      return function(x) {
        if (!alreadyCalled) {
          alreadyCalled = true;
          method.call(thisPromise, x);
        }
      };
    }
    return {resolve:firstCallWins(this.resolveTo_), reject:firstCallWins(this.reject_)};
  };
  PolyfillPromise.prototype.resolveTo_ = function(value) {
    if (value === this) {
      this.reject_(new TypeError('A Promise cannot resolve to itself'));
    } else {
      if (value instanceof PolyfillPromise) {
        this.settleSameAsPromise_(value);
      } else {
        if (isObject(value)) {
          this.resolveToNonPromiseObj_(value);
        } else {
          this.fulfill_(value);
        }
      }
    }
  };
  PolyfillPromise.prototype.resolveToNonPromiseObj_ = function(obj) {
    var thenMethod = undefined;
    try {
      thenMethod = obj.then;
    } catch (error) {
      this.reject_(error);
      return;
    }
    if (typeof thenMethod == 'function') {
      this.settleSameAsThenable_(thenMethod, obj);
    } else {
      this.fulfill_(obj);
    }
  };
  function isObject(value) {
    switch(typeof value) {
      case 'object':
        return value != null;
      case 'function':
        return true;
      default:
        return false;
    }
  }
  PolyfillPromise.prototype.reject_ = function(reason) {
    this.settle_(PromiseState.REJECTED, reason);
  };
  PolyfillPromise.prototype.fulfill_ = function(value) {
    this.settle_(PromiseState.FULFILLED, value);
  };
  PolyfillPromise.prototype.settle_ = function(settledState, valueOrReason) {
    if (this.state_ != PromiseState.PENDING) {
      throw new Error('Cannot settle(' + settledState + ', ' + valueOrReason + '): Promise already settled in state' + this.state_);
    }
    this.state_ = settledState;
    this.result_ = valueOrReason;
    this.executeOnSettledCallbacks_();
  };
  PolyfillPromise.prototype.executeOnSettledCallbacks_ = function() {
    if (this.onSettledCallbacks_ != null) {
      for (var i = 0; i < this.onSettledCallbacks_.length; ++i) {
        asyncExecutor.asyncExecute(this.onSettledCallbacks_[i]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var asyncExecutor = new AsyncExecutor;
  PolyfillPromise.prototype.settleSameAsPromise_ = function(promise) {
    var methods = this.createResolveAndReject_();
    promise.callWhenSettled_(methods.resolve, methods.reject);
  };
  PolyfillPromise.prototype.settleSameAsThenable_ = function(thenMethod, thenable) {
    var methods = this.createResolveAndReject_();
    try {
      thenMethod.call(thenable, methods.resolve, methods.reject);
    } catch (error) {
      methods.reject(error);
    }
  };
  PolyfillPromise.prototype.then = function(onFulfilled, onRejected) {
    var resolveChild;
    var rejectChild;
    var childPromise = new PolyfillPromise(function(resolve, reject) {
      resolveChild = resolve;
      rejectChild = reject;
    });
    function createCallback(paramF, defaultF) {
      if (typeof paramF == 'function') {
        return function(x) {
          try {
            resolveChild(paramF(x));
          } catch (error) {
            rejectChild(error);
          }
        };
      } else {
        return defaultF;
      }
    }
    this.callWhenSettled_(createCallback(onFulfilled, resolveChild), createCallback(onRejected, rejectChild));
    return childPromise;
  };
  PolyfillPromise.prototype['catch'] = function(onRejected) {
    return this.then(undefined, onRejected);
  };
  PolyfillPromise.prototype.callWhenSettled_ = function(onFulfilled, onRejected) {
    var thisPromise = this;
    function callback() {
      switch(thisPromise.state_) {
        case PromiseState.FULFILLED:
          onFulfilled(thisPromise.result_);
          break;
        case PromiseState.REJECTED:
          onRejected(thisPromise.result_);
          break;
        default:
          throw new Error('Unexpected state: ' + thisPromise.state_);
      }
    }
    if (this.onSettledCallbacks_ == null) {
      asyncExecutor.asyncExecute(callback);
    } else {
      this.onSettledCallbacks_.push(callback);
    }
  };
  function resolvingPromise(opt_value) {
    if (opt_value instanceof PolyfillPromise) {
      return opt_value;
    } else {
      return new PolyfillPromise(function(resolve, reject) {
        resolve(opt_value);
      });
    }
  }
  PolyfillPromise['resolve'] = resolvingPromise;
  PolyfillPromise['reject'] = function(opt_reason) {
    return new PolyfillPromise(function(resolve, reject) {
      reject(opt_reason);
    });
  };
  PolyfillPromise['race'] = function(thenablesOrValues) {
    return new PolyfillPromise(function(resolve, reject) {
      var iterator = $jscomp.makeIterator(thenablesOrValues);
      for (var iterRec = iterator.next(); !iterRec.done; iterRec = iterator.next()) {
        resolvingPromise(iterRec.value).callWhenSettled_(resolve, reject);
      }
    });
  };
  PolyfillPromise['all'] = function(thenablesOrValues) {
    var iterator = $jscomp.makeIterator(thenablesOrValues);
    var iterRec = iterator.next();
    if (iterRec.done) {
      return resolvingPromise([]);
    } else {
      return new PolyfillPromise(function(resolveAll, rejectAll) {
        var resultsArray = [];
        var unresolvedCount = 0;
        function onFulfilled(i) {
          return function(ithResult) {
            resultsArray[i] = ithResult;
            unresolvedCount--;
            if (unresolvedCount == 0) {
              resolveAll(resultsArray);
            }
          };
        }
        do {
          resultsArray.push(undefined);
          unresolvedCount++;
          resolvingPromise(iterRec.value).callWhenSettled_(onFulfilled(resultsArray.length - 1), rejectAll);
          iterRec = iterator.next();
        } while (!iterRec.done);
      });
    }
  };
  return PolyfillPromise;
}, 'es6', 'es3');
$jscomp.polyfill('Promise.prototype.finally', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(onFinally) {
    return this.then(function(value) {
      var promise = Promise.resolve(onFinally());
      return promise.then(function() {
        return value;
      });
    }, function(reason) {
      var promise = Promise.resolve(onFinally());
      return promise.then(function() {
        throw reason;
      });
    });
  };
  return polyfill;
}, 'es9', 'es3');
$jscomp.underscoreProtoCanBeSet = function() {
  var x = {a:true};
  var y = {};
  try {
    y.__proto__ = x;
    return y.a;
  } catch (e) {
  }
  return false;
};
$jscomp.setPrototypeOf = typeof Object.setPrototypeOf == 'function' ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(target, proto) {
  target.__proto__ = proto;
  if (target.__proto__ !== proto) {
    throw new TypeError(target + ' is not extensible');
  }
  return target;
} : null;
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function(result) {
  if (result instanceof Object) {
    return;
  }
  throw new TypeError('Iterator result ' + result + ' is not an object');
};
$jscomp.generator.Context = function() {
  this.isRunning_ = false;
  this.yieldAllIterator_ = null;
  this.yieldResult = undefined;
  this.nextAddress = 1;
  this.catchAddress_ = 0;
  this.finallyAddress_ = 0;
  this.abruptCompletion_ = null;
  this.finallyContexts_ = null;
};
$jscomp.generator.Context.prototype.start_ = function() {
  if (this.isRunning_) {
    throw new TypeError('Generator is already running');
  }
  this.isRunning_ = true;
};
$jscomp.generator.Context.prototype.stop_ = function() {
  this.isRunning_ = false;
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function() {
  this.nextAddress = this.catchAddress_ || this.finallyAddress_;
};
$jscomp.generator.Context.prototype.next_ = function(value) {
  this.yieldResult = value;
};
$jscomp.generator.Context.prototype.throw_ = function(e) {
  this.abruptCompletion_ = {exception:e, isException:true};
  this.jumpToErrorHandler_();
};
$jscomp.generator.Context.prototype['return'] = function(value) {
  this.abruptCompletion_ = {'return':value};
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function(nextAddress) {
  this.abruptCompletion_ = {jumpTo:nextAddress};
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.yield = function(value, resumeAddress) {
  this.nextAddress = resumeAddress;
  return {value:value};
};
$jscomp.generator.Context.prototype.yieldAll = function(iterable, resumeAddress) {
  var iterator = $jscomp.makeIterator(iterable);
  var result = iterator.next();
  $jscomp.generator.ensureIteratorResultIsObject_(result);
  if (result.done) {
    this.yieldResult = result.value;
    this.nextAddress = resumeAddress;
    return;
  }
  this.yieldAllIterator_ = iterator;
  return this.yield(result.value, resumeAddress);
};
$jscomp.generator.Context.prototype.jumpTo = function(nextAddress) {
  this.nextAddress = nextAddress;
};
$jscomp.generator.Context.prototype.jumpToEnd = function() {
  this.nextAddress = 0;
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function(catchAddress, finallyAddress) {
  this.catchAddress_ = catchAddress;
  if (finallyAddress != undefined) {
    this.finallyAddress_ = finallyAddress;
  }
};
$jscomp.generator.Context.prototype.setFinallyBlock = function(finallyAddress) {
  this.catchAddress_ = 0;
  this.finallyAddress_ = finallyAddress || 0;
};
$jscomp.generator.Context.prototype.leaveTryBlock = function(nextAddress, catchAddress) {
  this.nextAddress = nextAddress;
  this.catchAddress_ = catchAddress || 0;
};
$jscomp.generator.Context.prototype.enterCatchBlock = function(nextCatchBlockAddress) {
  this.catchAddress_ = nextCatchBlockAddress || 0;
  var exception = this.abruptCompletion_.exception;
  this.abruptCompletion_ = null;
  return exception;
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function(nextCatchAddress, nextFinallyAddress, finallyDepth) {
  if (!finallyDepth) {
    this.finallyContexts_ = [this.abruptCompletion_];
  } else {
    this.finallyContexts_[finallyDepth] = this.abruptCompletion_;
  }
  this.catchAddress_ = nextCatchAddress || 0;
  this.finallyAddress_ = nextFinallyAddress || 0;
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function(nextAddress, finallyDepth) {
  var preservedContext = this.finallyContexts_.splice(finallyDepth || 0)[0];
  var abruptCompletion = this.abruptCompletion_ = this.abruptCompletion_ || preservedContext;
  if (abruptCompletion) {
    if (abruptCompletion.isException) {
      return this.jumpToErrorHandler_();
    }
    if (abruptCompletion.jumpTo != undefined && this.finallyAddress_ < abruptCompletion.jumpTo) {
      this.nextAddress = abruptCompletion.jumpTo;
      this.abruptCompletion_ = null;
    } else {
      this.nextAddress = this.finallyAddress_;
    }
  } else {
    this.nextAddress = nextAddress;
  }
};
$jscomp.generator.Context.prototype.forIn = function(object) {
  return new $jscomp.generator.Context.PropertyIterator(object);
};
$jscomp.generator.Context.PropertyIterator = function(object) {
  this.object_ = object;
  this.properties_ = [];
  for (var property in object) {
    this.properties_.push(property);
  }
  this.properties_.reverse();
};
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function() {
  while (this.properties_.length > 0) {
    var property = this.properties_.pop();
    if (property in this.object_) {
      return property;
    }
  }
  return null;
};
$jscomp.generator.Engine_ = function(program) {
  this.context_ = new $jscomp.generator.Context;
  this.program_ = program;
};
$jscomp.generator.Engine_.prototype.next_ = function(value) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.next, value, this.context_.next_);
  }
  this.context_.next_(value);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.return_ = function(value) {
  this.context_.start_();
  var yieldAllIterator = this.context_.yieldAllIterator_;
  if (yieldAllIterator) {
    var returnFunction = 'return' in yieldAllIterator ? yieldAllIterator['return'] : function(v) {
      return {value:v, done:true};
    };
    return this.yieldAllStep_(returnFunction, value, this.context_['return']);
  }
  this.context_['return'](value);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.throw_ = function(exception) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_['throw'], exception, this.context_.next_);
  }
  this.context_.throw_(exception);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(action, value, nextAction) {
  try {
    var result = action.call(this.context_.yieldAllIterator_, value);
    $jscomp.generator.ensureIteratorResultIsObject_(result);
    if (!result.done) {
      this.context_.stop_();
      return result;
    }
    var resultValue = result.value;
  } catch (e) {
    this.context_.yieldAllIterator_ = null;
    this.context_.throw_(e);
    return this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  nextAction.call(this.context_, resultValue);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.nextStep_ = function() {
  while (this.context_.nextAddress) {
    try {
      var yieldValue = this.program_(this.context_);
      if (yieldValue) {
        this.context_.stop_();
        return {value:yieldValue.value, done:false};
      }
    } catch (e) {
      this.context_.yieldResult = undefined;
      this.context_.throw_(e);
    }
  }
  this.context_.stop_();
  if (this.context_.abruptCompletion_) {
    var abruptCompletion = this.context_.abruptCompletion_;
    this.context_.abruptCompletion_ = null;
    if (abruptCompletion.isException) {
      throw abruptCompletion.exception;
    }
    return {value:abruptCompletion['return'], done:true};
  }
  return {value:undefined, done:true};
};
$jscomp.generator.Generator_ = function(engine) {
  this.next = function(opt_value) {
    return engine.next_(opt_value);
  };
  this['throw'] = function(exception) {
    return engine.throw_(exception);
  };
  this['return'] = function(value) {
    return engine.return_(value);
  };
  $jscomp.initSymbolIterator();
  this[Symbol.iterator] = function() {
    return this;
  };
};
$jscomp.generator.createGenerator = function(generator, program) {
  var result = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(program));
  if ($jscomp.setPrototypeOf) {
    $jscomp.setPrototypeOf(result, generator.prototype);
  }
  return result;
};
$jscomp.asyncExecutePromiseGenerator = function(generator) {
  function passValueToGenerator(value) {
    return generator.next(value);
  }
  function passErrorToGenerator(error) {
    return generator['throw'](error);
  }
  return new Promise(function(resolve, reject) {
    function handleGeneratorRecord(genRec) {
      if (genRec.done) {
        resolve(genRec.value);
      } else {
        Promise.resolve(genRec.value).then(passValueToGenerator, passErrorToGenerator).then(handleGeneratorRecord, reject);
      }
    }
    handleGeneratorRecord(generator.next());
  });
};
$jscomp.asyncExecutePromiseGeneratorFunction = function(generatorFunction) {
  return $jscomp.asyncExecutePromiseGenerator(generatorFunction());
};
$jscomp.asyncExecutePromiseGeneratorProgram = function(program) {
  return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(program)));
};
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var proxied = {};
    var proxy = Object.create(new $jscomp.global['Proxy'](proxied, {'get':function(target, key, receiver) {
      return target == proxied && key == 'q' && receiver == proxy;
    }}));
    return proxy['q'] === true;
  } catch (err) {
    return false;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = false;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.owns = function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
$jscomp.polyfill('WeakMap', function(NativeWeakMap) {
  function isConformant() {
    if (!NativeWeakMap || !Object.seal) {
      return false;
    }
    try {
      var x = Object.seal({});
      var y = Object.seal({});
      var map = new NativeWeakMap([[x, 2], [y, 3]]);
      if (map.get(x) != 2 || map.get(y) != 3) {
        return false;
      }
      map['delete'](x);
      map.set(y, 4);
      return !map.has(x) && map.get(y) == 4;
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeWeakMap && $jscomp.ES6_CONFORMANCE) {
      return NativeWeakMap;
    }
  } else {
    if (isConformant()) {
      return NativeWeakMap;
    }
  }
  var prop = '$jscomp_hidden_' + Math.random();
  function insert(target) {
    if (!$jscomp.owns(target, prop)) {
      var obj = {};
      $jscomp.defineProperty(target, prop, {value:obj});
    }
  }
  function patch(name) {
    var prev = Object[name];
    if (prev) {
      Object[name] = function(target) {
        insert(target);
        return prev(target);
      };
    }
  }
  patch('freeze');
  patch('preventExtensions');
  patch('seal');
  var index = 0;
  var PolyfillWeakMap = function(opt_iterable) {
    this.id_ = (index += Math.random() + 1).toString();
    if (opt_iterable) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillWeakMap.prototype.set = function(key, value) {
    insert(key);
    if (!$jscomp.owns(key, prop)) {
      throw new Error('WeakMap key fail: ' + key);
    }
    key[prop][this.id_] = value;
    return this;
  };
  PolyfillWeakMap.prototype.get = function(key) {
    return $jscomp.owns(key, prop) ? key[prop][this.id_] : undefined;
  };
  PolyfillWeakMap.prototype.has = function(key) {
    return $jscomp.owns(key, prop) && $jscomp.owns(key[prop], this.id_);
  };
  PolyfillWeakMap.prototype['delete'] = function(key) {
    if (!$jscomp.owns(key, prop) || !$jscomp.owns(key[prop], this.id_)) {
      return false;
    }
    return delete key[prop][this.id_];
  };
  return PolyfillWeakMap;
}, 'es6', 'es3');
$jscomp.MapEntry = function() {
  this.previous;
  this.next;
  this.head;
  this.key;
  this.value;
};
$jscomp.polyfill('Map', function(NativeMap) {
  function isConformant() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !NativeMap || typeof NativeMap != 'function' || !NativeMap.prototype.entries || typeof Object.seal != 'function') {
      return false;
    }
    try {
      NativeMap = NativeMap;
      var key = Object.seal({x:4});
      var map = new NativeMap($jscomp.makeIterator([[key, 's']]));
      if (map.get(key) != 's' || map.size != 1 || map.get({x:4}) || map.set({x:4}, 't') != map || map.size != 2) {
        return false;
      }
      var iter = map.entries();
      var item = iter.next();
      if (item.done || item.value[0] != key || item.value[1] != 's') {
        return false;
      }
      item = iter.next();
      if (item.done || item.value[0].x != 4 || item.value[1] != 't' || !iter.next().done) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeMap && $jscomp.ES6_CONFORMANCE) {
      return NativeMap;
    }
  } else {
    if (isConformant()) {
      return NativeMap;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var idMap = new WeakMap;
  var PolyfillMap = function(opt_iterable) {
    this.data_ = {};
    this.head_ = createHead();
    this.size = 0;
    if (opt_iterable) {
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillMap.prototype.set = function(key, value) {
    key = key === 0 ? 0 : key;
    var r = maybeGetEntry(this, key);
    if (!r.list) {
      r.list = this.data_[r.id] = [];
    }
    if (!r.entry) {
      r.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:key, value:value};
      r.list.push(r.entry);
      this.head_.previous.next = r.entry;
      this.head_.previous = r.entry;
      this.size++;
    } else {
      r.entry.value = value;
    }
    return this;
  };
  PolyfillMap.prototype['delete'] = function(key) {
    var r = maybeGetEntry(this, key);
    if (r.entry && r.list) {
      r.list.splice(r.index, 1);
      if (!r.list.length) {
        delete this.data_[r.id];
      }
      r.entry.previous.next = r.entry.next;
      r.entry.next.previous = r.entry.previous;
      r.entry.head = null;
      this.size--;
      return true;
    }
    return false;
  };
  PolyfillMap.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = createHead();
    this.size = 0;
  };
  PolyfillMap.prototype.has = function(key) {
    return !!maybeGetEntry(this, key).entry;
  };
  PolyfillMap.prototype.get = function(key) {
    var entry = maybeGetEntry(this, key).entry;
    return entry && entry.value;
  };
  PolyfillMap.prototype.entries = function() {
    return makeIterator(this, function(entry) {
      return [entry.key, entry.value];
    });
  };
  PolyfillMap.prototype.keys = function() {
    return makeIterator(this, function(entry) {
      return entry.key;
    });
  };
  PolyfillMap.prototype.values = function() {
    return makeIterator(this, function(entry) {
      return entry.value;
    });
  };
  PolyfillMap.prototype.forEach = function(callback, opt_thisArg) {
    var iter = this.entries();
    var item;
    while (!(item = iter.next()).done) {
      var entry = item.value;
      callback.call(opt_thisArg, entry[1], entry[0], this);
    }
  };
  PolyfillMap.prototype[Symbol.iterator] = PolyfillMap.prototype.entries;
  var maybeGetEntry = function(map, key) {
    var id = getId(key);
    var list = map.data_[id];
    if (list && $jscomp.owns(map.data_, id)) {
      for (var index = 0; index < list.length; index++) {
        var entry = list[index];
        if (key !== key && entry.key !== entry.key || key === entry.key) {
          return {id:id, list:list, index:index, entry:entry};
        }
      }
    }
    return {id:id, list:list, index:-1, entry:undefined};
  };
  var makeIterator = function(map, func) {
    var entry = map.head_;
    return $jscomp.iteratorPrototype(function() {
      if (entry) {
        while (entry.head != map.head_) {
          entry = entry.previous;
        }
        while (entry.next != entry.head) {
          entry = entry.next;
          return {done:false, value:func(entry)};
        }
        entry = null;
      }
      return {done:true, value:void 0};
    });
  };
  var createHead = function() {
    var head = {};
    head.previous = head.next = head.head = head;
    return head;
  };
  var mapIndex = 0;
  var getId = function(obj) {
    var type = obj && typeof obj;
    if (type == 'object' || type == 'function') {
      obj = obj;
      if (!idMap.has(obj)) {
        var id = '' + ++mapIndex;
        idMap.set(obj, id);
        return id;
      }
      return idMap.get(obj);
    }
    return 'p_' + obj;
  };
  return PolyfillMap;
}, 'es6', 'es3');
$jscomp.polyfill('Math.acosh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    return Math.log(x + Math.sqrt(x * x - 1));
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.asinh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    var y = Math.log(Math.abs(x) + Math.sqrt(x * x + 1));
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log1p', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x < 0.25 && x > -0.25) {
      var y = x;
      var d = 1;
      var z = x;
      var zPrev = 0;
      var s = 1;
      while (zPrev != z) {
        y *= x;
        s *= -1;
        z = (zPrev = z) + s * y / ++d;
      }
      return z;
    }
    return Math.log(1 + x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.atanh', function(orig) {
  if (orig) {
    return orig;
  }
  var log1p = Math.log1p;
  var polyfill = function(x) {
    x = Number(x);
    return (log1p(x) - log1p(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.cbrt', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (x === 0) {
      return x;
    }
    x = Number(x);
    var y = Math.pow(Math.abs(x), 1 / 3);
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.clz32', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x) >>> 0;
    if (x === 0) {
      return 32;
    }
    var result = 0;
    if ((x & 4294901760) === 0) {
      x <<= 16;
      result += 16;
    }
    if ((x & 4278190080) === 0) {
      x <<= 8;
      result += 8;
    }
    if ((x & 4026531840) === 0) {
      x <<= 4;
      result += 4;
    }
    if ((x & 3221225472) === 0) {
      x <<= 2;
      result += 2;
    }
    if ((x & 2147483648) === 0) {
      result++;
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.cosh', function(orig) {
  if (orig) {
    return orig;
  }
  var exp = Math.exp;
  var polyfill = function(x) {
    x = Number(x);
    return (exp(x) + exp(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.expm1', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x < .25 && x > -.25) {
      var y = x;
      var d = 1;
      var z = x;
      var zPrev = 0;
      while (zPrev != z) {
        y *= x / ++d;
        z = (zPrev = z) + y;
      }
      return z;
    }
    return Math.exp(x) - 1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.hypot', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x, y, var_args) {
    x = Number(x);
    y = Number(y);
    var i, z, sum;
    var max = Math.max(Math.abs(x), Math.abs(y));
    for (i = 2; i < arguments.length; i++) {
      max = Math.max(max, Math.abs(arguments[i]));
    }
    if (max > 1e100 || max < 1e-100) {
      if (!max) {
        return max;
      }
      x = x / max;
      y = y / max;
      sum = x * x + y * y;
      for (i = 2; i < arguments.length; i++) {
        z = Number(arguments[i]) / max;
        sum += z * z;
      }
      return Math.sqrt(sum) * max;
    } else {
      sum = x * x + y * y;
      for (i = 2; i < arguments.length; i++) {
        z = Number(arguments[i]);
        sum += z * z;
      }
      return Math.sqrt(sum);
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.imul', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(a, b) {
    a = Number(a);
    b = Number(b);
    var ah = a >>> 16 & 65535;
    var al = a & 65535;
    var bh = b >>> 16 & 65535;
    var bl = b & 65535;
    var lh = ah * bl + al * bh << 16 >>> 0;
    return al * bl + lh | 0;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log10', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Math.log(x) / Math.LN10;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log2', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Math.log(x) / Math.LN2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.sign', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    return x === 0 || isNaN(x) ? x : x > 0 ? 1 : -1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.sinh', function(orig) {
  if (orig) {
    return orig;
  }
  var exp = Math.exp;
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    return (exp(x) - exp(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.tanh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    var y = Math.exp(-2 * Math.abs(x));
    var z = (1 - y) / (1 + y);
    return x < 0 ? -z : z;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.trunc', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (isNaN(x) || x === Infinity || x === -Infinity || x === 0) {
      return x;
    }
    var y = Math.floor(Math.abs(x));
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.EPSILON', function(orig) {
  return Math.pow(2, -52);
}, 'es6', 'es3');
$jscomp.polyfill('Number.MAX_SAFE_INTEGER', function() {
  return 9007199254740991;
}, 'es6', 'es3');
$jscomp.polyfill('Number.MIN_SAFE_INTEGER', function() {
  return -9007199254740991;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isFinite', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (typeof x !== 'number') {
      return false;
    }
    return !isNaN(x) && x !== Infinity && x !== -Infinity;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isInteger', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (!Number.isFinite(x)) {
      return false;
    }
    return x === Math.floor(x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isNaN', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return typeof x === 'number' && isNaN(x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isSafeInteger', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Number.isInteger(x) && Math.abs(x) <= Number.MAX_SAFE_INTEGER;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.parseFloat', function(orig) {
  return orig || parseFloat;
}, 'es6', 'es3');
$jscomp.polyfill('Number.parseInt', function(orig) {
  return orig || parseInt;
}, 'es6', 'es3');
$jscomp.assign = typeof Object.assign == 'function' ? Object.assign : function(target, var_args) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (!source) {
      continue;
    }
    for (var key in source) {
      if ($jscomp.owns(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
$jscomp.polyfill('Object.assign', function(orig) {
  return orig || $jscomp.assign;
}, 'es6', 'es3');
$jscomp.polyfill('Object.entries', function(orig) {
  if (orig) {
    return orig;
  }
  var entries = function(obj) {
    var result = [];
    for (var key in obj) {
      if ($jscomp.owns(obj, key)) {
        result.push([key, obj[key]]);
      }
    }
    return result;
  };
  return entries;
}, 'es8', 'es3');
$jscomp.polyfill('Object.getOwnPropertySymbols', function(orig) {
  if (orig) {
    return orig;
  }
  return function() {
    return [];
  };
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.ownKeys', function(orig) {
  if (orig) {
    return orig;
  }
  var symbolPrefix = 'jscomp_symbol_';
  function isSymbol(key) {
    return key.substring(0, symbolPrefix.length) == symbolPrefix;
  }
  var polyfill = function(target) {
    var keys = [];
    var names = Object.getOwnPropertyNames(target);
    var symbols = Object.getOwnPropertySymbols(target);
    for (var i = 0; i < names.length; i++) {
      (isSymbol(names[i]) ? symbols : keys).push(names[i]);
    }
    return keys.concat(symbols);
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Object.getOwnPropertyDescriptors', function(orig) {
  if (orig) {
    return orig;
  }
  var getOwnPropertyDescriptors = function(obj) {
    var result = {};
    var keys = Reflect.ownKeys(obj);
    for (var i = 0; i < keys.length; i++) {
      result[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return result;
  };
  return getOwnPropertyDescriptors;
}, 'es8', 'es5');
$jscomp.polyfill('Object.setPrototypeOf', function(orig) {
  return orig || $jscomp.setPrototypeOf;
}, 'es6', 'es5');
$jscomp.polyfill('Object.values', function(orig) {
  if (orig) {
    return orig;
  }
  var values = function(obj) {
    var result = [];
    for (var key in obj) {
      if ($jscomp.owns(obj, key)) {
        result.push(obj[key]);
      }
    }
    return result;
  };
  return values;
}, 'es8', 'es3');
$jscomp.polyfill('Reflect.apply', function(orig) {
  if (orig) {
    return orig;
  }
  var apply = Function.prototype.apply;
  var polyfill = function(target, thisArg, argList) {
    return apply.call(target, thisArg, argList);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || typeof Object.create == 'function' ? Object.create : function(prototype) {
  var ctor = function() {
  };
  ctor.prototype = prototype;
  return new ctor;
};
$jscomp.construct = function() {
  function reflectConstructWorks() {
    function Base() {
    }
    function Derived() {
    }
    new Base;
    Reflect.construct(Base, [], Derived);
    return new Base instanceof Base;
  }
  if (typeof Reflect != 'undefined' && Reflect.construct) {
    if (reflectConstructWorks()) {
      return Reflect.construct;
    }
    var brokenConstruct = Reflect.construct;
    var patchedConstruct = function(target, argList, opt_newTarget) {
      var out = brokenConstruct(target, argList);
      if (opt_newTarget) {
        Reflect.setPrototypeOf(out, opt_newTarget.prototype);
      }
      return out;
    };
    return patchedConstruct;
  }
  function construct(target, argList, opt_newTarget) {
    if (opt_newTarget === undefined) {
      opt_newTarget = target;
    }
    var proto = opt_newTarget.prototype || Object.prototype;
    var obj = $jscomp.objectCreate(proto);
    var apply = Function.prototype.apply;
    var out = apply.call(target, obj, argList);
    return out || obj;
  }
  return construct;
}();
$jscomp.polyfill('Reflect.construct', function(orig) {
  return $jscomp.construct;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.defineProperty', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, attributes) {
    try {
      Object.defineProperty(target, propertyKey, attributes);
      var desc = Object.getOwnPropertyDescriptor(target, propertyKey);
      if (!desc) {
        return false;
      }
      return desc.configurable === (attributes.configurable || false) && desc.enumerable === (attributes.enumerable || false) && ('value' in desc ? desc.value === attributes.value && desc.writable === (attributes.writable || false) : desc.get === attributes.get && desc.set === attributes.set);
    } catch (err) {
      return false;
    }
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.deleteProperty', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey) {
    if (!$jscomp.owns(target, propertyKey)) {
      return true;
    }
    try {
      return delete target[propertyKey];
    } catch (err) {
      return false;
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.getOwnPropertyDescriptor', function(orig) {
  return orig || Object.getOwnPropertyDescriptor;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.getPrototypeOf', function(orig) {
  return orig || Object.getPrototypeOf;
}, 'es6', 'es5');
$jscomp.findDescriptor = function(target, propertyKey) {
  var obj = target;
  while (obj) {
    var property = Reflect.getOwnPropertyDescriptor(obj, propertyKey);
    if (property) {
      return property;
    }
    obj = Reflect.getPrototypeOf(obj);
  }
  return undefined;
};
$jscomp.polyfill('Reflect.get', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, opt_receiver) {
    if (arguments.length <= 2) {
      return target[propertyKey];
    }
    var property = $jscomp.findDescriptor(target, propertyKey);
    if (property) {
      return property.get ? property.get.call(opt_receiver) : property.value;
    }
    return undefined;
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.has', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey) {
    return propertyKey in target;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.isExtensible', function(orig) {
  if (orig) {
    return orig;
  }
  if ($jscomp.ASSUME_ES5 || typeof Object.isExtensible == 'function') {
    return Object.isExtensible;
  }
  return function() {
    return true;
  };
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.preventExtensions', function(orig) {
  if (orig) {
    return orig;
  }
  if (!($jscomp.ASSUME_ES5 || typeof Object.preventExtensions == 'function')) {
    return function() {
      return false;
    };
  }
  var polyfill = function(target) {
    Object.preventExtensions(target);
    return !Object.isExtensible(target);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.set', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, value, opt_receiver) {
    var property = $jscomp.findDescriptor(target, propertyKey);
    if (!property) {
      if (Reflect.isExtensible(target)) {
        target[propertyKey] = value;
        return true;
      }
      return false;
    }
    if (property.set) {
      property.set.call(arguments.length > 3 ? opt_receiver : target, value);
      return true;
    } else {
      if (property.writable && !Object.isFrozen(target)) {
        target[propertyKey] = value;
        return true;
      }
    }
    return false;
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.setPrototypeOf', function(orig) {
  if (orig) {
    return orig;
  } else {
    if ($jscomp.setPrototypeOf) {
      var setPrototypeOf = $jscomp.setPrototypeOf;
      var polyfill = function(target, proto) {
        try {
          setPrototypeOf(target, proto);
          return true;
        } catch (e) {
          return false;
        }
      };
      return polyfill;
    } else {
      return null;
    }
  }
}, 'es6', 'es5');
$jscomp.polyfill('Set', function(NativeSet) {
  function isConformant() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !NativeSet || typeof NativeSet != 'function' || !NativeSet.prototype.entries || typeof Object.seal != 'function') {
      return false;
    }
    try {
      NativeSet = NativeSet;
      var value = Object.seal({x:4});
      var set = new NativeSet($jscomp.makeIterator([value]));
      if (!set.has(value) || set.size != 1 || set.add(value) != set || set.size != 1 || set.add({x:4}) != set || set.size != 2) {
        return false;
      }
      var iter = set.entries();
      var item = iter.next();
      if (item.done || item.value[0] != value || item.value[1] != value) {
        return false;
      }
      item = iter.next();
      if (item.done || item.value[0] == value || item.value[0].x != 4 || item.value[1] != item.value[0]) {
        return false;
      }
      return iter.next().done;
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeSet && $jscomp.ES6_CONFORMANCE) {
      return NativeSet;
    }
  } else {
    if (isConformant()) {
      return NativeSet;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var PolyfillSet = function(opt_iterable) {
    this.map_ = new Map;
    if (opt_iterable) {
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.add(item);
      }
    }
    this.size = this.map_.size;
  };
  PolyfillSet.prototype.add = function(value) {
    value = value === 0 ? 0 : value;
    this.map_.set(value, value);
    this.size = this.map_.size;
    return this;
  };
  PolyfillSet.prototype['delete'] = function(value) {
    var result = this.map_['delete'](value);
    this.size = this.map_.size;
    return result;
  };
  PolyfillSet.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  PolyfillSet.prototype.has = function(value) {
    return this.map_.has(value);
  };
  PolyfillSet.prototype.entries = function() {
    return this.map_.entries();
  };
  PolyfillSet.prototype.values = function() {
    return this.map_.values();
  };
  PolyfillSet.prototype.keys = PolyfillSet.prototype.values;
  PolyfillSet.prototype[Symbol.iterator] = PolyfillSet.prototype.values;
  PolyfillSet.prototype.forEach = function(callback, opt_thisArg) {
    var set = this;
    this.map_.forEach(function(value) {
      return callback.call(opt_thisArg, value, value, set);
    });
  };
  return PolyfillSet;
}, 'es6', 'es3');
$jscomp.checkStringArgs = function(thisArg, arg, func) {
  if (thisArg == null) {
    throw new TypeError("The 'this' value for String.prototype." + func + ' must not be null or undefined');
  }
  if (arg instanceof RegExp) {
    throw new TypeError('First argument to String.prototype.' + func + ' must not be a regular expression');
  }
  return thisArg + '';
};
$jscomp.polyfill('String.prototype.codePointAt', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(position) {
    var string = $jscomp.checkStringArgs(this, null, 'codePointAt');
    var size = string.length;
    position = Number(position) || 0;
    if (!(position >= 0 && position < size)) {
      return void 0;
    }
    position = position | 0;
    var first = string.charCodeAt(position);
    if (first < 55296 || first > 56319 || position + 1 === size) {
      return first;
    }
    var second = string.charCodeAt(position + 1);
    if (second < 56320 || second > 57343) {
      return first;
    }
    return (first - 55296) * 1024 + second + 9216;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.endsWith', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'endsWith');
    searchString = searchString + '';
    if (opt_position === void 0) {
      opt_position = string.length;
    }
    var i = Math.max(0, Math.min(opt_position | 0, string.length));
    var j = searchString.length;
    while (j > 0 && i > 0) {
      if (string[--i] != searchString[--j]) {
        return false;
      }
    }
    return j <= 0;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.fromCodePoint', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(var_args) {
    var result = '';
    for (var i = 0; i < arguments.length; i++) {
      var code = Number(arguments[i]);
      if (code < 0 || code > 1114111 || code !== Math.floor(code)) {
        throw new RangeError('invalid_code_point ' + code);
      }
      if (code <= 65535) {
        result += String.fromCharCode(code);
      } else {
        code -= 65536;
        result += String.fromCharCode(code >>> 10 & 1023 | 55296);
        result += String.fromCharCode(code & 1023 | 56320);
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.includes', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'includes');
    return string.indexOf(searchString, opt_position || 0) !== -1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.repeat', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(copies) {
    var string = $jscomp.checkStringArgs(this, null, 'repeat');
    if (copies < 0 || copies > 1342177279) {
      throw new RangeError('Invalid count value');
    }
    copies = copies | 0;
    var result = '';
    while (copies) {
      if (copies & 1) {
        result += string;
      }
      if (copies >>>= 1) {
        string += string;
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.stringPadding = function(padString, padLength) {
  var padding = padString !== undefined ? String(padString) : ' ';
  if (!(padLength > 0) || !padding) {
    return '';
  }
  var repeats = Math.ceil(padLength / padding.length);
  return padding.repeat(repeats).substring(0, padLength);
};
$jscomp.polyfill('String.prototype.padEnd', function(orig) {
  if (orig) {
    return orig;
  }
  var padEnd = function(targetLength, opt_padString) {
    var string = $jscomp.checkStringArgs(this, null, 'padStart');
    var padLength = targetLength - string.length;
    return string + $jscomp.stringPadding(opt_padString, padLength);
  };
  return padEnd;
}, 'es8', 'es3');
$jscomp.polyfill('String.prototype.padStart', function(orig) {
  if (orig) {
    return orig;
  }
  var padStart = function(targetLength, opt_padString) {
    var string = $jscomp.checkStringArgs(this, null, 'padStart');
    var padLength = targetLength - string.length;
    return $jscomp.stringPadding(opt_padString, padLength) + string;
  };
  return padStart;
}, 'es8', 'es3');
$jscomp.polyfill('String.prototype.startsWith', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'startsWith');
    searchString = searchString + '';
    var strLen = string.length;
    var searchLen = searchString.length;
    var i = Math.max(0, Math.min(opt_position | 0, string.length));
    var j = 0;
    while (j < searchLen && i < strLen) {
      if (string[i++] != searchString[j++]) {
        return false;
      }
    }
    return j >= searchLen;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.arrayFromIterator = function(iterator) {
  var i;
  var arr = [];
  while (!(i = iterator.next()).done) {
    arr.push(i.value);
  }
  return arr;
};
$jscomp.arrayFromIterable = function(iterable) {
  if (iterable instanceof Array) {
    return iterable;
  } else {
    return $jscomp.arrayFromIterator($jscomp.makeIterator(iterable));
  }
};
$jscomp.inherits = function(childCtor, parentCtor) {
  childCtor.prototype = $jscomp.objectCreate(parentCtor.prototype);
  childCtor.prototype.constructor = childCtor;
  if ($jscomp.setPrototypeOf) {
    var setPrototypeOf = $jscomp.setPrototypeOf;
    setPrototypeOf(childCtor, parentCtor);
  } else {
    for (var p in parentCtor) {
      if (p == 'prototype') {
        continue;
      }
      if (Object.defineProperties) {
        var descriptor = Object.getOwnPropertyDescriptor(parentCtor, p);
        if (descriptor) {
          Object.defineProperty(childCtor, p, descriptor);
        }
      } else {
        childCtor[p] = parentCtor[p];
      }
    }
  }
  childCtor.superClass_ = parentCtor.prototype;
};
$jscomp.polyfill('WeakSet', function(NativeWeakSet) {
  function isConformant() {
    if (!NativeWeakSet || !Object.seal) {
      return false;
    }
    try {
      var x = Object.seal({});
      var y = Object.seal({});
      var set = new NativeWeakSet([x]);
      if (!set.has(x) || set.has(y)) {
        return false;
      }
      set['delete'](x);
      set.add(y);
      return !set.has(x) && set.has(y);
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeWeakSet && $jscomp.ES6_CONFORMANCE) {
      return NativeWeakSet;
    }
  } else {
    if (isConformant()) {
      return NativeWeakSet;
    }
  }
  var PolyfillWeakSet = function(opt_iterable) {
    this.map_ = new WeakMap;
    if (opt_iterable) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.add(item);
      }
    }
  };
  PolyfillWeakSet.prototype.add = function(elem) {
    this.map_.set(elem, true);
    return this;
  };
  PolyfillWeakSet.prototype.has = function(elem) {
    return this.map_.has(elem);
  };
  PolyfillWeakSet.prototype['delete'] = function(elem) {
    return this.map_['delete'](elem);
  };
  return PolyfillWeakSet;
}, 'es6', 'es3');
try {
  if (Array.prototype.values.toString().indexOf('[native code]') == -1) {
    delete Array.prototype.values;
  }
} catch (e) {
}
Ext.define('SU.data.Model', {override:'Ext.data.Model', unjoin:function(item) {
  var me = this;
  if (!me.joined || !me.stores) {
    return;
  }
  me.callParent(arguments);
}});
Ext.define('SU.data.validator.Phone', {override:'Ext.data.validator.Phone', config:{matcher:/^ *(?:\+?(\d{1,3})[- .]?)?(?:(?:(\d{3})|\((\d{3})\))?[- .]?)(?:(\d{3})[- .]?)(\d{2}[- .]?\d{2})(?: *(?:e?xt?) *(\d*))? *$/}});
Ext.define('SU.data.validator.Url', {override:'Ext.data.validator.Url', config:{matcher:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/}});
Ext.define('SU.Error', function() {
  function toString(formated) {
    var me = this, cls = me.sourceClass, method = me.sourceMethod, msg = me.message || me.msg, crlf = formated ? '\n    ' : ' ';
    if (method) {
      if (msg) {
        method += '()' + crlf;
        method += msg;
      } else {
        method += '()';
      }
    }
    if (cls) {
      method = method ? cls + '::' + method : cls;
    }
    return (formated ? '[' + me.name + ']' : me.name + ':') + crlf + (method || msg || '');
  }
  return {name:'SUError', message:'Empty message', description:undefined, format:function(message) {
    var me = this;
    if (message) {
      if (!Ext.isArray(message)) {
        message = [message];
      }
      for (var i = 0, ln = message.length; i < ln; i++) {
        try {
          if (Ext.isString(message[i])) {
            var o = me, m = null;
            while (!!o && !m) {
              m = o.self.locales && o.self.locales[message[i]];
              o = o.superclass;
            }
            message[i] = m || message[i];
          }
        } catch (e$0) {
        }
      }
      return Ext.String.format.apply(me, message);
    }
    return message;
  }, constructor:function(config) {
    var me = this, statics = me.statics(), options = config;
    if (config instanceof SU.Error) {
      Ext.apply(this, config);
      return;
    } else {
      if (Ext.isString(config)) {
        options = new Error(config);
        options.name = me.name || 'ExtError';
        options.msg = config;
      } else {
        if (config instanceof DOMException) {
          options = Ext.applyIf({name:config.name || this.name, message:[SU.Error.DOMExceptions[config.code || 0] || 'DOM_UNKNOWN', config.code || 0], description:toString.call(config)}, config);
        } else {
          if (config instanceof Error) {
            options.name = config.name || me.name;
            options.message = config.msg || config.message;
            options.description = Ext.isDefined(config.description) ? config.description : toString.call(config, true);
          } else {
            options.name = config.name || me.name;
            options.description = Ext.isDefined(config.description) ? config.description : toString.call(config, true);
          }
        }
      }
    }
    options.msg = me.format(options.msg || options.message);
    options.description = me.format(options.description);
    Error.call(this, options.msg);
    if (Ext.isObject(config)) {
      Ext.apply(this, config);
    }
    me.name = options.name || me.name || 'ExtError';
    me.message = options.msg || options.message || me.message;
    if (options.description !== false && me.description !== false) {
      me.description = options.description || toString.call(me, true);
    }
    me.lineNumber = me.lineNumber || options.lineNumber;
    me.columnNumber = me.columnNumber || options.columnNumber;
    me.fileName = me.fileName || options.fileName;
    me.stack = me.stack || options.stack;
    if (!me.stack) {
      if (Error.captureStackTrace) {
        Error.captureStackTrace(me, me.constructor);
      } else {
        me.stack = (new Error).stack;
      }
    }
    if (me.stack) {
      var stack = me.stack.split('\n');
      Ext.iterate(stack, function(item, index, array) {
        var line = item.split('@');
        line && line[1] && (line[1] = '(' + line[1] + ')');
        item = line.join(' ');
        array[index] = item.trim();
      });
      me.stack = stack.join('\n    ');
      if (!me.fileName && !me.lineNumber) {
        stack = me.stack.split('\n');
        var line = stack.shift();
        if (!/:\d+:\d+\)$/.test(line)) {
          line = stack.shift();
        }
        var math = /[\(](.+):(\d+):(\d+)/gi.exec(line);
        me.fileName = math && math[1];
        me.lineNumber = math && parseInt(math[2]);
        me.columnNumber = math && parseInt(math[3]);
      }
    }
  }, toString:function() {
    return toString.call(this);
  }, toFormatedString:function() {
    return toString.call(this, true);
  }, statics:{ignore:false, raise:function(error) {
    var me = this, method = me.raise.caller, msg, name, etype, exception;
    error = error || {};
    if (Ext.isString(error)) {
      error = {msg:error};
    }
    if (method === Ext.raise) {
      method = method.caller;
    }
    if (method) {
      if (!error.sourceMethod && (name = method.$name)) {
        error.sourceMethod = name;
      }
      if (!error.sourceClass && (name = method.$owner) && (name = name.$className)) {
        error.sourceClass = name;
      }
    }
    etype = error.etype || 'SU.Error';
    delete error.etype;
    exception = Ext.create(etype, error);
    if (me.handle(exception) !== true) {
      msg = toString.call(exception);
      console.error(msg);
      throw exception;
    }
  }, handle:function(err) {
    return this.ignore;
  }, DOMExceptions:['DOM_UNKNOWN', 'DOM_INDEX_SIZE_ERR', 'DOM_STRING_SIZE_ERR', 'DOM_HIERARCHY_REQUEST_ERR', 'DOM_WRONG_DOCUMENT_ERR', 'DOM_INVALID_CHARACTER_ERR', 'DOM_NO_DATA_ALLOWED_ERR', 'DOM_NO_MODIFICATION_ALLOWED_ERR', 'DOM_NOT_FOUND_ERR', 'DOM_NOT_SUPPORTED_ERR', 'DOM_INUSE_ATTRIBUTE_ERR', 'DOM_INVALID_STATE_ERR', 'DOM_SYNTAX_ERR', 'DOM_INVALID_MODIFICATION_ERR', 'DOM_NAMESPACE_ERR', 'DOM_INVALID_ACCESS_ERR', 'DOM_VALIDATION_ERR', 'DOM_TYPE_MISMATCH_ERR', 'DOM_SECURITY_ERR', 'DOM_NETWORK_ERR', 
  'DOM_ABORT_ERR', 'DOM_URL_MISMATCH_ERR', 'DOM_QUOTA_EXCEEDED_ERR'], locales:{DOM_UNKNOWN:'Unknown Exception Code ({0})', DOM_INDEX_SIZE_ERR:'Index out of bounds', DOM_STRING_SIZE_ERR:'The resulting string is too long to fit in a DOMString', DOM_HIERARCHY_REQUEST_ERR:'The Node can not be inserted at this location', DOM_WRONG_DOCUMENT_ERR:'The source and the destination Documents are not the same', DOM_INVALID_CHARACTER_ERR:'The string contains an invalid character', DOM_NO_DATA_ALLOWED_ERR:'This Node / NodeList does not support data', 
  DOM_NO_MODIFICATION_ALLOWED_ERR:'This object cannot be modified', DOM_NOT_FOUND_ERR:'The item cannot be found', DOM_NOT_SUPPORTED_ERR:'This implementation does not support function', DOM_INUSE_ATTRIBUTE_ERR:'The Attribute has already been assigned to another Element', DOM_INVALID_STATE_ERR:'The object is no longer usable', DOM_SYNTAX_ERR:'An invalid or illegal string was specified', DOM_INVALID_MODIFICATION_ERR:'Cannot change the type of the object', DOM_NAMESPACE_ERR:'The namespace declaration is incorrect', 
  DOM_INVALID_ACCESS_ERR:'The object does not support this function', DOM_VALIDATION_ERR:'The operation would cause the node to fail validation.', DOM_TYPE_MISMATCH_ERR:'The node type is incompatible with the expected parameter type.', DOM_SECURITY_ERR:'The operation is not allowed due to same origin policy restriction.', DOM_NETWORK_ERR:'A network error occurred.', DOM_ABORT_ERR:'The user aborted an operation.', DOM_URL_MISMATCH_ERR:'The specified URL does not match.', DOM_QUOTA_EXCEEDED_ERR:'The operation would exceed storage limits.'}}};
}(), function() {
  var proto = this.prototype;
  this.prototype = Object.create(Error.prototype);
  Ext.apply(this.prototype, proto);
});
Ext.Error = SU.Error;
Ext.raise = function() {
  SU.Error.raise.apply(SU.Error, arguments);
};
(function() {
  var errorList = [];
  var dlg;
  var errorIndex = -1;
  function createDialog() {
    dlg = Ext.create('Ext.ErrorDialog', {listeners:{destroy:onDestroy, close:onClose, changepos:onChangePos}});
  }
  function refreshNumber(index) {
    !!dlg && dlg.updateNavigate({current:index, count:errorList.length});
  }
  function onDestroy() {
    dlg = undefined;
    errorList = [];
  }
  function onClose() {
    for (var i = 0, len = errorList.length; i < len; i++) {
      if (errorList[i].handler && typeof errorList[i].handler === 'function') {
        errorList[i].handler.call(errorList[i].scope || this, this, errorList[i]);
      }
    }
  }
  function onChangePos(b, step) {
    Ext.setError(errorIndex + step);
  }
  Ext.setError = function setError(index) {
    if (!dlg || index < 0 || index >= errorList.length) {
      return;
    }
    errorIndex = index;
    refreshNumber(index);
    dlg.updateException(errorList[index]);
  };
  Ext.errorMessage = function errorMessage(options) {
    var me = this;
    !!options && errorList.push(options);
    if (!dlg) {
      createDialog();
    }
    if (dlg.isHidden()) {
      dlg.show();
      me.setError(errorList.length - 1);
    } else {
      refreshNumber(errorIndex);
    }
  };
  Ext.INFO = 'ext-mb-info';
  Ext.WARNING = 'ext-mb-warning';
  Ext.QUESTION = 'ext-mb-question';
  Ext.ERROR = 'ext-mb-error';
  Ext.ADVANSED_HEIGHT = 150;
})();
Ext.define('SU.WebSocketError', {alternateClassName:['Ext.WebSocketError'], extend:'SU.Error', name:'WebSocketError', constructor:function(config) {
  config = config || {};
  config.name = config.name || this.name;
  this.callParent(arguments);
}, statics:{locales:{ALREADY_ESTABLISHED:'The connection is already established.', NOT_CONNECTED:'The connection is not established.', CAN_NOT_CONNECT:'Can not connect to {0}', DISCONNECT:'Connecting to {0} has been interrupted.', INVALID_SCHEME:"Invalid schema '{0}' for WebSocket", INVALID_ADDRESS:"Invalid address '{0}' for WebSocket", LOGIN_NOT_DEFINED:'Not defined for automatic login user authorization.', LOGIN_ERROR:'Login failed (Code {0}).\n\n{1}', LOGIN_CUSTOM:'Invalid username or password.', 
LOGIN_UNKNOWN:'Username or password unidentified.', LOGIN_INV_METHOD:'Authorization is prohibited by the system administrator.', AUTHORIZE_ERROR:'Runtime error authorization request.'}}});
if (!Ext.isDefined(window.DEBUG_CONNECTION)) {
  window.DEBUG_CONNECTION = false;
}
Ext.define('SU.WebSocket', {alternateClassName:['Ext.WebSocket'], mixins:{observable:'Ext.util.Observable'}, requires:['SU.Error', 'SU.WebSocketError'], statics:{INITIALIZE:0, CONNECTING:1 << 0, OPEN:1 << 1, CLOSING:1 << 2, CLOSED:1 << 3, SENDING:1 << 4, READING:1 << 5}, messageState:{state:0, sending:0, reading:0, setSending:function() {
  this.sending++;
  this.state |= Ext.WebSocket.SENDING;
}, unsetSending:function() {
  this.sending--;
  !this.sending && (this.state ^= Ext.WebSocket.SENDING);
}, setReading:function() {
  this.reading++;
  this.state |= Ext.WebSocket.READING;
}, unsetReading:function() {
  this.reading--;
  !this.reading && (this.state ^= Ext.WebSocket.READING);
}, cleanup:function() {
  this.state = 0;
}}, config:{url:null, protocol:null, timeout:30000}, constructor:function(config) {
  if (window.MozWebSocket) {
    window.WebSocket = window.MozWebSocket;
  }
  config = config || {};
  this.initConfig(config);
  this.callParent(arguments);
  this.mixins.observable.constructor.call(this);
}, getReadyState:function() {
  var me = this;
  if (!me.instance) {
    return me.statics().INITIALIZE;
  }
  return 1 << me.instance.readyState | me.messageState.state;
}, cleanup:function() {
  var me = this;
  me.connecting = false;
  me.instance = undefined;
  me.messageState.cleanup();
  me.changeState();
}, isConnected:function() {
  return (this.getReadyState() & this.statics().OPEN) !== 0;
}, connect:function(options) {
  var me = this, url, protocol;
  try {
    if (me.getReadyState() !== me.statics().INITIALIZE) {
      Ext.Error.raise({etype:'Ext.WebSocketError', msg:'ALREADY_ESTABLISHED'});
    }
    options = options || {};
    url = me.applyUrl(options.url || me.getUrl());
    protocol = options.protocol || me.getProtocol() || [];
    if (me.fireEvent('beforeconnect', me, options) !== false) {
      me.setUrl(url);
      me.setProtocol(protocol);
      me.connecting = true;
      me.instance = new WebSocket(me.getUrl(), me.getProtocol());
      if (me.instance) {
        me.bindEvents(true);
        me.changeState();
      }
    }
  } catch (e$1) {
    this.doException(this, e$1, options);
    me.handleInstanceClose({code:1001});
  }
  return !!me.instance;
}, changeState:function() {
  this.fireEvent('changestate', this, this.getReadyState(true));
}, disconnect:function() {
  var me = this, state = me.getReadyState();
  if (!!me.instance && state !== me.statics().INITIALIZE && (state & me.statics().CLOSED) === 0) {
    if (me.fireEvent('beforedisconnect', me) !== false) {
      me.bindEvents();
      me.instance.close(1000);
      me.handleInstanceClose({code:1000});
    }
  } else {
    me.cleanup();
  }
}, send:function(data) {
  try {
    if (!!this.instance && (this.getReadyState() & this.statics().OPEN) !== 0) {
      this.fireEvent('send', this, data);
      if (window.DEBUG_CONNECTION) {
        console.log('[WebSocket] send: ' + data);
      }
      this.instance.send(data);
      return true;
    }
    Ext.Error.raise({etype:'Ext.WebSocketError', msg:'NOT_CONNECTED'});
  } catch (e$2) {
    this.doException(this, e$2, null);
    return false;
  }
}, sendCommand:function(options) {
}, sendControlledComand:function(options) {
}, request:function(options) {
}, abort:function(request) {
}, bindEvents:function(set) {
  if (this.instance) {
    this.instance.onopen = !!set ? Ext.bind(this.handleInstanceOpen, this) : undefined;
    this.instance.onclose = !!set ? Ext.bind(this.handleInstanceClose, this) : undefined;
    this.instance.onmessage = !!set ? Ext.bind(this.handleInstanceMessage, this) : undefined;
    this.instance.onerror = !!set ? Ext.bind(this.handleInstanceError, this) : undefined;
  }
}, handleInstanceOpen:function(e) {
  var me = this;
  me.changeState();
  me.fireAction('connect', [me], 'doConnect', me);
}, handleInstanceClose:function(e) {
  var me = this;
  me.changeState();
  me.bindEvents(false);
  this.fireAction('disconnect', [this, e, this.connecting], 'doDisconnect', this);
}, handleInstanceError:function(event) {
  var me = this, msg = [me.connecting ? 'CAN_NOT_CONNECT' : 'DISCONNECT', me.getUrl()];
  if (window.DEBUG_CONNECTION) {
    console.log('[WebSocket] handleInstanceError', event, event.target.readyState, !!me.connecting);
  }
  me.handleInstanceClose({code:1001});
  me.changeState();
  try {
    Ext.Error.raise({etype:'Ext.WebSocketError', msg:msg});
  } catch (e$3) {
    this.doException(this, e$3, null);
  }
}, handleInstanceMessage:function(e) {
  var me = this;
  me.fireEvent('message', me, e.data);
}, applyUrl:function(value) {
  if (value) {
    var parts = (new RegExp('^(([^:/\\?#]+)://)?((([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$')).exec(value), purl = {href:parts[0] || '', protocol:(parts[2] || '').toLowerCase(), host:parts[4] || '', hostname:parts[5] || '', port:parts[6] || '', pathname:parts[7] || '/', search:parts[8] || '', hash:parts[10] || ''};
    if (purl.protocol === '') {
      purl.protocol = 'ws';
    }
    if (!(purl.protocol !== 'ws' || purl.protocol !== 'wss')) {
      Ext.Error.raise({etype:'Ext.WebSocketError', msg:['INVALID_SCHEME', value]});
    }
    if (!purl.hostname || isNaN(purl.port - 0)) {
      Ext.Error.raise({etype:'Ext.WebSocketError', msg:['INVALID_ADDRESS', value]});
    }
    return [purl.protocol, '://', purl.hostname, purl.port === '' ? '' : ':' + purl.port, purl.pathname, purl.search, purl.hash].join('');
  }
  return value;
}, doConnect:function(ws) {
  var me = this;
  me.connecting = false;
  me.fireEvent('afterconnect', me);
}, doDisconnect:function(ws, event) {
  var me = this;
  this.abort();
  me.cleanup();
}, doException:function(sender, exception, options) {
  var me = this;
  me.fireEvent('exception', sender || me, new Ext.Error(exception), options);
}});
Ext.define('SU.data.field.Json', {extend:'Ext.data.field.Field', alternateClassName:['Ext.data.field.Json'], alias:'data.field.json', isJsonField:true, serialized:true, convert:function(v) {
  var me = this;
  if (v === undefined || v === null || v === '') {
    return me.allowNull ? null : [];
  }
  if (typeof v === 'string') {
    try {
      v = JSON.parse(v || '[]');
    } catch (e$4) {
      console.log(e$4);
      return me.allowNull ? null : [];
    }
  } else {
    if (Ext.isArray(v)) {
      v = Ext.Array.clone(v);
    } else {
      v = Ext.Object.chain(v);
    }
  }
  return v;
}, serialize:function(v, record) {
  var me = this;
  if (me.allowNull && (v === undefined || v === null)) {
    return null;
  }
  if (v) {
    return me.serialized ? JSON.stringify(v) : v;
  } else {
    return null;
  }
}, isEqual:function(value1, value2) {
  var me = this;
  try {
    if (value1 === value2) {
      return (value1 ? JSON.stringify(value1) : me.allowNull ? null : JSON.stringify([])) === (value2 ? JSON.stringify(value2) : me.allowNull ? null : JSON.stringify([]));
    }
    return false;
  } catch (e$5) {
    console.log(e$5);
    return false;
  }
}, getType:function() {
  return 'json';
}});
Ext.define('SU.data.odata.Reader', {extend:'Ext.data.JsonReader', alternateClassName:['SU.data.ODataReader', 'Ext.data.ODataReader'], alias:'reader.odata', read:function(response) {
  var token;
  if (response) {
    if (response.status === 204) {
      return this.nullResultSet;
    } else {
      if (response.status === 201 && response.responseText) {
        token = '{\r\n"d" : {\r\n"__metadata": {';
        console.log(response.responseText.indexOf(token));
        if (response.responseText.indexOf(token) >= 0) {
          response.responseText = response.responseText.replace(token, '{\r\n"d" : {\r\n"results": {\r\n"__metadata": {');
          response.responseText += '\r\n}';
        }
      }
    }
  }
  return this.callParent(arguments);
}});
Ext.define('SU.data.odata.Writer', {extend:'Ext.data.JsonWriter', alternateClassName:['SU.data.ODataWriter', 'Ext.data.ODataWriter'], alias:'writer.odata', allowSingle:true, write:function(request) {
  var me = this, records = request.getRecords() || [], record = records[0], url = request.getUrl(), proxy = request.getProxy(), action = request.getAction(), headers = request.getHeaders();
  if (proxy) {
    if (url.indexOf('$inlinecount') > 0) {
      url = url.replace('$inlinecount\x3dallpages', '');
      request.setUrl(url);
    }
    if (action === 'update') {
      proxy.headers['If-Match'] = record.data.__metadata.etag;
    } else {
      if (headers && headers['If-Match']) {
        delete headers['If-Match'];
        request.setHeaders(headers);
      }
    }
  }
  return me.callParent(arguments);
}});
Ext.define('SU.data.odata.Proxy', {extend:'Ext.data.RestProxy', alternateClassName:['SU.data.ODataProxy', 'Ext.data.ODataProxy'], alias:'proxy.odata', requires:['SU.data.odata.Reader', 'SU.data.odata.Writer'], config:{asRestAPI:false, site:null, list:null}, actionMethods:{create:'POST', read:'GET', update:'MERGE', destroy:'DELETE'}, headers:{Accept:'application/json; odata\x3dverbose'}, appendId:false, noCache:false, limitParam:'$top', startParam:'$skip', sortParam:'$orderby', filterParam:'$filter', 
encodeSorters:function(sorters) {
  var sort = [], length = sorters.length, i;
  for (i = 0; i < length; i++) {
    sort[i] = sorters[i].getProperty() + (sorters[i].getDirection() === 'DESC' ? ' desc' : '');
  }
  return sort.join(',');
}, encodeFilters:function(filters) {
  var filter = [], length = filters.length, sq, i;
  for (i = 0; i < length; i++) {
    sq = typeof filters[i].getValue() === 'string' ? "'" : '';
    if (filters[i].getOperator() === 'in') {
      filter[i] = filters[i].getValue().map(function(value) {
        sq = typeof value === 'string' ? "'" : '';
        return filters[i].getProperty() + ' eq ' + sq + value + sq;
      }).join(' or ');
    } else {
      if (filters[i].getOperator() === 'like') {
        filter[i] = 'indexof(' + filters[i].getProperty() + ', ' + sq + filters[i].getValue() + sq + ') ne -1';
      } else {
        filter[i] = filters[i].getProperty() + ' ' + filters[i].getOperator() + ' ' + sq + filters[i].getValue() + sq;
      }
    }
  }
  return filter.join(' and ');
}, buildUrl:function(request) {
  var me = this, operation = request.getOperation(), records = operation.getRecords() || [], record = records[0], site = me.getSite(), url = site ? Ext.String.format(me.getAsRestAPI() ? "{0}/_api/web/lists/getbytitle('{1}')/items" : '{0}/_vti_bin/listdata.svc/{1}', site, me.getList()) : me.getUrl(request), id;
  if (record && !record.phantom) {
    id = record.getId();
  }
  if (id) {
    url += '(' + id + ')';
  }
  url += '?$inlinecount\x3dallpages';
  request.setUrl(url);
  return me.callParent(arguments);
}, reader:{type:'odata', rootProperty:'d.results', totalProperty:'d.__count'}, writer:{type:'odata'}});
Ext.define('SU.data.validator.INN', {extend:'Ext.data.validator.Validator', alternateClassName:['Ext.data.validator.INN'], alias:'data.validator.inn', config:{message:'Некорректный ИНН', vType:'inn'}, validate:function(value) {
  if (this.getVType() === 'inn') {
    return this.validateInn(value);
  } else {
    if (this.getVType() === 'ogrn') {
      return this.validateOgrn(value);
    }
  }
  return 'Не верный тип проверки';
}, validateInn:function(value) {
  if (value.match(/\D/)) {
    return 'Введённый ИНН не является числом';
  }
  if (value.length !== 12 && value.length !== 10) {
    return this.getMessage();
  }
  if (value.length === 10) {
    var dgt10 = String((2 * value[0] + 4 * value[1] + 10 * value[2] + 3 * value[3] + 5 * value[4] + 9 * value[5] + 4 * value[6] + 6 * value[7] + 8 * value[8]) % 11 % 10);
    console.log(dgt10);
    return value[9] === dgt10 ? true : 'Введённый ИНН не прошёл проверку по контрольным цифрам';
  }
  if (value.length === 12) {
    var dgt11 = String((7 * value[0] + 2 * value[1] + 4 * value[2] + 10 * value[3] + 3 * value[4] + 5 * value[5] + 9 * value[6] + 4 * value[7] + 6 * value[8] + 8 * value[9]) % 11 % 10);
    var dgt12 = String((3 * value[0] + 7 * value[1] + 2 * value[2] + 4 * value[3] + 10 * value[4] + 3 * value[5] + 5 * value[6] + 9 * value[7] + 4 * value[8] + 6 * value[9] + 8 * value[10]) % 11 % 10);
    console.log(dgt11, dgt12);
    return value[10] === dgt11 && value[11] === dgt12 ? true : 'Введённый ИНН не прошёл проверку по контрольным цифрам';
  }
}, validateOgrn:function(ogrn) {
  var result = false;
  if (typeof ogrn === 'number') {
    ogrn = ogrn.toString();
  } else {
    if (typeof ogrn !== 'string') {
      ogrn = '';
    }
  }
  if (!ogrn.length) {
    result = 'ОГРН пуст';
  } else {
    if (/[^0-9]/.test(ogrn)) {
      result = 'ОГРН может состоять только из цифр';
    } else {
      if (ogrn.length !== 13) {
        result = 'ОГРН может состоять только из 13 цифр';
      } else {
        var n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1));
        if (n13 === parseInt(ogrn[12])) {
          result = true;
        } else {
          console.log(n13);
          result = 'Неправильное контрольное число';
        }
      }
    }
  }
  return result;
}});
Ext.define('SU.locale.LocaleDelegate', {requires:['Ext.Ajax'], success:undefined, failure:undefined, scope:undefined, constructor:function(success, failure, scope) {
  this.callParent(arguments);
  this.success = success;
  this.failure = failure;
  this.scope = scope;
}, loadPropertiesFile:function(url) {
  if (!this.success || !this.scope) {
    return;
  }
  Ext.Ajax.request({url:url, success:this.ajaxSuccess, failure:this.ajaxFailure, scope:this});
}, ajaxSuccess:function(response) {
  this.success.call(this.scope, response.responseText);
}, ajaxFailure:function(response) {
  this.failure.call(this.scope, response);
}});
Ext.define('SU.locale.model.ClientModel', {extend:'Ext.data.Model', config:{fields:[{name:'client'}, {name:'method'}, {name:'key', type:'string'}, {name:'allowEmpty', type:'boolean', defaultValue:false}]}});
Ext.define('SU.locale.LocalePlugin', {extend:'Ext.plugin.Abstract', alias:'plugin.localization', requires:['SU.locale.model.ClientModel'], config:{method:Ext.EmptyFn, key:''}, init:function(client) {
  this.clientModel = Ext.create('SU.locale.model.ClientModel', {client:client, method:this.getMethod(), key:this.getKey()});
  SU.locale.LocaleManager.registerClient(this.clientModel);
}, destroy:function() {
  SU.locale.LocaleManager.unregisterClient(this.clientModel);
  this.callParent(arguments);
}});
if (!(Ext.state && Ext.state.CookieProvider)) {
  Ext.define('Ext.state.CookieProvider', {mixins:{observable:'Ext.util.Observable'}, prefix:'ext-', state:{}, constructor:function(config) {
    var me = this;
    me.path = '/';
    me.expires = new Date(Ext.Date.now() + 1000 * 60 * 60 * 24 * 7);
    me.domain = null;
    me.secure = false;
    Ext.apply(me, config);
    me.state = {};
    me.mixins.observable.constructor.call(me);
    me.state = me.readCookies();
  }, get:function(name, defaultValue) {
    return typeof this.state[name] == 'undefined' ? defaultValue : this.state[name];
  }, set:function(name, value) {
    var me = this;
    if (typeof value == 'undefined' || value === null) {
      me.clear(name);
      return;
    }
    me.setCookie(name, value);
    me.state[name] = value;
    me.fireEvent('statechange', me, name, value);
  }, clear:function(name) {
    var me = this;
    me.clearCookie(name);
    delete me.state[name];
    me.fireEvent('statechange', me, name, null);
  }, readCookies:function() {
    var cookies = {}, c = document.cookie + ';', re = /\s?(.*?)=(.*?);/g, prefix = this.prefix, len = prefix.length, matches, name, value;
    while ((matches = re.exec(c)) != null) {
      name = matches[1];
      value = matches[2];
      if (name && name.substring(0, len) == prefix) {
        cookies[name.substr(len)] = this.decodeValue(value);
      }
    }
    return cookies;
  }, setCookie:function(name, value) {
    var me = this;
    document.cookie = me.prefix + name + '\x3d' + me.encodeValue(value) + (me.expires == null ? '' : '; expires\x3d' + me.expires.toUTCString()) + (me.path == null ? '' : '; path\x3d' + me.path) + (me.domain == null ? '' : '; domain\x3d' + me.domain) + (me.secure == true ? '; secure' : '');
  }, clearCookie:function(name) {
    var me = this;
    document.cookie = me.prefix + name + '\x3dnull; expires\x3dThu, 01-Jan-1970 00:00:01 GMT' + (me.path == null ? '' : '; path\x3d' + me.path) + (me.domain == null ? '' : '; domain\x3d' + me.domain) + (me.secure == true ? '; secure' : '');
  }, decodeValue:function(cookie) {
    var re = /^(a|n|d|b|s|o|e):(.*)$/, matches = re.exec(unescape(cookie)), all, type, v, kv;
    if (!matches || !matches[1]) {
      return;
    }
    type = matches[1];
    v = matches[2];
    switch(type) {
      case 'e':
        return null;
      case 'n':
        return parseFloat(v);
      case 'd':
        return new Date(Date.parse(v));
      case 'b':
        return v == '1';
      case 'a':
        all = [];
        if (v != '') {
          Ext.each(v.split('^'), function(val) {
            all.push(this.decodeValue(val));
          }, this);
        }
        return all;
      case 'o':
        all = {};
        if (v != '') {
          Ext.each(v.split('^'), function(val) {
            kv = val.split('\x3d');
            all[kv[0]] = this.decodeValue(kv[1]);
          }, this);
        }
        return all;
      default:
        return v;
    }
  }, encodeValue:function(v) {
    var enc, flat = '', i = 0, len, key;
    if (v == null) {
      return 'e:1';
    } else {
      if (typeof v == 'number') {
        enc = 'n:' + v;
      } else {
        if (typeof v == 'boolean') {
          enc = 'b:' + (v ? '1' : '0');
        } else {
          if (Ext.isDate(v)) {
            enc = 'd:' + v.toGMTString();
          } else {
            if (Ext.isArray(v)) {
              for (len = v.length; i < len; i++) {
                flat += this.encodeValue(v[i]);
                if (i != len - 1) {
                  flat += '^';
                }
              }
              enc = 'a:' + flat;
            } else {
              if (typeof v == 'object') {
                for (key in v) {
                  if (typeof v[key] != 'function' && v[key] !== undefined) {
                    flat += key + '\x3d' + this.encodeValue(v[key]) + '^';
                  }
                }
                enc = 'o:' + flat.substring(0, flat.length - 1);
              } else {
                enc = 's:' + v;
              }
            }
          }
        }
      }
    }
    return escape(enc);
  }});
}
Ext.define('SU.storage.CookieProvider', {extend:'Ext.state.CookieProvider', constructor:function(config) {
  config = config || {};
  config.expires = config.expires || new Date(Ext.Date.now() + 1000 * 60 * 60 * 24 * 30);
  this.callParent(arguments);
}});
Ext.define('SU.storage.LocalStorageCookie', {alternateClassName:['Ext.Cookie', 'SU.LocalStorageCookie'], singleton:true, requires:['SU.storage.CookieProvider', 'Ext.data.proxy.LocalStorage', 'Ext.data.Store'], config:{proxyId:'app.cookies'}, constructor:function(config) {
  var me = this;
  me.callParent(arguments);
  me.isStorage = !!window.localStorage;
}, updateProxyId:function() {
  Ext.destroy(this.store);
  this.store = null;
  this.getStore();
}, getStore:function() {
  var me = this;
  if (!me.store) {
    if (!me.isStorage) {
      me.store = new SU.storage.CookieProvider({prefix:me.getProxyId() + '-'});
    } else {
      me.store = new Ext.data.Store({autoSync:true, fields:['key', 'value'], proxy:{type:'localstorage', id:me.getProxyId()}});
      me.store.load();
    }
  }
  return me.store;
}, get:function(key) {
  var me = this, store = me.getStore(), index, record;
  if (!me.isStorage) {
    return store.get(key);
  }
  index = store.find('key', key, 0, false, true, true);
  if (~index) {
    record = store.getAt(index);
    return record.get('value');
  }
}, set:function(key, value) {
  var me = this, store = me.getStore(), index, record;
  if (!me.isStorage) {
    store.set(key, value);
    return true;
  }
  index = store.find('key', key, 0, false, true, true);
  if (~index) {
    record = store.getAt(index);
    record.set('value', value);
    record.commit();
  } else {
    record = Ext.create(store.getModel(), {key:key, value:value});
    store.data.add(record);
  }
  store.sync();
  return !!record;
}, del:function(key) {
  var me = this, store = this.getStore(), index, record;
  if (!me.isStorage) {
    store.clear(key);
    return true;
  }
  index = store.find('key', key, 0, false, true, true);
  if (~index) {
    record = store.getAt(index);
    store.remove(record);
    store.sync();
    return true;
  }
  return false;
}});
Ext.define('SU.locale.Persistence', {singleton:true, requires:['SU.storage.LocalStorageCookie'], getLocale:function(ignoreLocation) {
  var lang;
  if (ignoreLocation !== true) {
    lang = this.getLocationLanguage();
  }
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] Persistence - Getting persisted locale id from location: ' + lang, ignoreLocation);
  }
  if (!lang) {
    lang = Ext.Cookie.get('language');
    if (!!window.DEBUG_LOCALE) {
      console.log('[LOCALE] Persistence - Getting persisted locale id from cookie: ' + lang);
    }
  }
  if (!lang) {
    lang = this.getBrowserLanguage();
    if (!!window.DEBUG_LOCALE) {
      console.log('[LOCALE] Persistence - Getting persisted locale id: ' + lang);
    }
  }
  return lang;
}, setLocale:function(value) {
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] Persistence - Persisting locale save id: ' + value);
  }
  Ext.Cookie.set('language', value);
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] Persistence - Persisting locale saved id: ' + Ext.Cookie.get('language'));
  }
}, getBrowserLanguage:function() {
  var na = navigator, locale = na.userAgent.match(/[a-z]{2}-[a-z]{2}/);
  if (!!locale) {
    locale = locale[0];
  }
  locale = locale || na.language || na.userLanguage;
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] Persistence - Getting persisted locale id from userAgent: ' + locale);
  }
  return locale.split('-')[0];
}, getLocationLanguage:function() {
  var params = Ext.urlDecode(window.location.search.substring(1));
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] Persistence - Getting persisted locale id from location: ' + params.lang);
  }
  return params.lang;
}});
Ext.define('SU.locale.model.LocaleModel', {extend:'Ext.data.Model', config:{fields:[{name:'id', type:'string'}, {name:'label', type:'string'}, {name:'url', type:'string'}, {name:'propertiesClass', type:'string'}]}});
Ext.define('SU.locale.store.LocalesStore', {extend:'Ext.data.Store', alias:'store.locales', requires:['Ext.data.reader.Json', 'SU.locale.model.LocaleModel'], config:{model:'SU.locale.model.LocaleModel', proxy:{type:'memory', reader:{type:'json', rootProperty:''}}}});
if (!Ext.isDefined(window.DEBUG_LOCALE)) {
  window.DEBUG_LOCALE = false;
}
Ext.define('SU.locale.LocaleManager', {singleton:true, alternateClassName:'Ext.Language', mixins:{observable:'Ext.util.Observable'}, requires:['SU.locale.LocalePlugin', 'SU.locale.Persistence', 'SU.locale.LocaleDelegate', 'SU.locale.store.LocalesStore'], initialized:false, clients:[], locales:null, mode:'static', getLocales:function() {
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] LocaleManager - get locales:', this.locales);
  }
  return this.locales;
}, setLocales:function(value) {
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] LocaleManager - set locales:', value);
  }
  this.locales = value;
  this.fireEvent('changelocales', {});
}, locale:'', getLocale:function() {
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] LocaleManager - get locale: ' + this.locale);
  }
  return this.locale;
}, setLocale:function(value) {
  var me = this;
  me.fireEvent('loadinglocale', {});
  me.locale = value;
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] LocaleManager - set locale: ' + value);
  }
  me.loadPropertiesFile();
}, properties:null, getProperty:function(key) {
  try {
    if (!!window.DEBUG_LOCALE) {
      console.log('[LOCALE] LocaleManager - get property: ' + key);
    }
    var res = this.properties && eval('this.properties.' + key);
    if (!!window.DEBUG_LOCALE) {
      console.log('[LOCALE] LocaleManager - property["' + key + '"]: ' + res);
    }
    return res;
  } catch (e$6) {
    console.log(key, this.properties);
    console.error(e$6);
    return null;
  }
}, getDefProperty:function(key, defaults) {
  return this.getProperty(key) || defaults;
}, getPersistedLocale:function(ignoreLocation) {
  var me = this;
  ignoreLocation = ignoreLocation || me.mode !== 'static';
  var locale = SU.locale.Persistence.getLocale(ignoreLocation);
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] LocaleManager - getPersistedLocale:', locale);
  }
  return this.locales.find('id', locale) !== -1 ? locale : me.locales.getAt(0).get('id');
}, constructor:function(config) {
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] Constructing LocaleManager');
  }
  this.mixins.observable.constructor.call(this, config);
  this.callParent(arguments);
}, loadPropertiesFile:function() {
  var me = this, rec = me.locales.findRecord('id', me.locale), fd = Ext.create('SU.locale.LocaleDelegate', me.loadPropertiesFileResultHandler, me.loadPropertiesFileFaultHandler, me), url = rec.get('url');
  fd.loadPropertiesFile(url);
}, loadPropertiesFileResultHandler:function(result) {
  var me = this, head = document.getElementsByTagName('head')[0], script = document.createElement('script');
  if (!!this.script) {
    Ext.removeNode(this.script);
  }
  script.type = 'text/javascript';
  script.innerHTML = result;
  head.appendChild(script);
  this.script = script;
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] LocaleManager - Properties file loaded: ' + me.locales.findRecord('id', me.locale).get('url'));
  }
  delete me.loadingDefault;
  setTimeout(function() {
    var rec = me.locales.findRecord('id', me.locale);
    try {
      me.properties = Ext.create(rec.get('propertiesClass'), {});
    } catch (e$7) {
    }
    me.updateClients();
    if (me.properties.setLocalization) {
      me.properties.setLocalization();
    }
    SU.locale.Persistence.setLocale(me.locale);
    me.fireEvent('changelocale', {});
    if (!me.initialized) {
      if (!!window.DEBUG_LOCALE) {
        console.log('[LOCALE] LocaleManager - Locale Manager Initialized');
      }
      me.initialized = true;
      me.fireEvent('initialized', {});
    }
  }, 300);
}, loadPropertiesFileFaultHandler:function() {
  var me = this;
  me.locale = me.getPersistedLocale(true);
  me.fireEvent('failurelocale', {});
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] ERROR: LocaleManager - Failure loading properties file');
  }
  if (!me.initialized) {
    if (!me.loadingDefault) {
      me.loadingDefault = true;
      me.loadPropertiesFile();
      return;
    }
    delete me.loadingDefault;
    if (!!window.DEBUG_LOCALE) {
      console.log('[LOCALE] LocaleManager - Locale Manager Initialized');
    }
    me.initialized = true;
    me.fireEvent('initialized', {});
  }
}, updateClients:function() {
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] LocaleManager - Updating Clients');
  }
  var len = this.clients.length - 1;
  for (var i = len; i > -1; i--) {
    this.updateClient(this.clients[i]);
  }
}, updateClient:function(clientModel) {
  var client = clientModel.get('client'), method = clientModel.get('method'), key = clientModel.get('key'), allowEmpty = clientModel.get('allowEmpty');
  try {
    var prop;
    if (key) {
      prop = this.getProperty(key);
    } else {
      prop = this.properties;
    }
    if (!!prop || allowEmpty) {
      if (typeof method === 'string') {
        client[method].call(client, prop);
      } else {
        if (typeof method === 'function') {
          method.call(client, prop);
        }
      }
    }
  } catch (e$8) {
    if (!!window.DEBUG_LOCALE) {
      console.log('[LOCALE] ERROR: LocaleManager - Error updating client [client: ' + client.getId() + ', method: ' + method + ', key: ' + key + '] - error: ' + e$8);
    }
  }
}, registerClient:function(clientModel) {
  var me = this;
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] LocaleManager - Registering client component [client: ' + clientModel.get('client').getId() + ', method: ' + clientModel.get('method') + ', key: ' + clientModel.get('key') + clientModel.get('allowEmpty') + ']');
  }
  me.clients.push(clientModel);
  var client = clientModel.get('client');
  client.on('destroy', function() {
    me.unregisterClient(clientModel);
  });
  if (me.properties) {
    me.updateClient(clientModel);
  }
}, unregisterClient:function(clientModel) {
  var me = this, clients = me.clients;
  if (!!window.DEBUG_LOCALE) {
    console.log('[LOCALE] LocaleManager - Unregistering client component [client: ' + clientModel.get('client').getId() + ', method: ' + clientModel.get('method') + ', key: ' + clientModel.get('key') + clientModel.get('allowEmpty') + ']');
  }
  for (var i in clients) {
    if (!clients.hasOwnProperty(i)) {
      continue;
    }
    if (clients[i] === clientModel) {
      clients.splice(i, 1);
      return;
    }
  }
}, updateByClient:function(client) {
  var me = this, len = me.clients.length - 1, model;
  for (var i = len; i > -1; i--) {
    model = me.clients[i];
    if (model && model.get('client') === client) {
      me.updateClient(model);
    }
  }
}});
Ext.define('SU.utils.ShowEvents', {requires:['Ext.util.Observable'], mixinConfig:{id:'showevents'}, disabledShowEvents:false, onClassMixedIn:function(cls) {
  cls.prototype.fireEvent = function() {
    var me = this;
    if (!me.disabledShowEvents) {
      console.log('[SHOW EVENTS]', me.$className, arguments[0], arguments);
    }
    return Ext.util.Observable.prototype.fireEvent.apply(this, arguments);
  };
}});
Ext.define('SU.utils.String', {singleton:true, requires:['Ext.String', 'Ext.util.Format'], declination:function(number, first, second, rest) {
  if (!(!isNaN(parseFloat(number)) && isFinite(number))) {
    return '';
  }
  number = Math.abs(+number);
  var base = number % 100, remainder = number % 10, c1 = first, c2 = second, c3 = rest;
  if (Ext.isArray(first)) {
    c2 = first[1];
    c3 = first[2];
    c1 = first[0];
  }
  if (!c3) {
    if (number === 1) {
      return c1;
    }
    return c2;
  }
  if (base > 9 && base < 20) {
    return c3;
  } else {
    if (1 === remainder) {
      return c1;
    } else {
      if (0 < remainder && 5 > remainder) {
        return c2;
      } else {
        return c3;
      }
    }
  }
}, textWidth:function(text, font) {
  var me = this, proto = me.textWidth;
  var canvas = proto.canvas || (proto.canvas = document.createElement('canvas'));
  var context = canvas.getContext('2d');
  font && (context.font = font);
  return context.measureText(text).width;
}}, function() {
  var utilString = SU.utils.String;
  Ext.apply(Ext.String, utilString);
  Ext.util.Format.declination = utilString.declination;
});
Ext.define('SU.widgets.Avatar', {extend:'Ext.Widget', alternateClassName:['Ext.Avatar'], alias:'widget.avatar', config:{proportions:60, userName:undefined, image:undefined}, baseCls:'x-avatar', element:{reference:'element', children:[{reference:'innerElement', cls:'x-avatar-inner'}]}, updateProportions:function(size) {
  this.element.setStyle('font-size', size * 0.35 + 'px');
  this.setHeight(size);
  this.setWidth(size);
}, updateUserName:function(name) {
  var me = this;
  if (me.getImage() || !name) {
    me.innerElement.dom.setAttribute('data-content', '');
    return;
  }
  name = name.split(' ').filter(function(s) {
    return s.length > 3;
  }).map(function(s) {
    return s.substr(0, 1);
  }).slice(0, 2).join('');
  me.innerElement.dom.setAttribute('data-content', name);
}, updateImage:function(image) {
  var me = this, bg = image ? 'url(' + image + ')' : 'none';
  me.element.setStyle('background-image', bg);
  me.updateUserName(me.getUserName());
}});
Ext.define('SU.LangSelect', {extend:'Ext.form.ComboBox', alias:'widget.languagefield', alternateClassName:['Ext.field.LangSelect', 'Ext.form.LangSelect'], valueField:'id', displayField:'label', usePicker:false, submitValue:false, forceSelection:true, queryMode:'local', editable:false, initComponent:function() {
  var me = this;
  me.callParent();
  me.setStore(Ext.Language.getLocales());
  me.setValue(Ext.Language.getPersistedLocale(true));
}, onChange:function(newValue, oldValue) {
  var me = this;
  try {
    var locale = me.getValue();
    if (locale !== Ext.Language.getLocale()) {
      if (Ext.Language.mode === 'static') {
        var params = Ext.urlDecode(window.location.search.substring(1));
        params.lang = locale;
        window.location.search = Ext.urlEncode(params);
      } else {
        if (!!Ext.Language.initialized) {
          var cbChange = function() {
            me.self.superclass.onChange.call(me, newValue, oldValue);
            Ext.Language.un({changeLocale:cbChange, failureLocale:cbFailure});
          }, cbFailure = function() {
            me.setValue(Ext.Language.getPersistedLocale(true));
            Ext.Language.un({changeLocale:cbChange, failureLocale:cbFailure});
          };
          Ext.Language.on({changeLocale:cbChange, failureLocale:cbFailure});
          Ext.Language.setLocale(locale);
        }
      }
    }
  } catch (e$9) {
    alert('onChange ' + e$9);
  }
}});
Ext.define('SU.form.field.Search', {extend:'Ext.form.field.Text', alternateClassName:['Ext.form.field.Search', 'Ext.form.Search', 'Ext.form.SearchField'], alias:'widget.searchfield', cls:Ext.baseCSSPrefix + 'form-type-search', config:{reuse:true}, triggers:{clear:{weight:0, cls:Ext.baseCSSPrefix + 'form-clear-trigger', hidden:true, handler:'doClear', scope:'this'}, search:{weight:1, cls:Ext.baseCSSPrefix + 'form-search-trigger', handler:'mybeFireSearch', scope:'this'}}, listeners:{specialkey:function(f, 
e) {
  if (e.getKey() === e.ENTER) {
    e.stopEvent();
    this.mybeFireSearch();
    return false;
  }
}, change:function(f, v) {
  this.syncClearTrigger();
  if (v.length === 0) {
    this.mybeFireSearch();
  }
}}, privates:{syncClearTrigger:function() {
  var me = this, clear = me.getTriggers().clear, value = me.getValue();
  clear.setVisible(!!value);
}, doClear:function() {
  this.setValue('');
}, mybeFireSearch:function() {
  var me = this, value = me.getValue();
  if (!!value && value.length > 0) {
    if (me.getReuse() || me.searchText !== value) {
      me.searchText = value;
      me.fireEvent('search', me, value);
    }
  } else {
    if (me.getReuse() || !!me.searchText) {
      me.searchText = undefined;
      me.fireEvent('search', me, null);
    }
  }
}}});
Ext.define('SU.grid.feature.CheckboxGrouping', {extend:'Ext.grid.feature.Grouping', alias:'feature.checkboxgrouping', checkDataIndex:'isChecked', startCollapsed:true, injectCheckbox:0, checkOnly:false, headerWidth:24, checkerOnCls:Ext.baseCSSPrefix + 'grid-hd-checker-on', tdCls:Ext.baseCSSPrefix + 'grid-cell-special ' + Ext.baseCSSPrefix + 'selmodel-column', targetCls:'group-checkbox', init:function(grid) {
  var store = grid.getStore(), view = grid.getView();
  view.on({beforerender:'beforeViewRender', selectionchange:'changeViewSelection', select:'onViewSelect', deselect:'onViewDeselect', scope:this});
  this.groupHeaderTpl = '\x3cinput class\x3d"' + this.targetCls + '" {[values.isChecked ? "checked" : ""]} type\x3d"checkbox"\x3e {name}';
  this.callParent(arguments);
}, beforeViewRender:function(view) {
  var me = this, selModel = view.grid.selModel, ownerLockable = view.grid.ownerLockable, isLocked = selModel.locked;
  if (me.injectCheckbox !== false) {
    if (ownerLockable && !me.lockListeners) {
      me.lockListeners = ownerLockable.mon(ownerLockable, {lockcolumn:me.onColumnLock, unlockcolumn:me.onColumnUnlock, scope:me, destroyable:true});
    }
    if (!ownerLockable || view.isLockedView && (me.hasLockedHeader() || isLocked) || view.isNormalView && !me.column) {
      me.addCheckbox(view);
      me.mon(view.ownerGrid, {beforereconfigure:me.onBeforeReconfigure, reconfigure:me.onReconfigure, scope:me});
    }
  }
  me.dataSource.on('groupchange', me.onGroupChange, me);
}, onGroupChange:function(store, group) {
  var me = this, sm = me.grid.selModel;
  if (me.column) {
    me.column.setHidden(!group);
  }
  sm.suspendEvents();
  sm.deselectAll();
  sm.resumeEvents();
  me.callParent(arguments);
}, hasLockedHeader:function() {
  var columns = this.grid.getVisibleColumnManager().getColumns(), len = columns.length, i;
  for (i = 0; i < len; i++) {
    if (columns[i].locked) {
      return true;
    }
  }
  return false;
}, onColumnUnlock:function(lockable, column) {
  var me = this, checkbox = me.injectCheckbox, lockedColumns = lockable.lockedGrid.visibleColumnManager.getColumns();
  if (lockedColumns.length === 1 && lockedColumns[0] === me.column) {
    if (checkbox === 'first') {
      checkbox = 0;
    } else {
      if (checkbox === 'last') {
        checkbox = lockable.normalGrid.visibleColumnManager.getColumns().length;
      }
    }
    lockable.unlock(me.column, checkbox);
  }
}, onColumnLock:function(lockable, column) {
  var me = this, checkbox = me.injectCheckbox, lockedColumns = lockable.lockedGrid.visibleColumnManager.getColumns();
  if (lockedColumns.length === 1) {
    if (checkbox === 'first') {
      checkbox = 0;
    } else {
      if (checkbox === 'last') {
        checkbox = lockable.lockedGrid.visibleColumnManager.getColumns().length;
      }
    }
    lockable.lock(me.column, checkbox);
  }
}, onBeforeReconfigure:function(grid, store, columns) {
  var column = this.column, headerCt = column.ownerCt;
  if (columns && headerCt) {
    headerCt.remove(column, false);
  }
}, onReconfigure:function(grid, store, columns, oldStore, oldColumns) {
  var me = this, view = grid.getView();
  if (columns) {
    if (grid.lockable) {
      if (grid.lockedGrid.isVisible()) {
        grid.lock(me.column, 0);
      } else {
        grid.unlock(me.column, 0);
      }
    } else {
      me.addCheckbox(view);
    }
    view.refreshView();
  }
  if (oldStore) {
    store.un('update', me.onStoreUpdate, me);
  }
  if (store) {
    store.on('update', me.onStoreUpdate, me);
  }
}, addCheckbox:function(view) {
  var me = this, checkboxIndex = me.injectCheckbox, headerCt = view.headerCt;
  if (checkboxIndex !== false) {
    if (checkboxIndex === 'first') {
      checkboxIndex = 0;
    } else {
      if (checkboxIndex === 'last') {
        checkboxIndex = headerCt.getColumnCount();
      }
    }
    Ext.suspendLayouts();
    me.column = headerCt.add(checkboxIndex, me.column || me.getHeaderConfig());
    Ext.resumeLayouts();
  }
}, getHeaderConfig:function() {
  var me = this, config;
  config = {xtype:'checkcolumn', dataIndex:me.checkDataIndex, headerCheckbox:false, isCheckerHd:false, ignoreExport:true, text:me.headerText, width:me.headerWidth, sortable:false, draggable:false, resizable:false, hideable:false, hidden:true, menuDisabled:true, checkOnly:me.checkOnly, checkboxAriaRole:'presentation', tdCls:Ext.baseCSSPrefix + 'selmodel-checkbox ' + me.tdCls, cls:Ext.baseCSSPrefix + 'selmodel-column', locked:me.hasLockedHeader(), setRecordCheck:function(record, recordIndex, checked, 
  cell) {
    record.beginEdit();
    record.set(this.dataIndex, checked, {dirty:false});
    record.endEdit();
  }};
  if (!me.checkOnly) {
    config.tabIndex = undefined;
    config.ariaRole = 'presentation';
    config.focusable = false;
  } else {
  }
  return config;
}, setupRowData:function(record, idx, rowValues) {
  var me = this, field = me.getGroupField();
  me.callParent(arguments);
  if (field) {
    rowValues.isChecked = me.groupRenderInfo.isChecked = this.getMetaGroup(record.get(field)).isChecked;
  }
}, checkAllGroups:function(groupName) {
  var store = this.view.getStore();
  var groupField = this.getGroupField();
  if (store) {
    var groups = store.getGroups();
    if (groups) {
      groups.each(function(groupRec) {
        var allChecked = true;
        var groupKey = groupRec.getGroupKey();
        var checkGroup = true;
        if (groupName) {
          if (groupKey !== groupName) {
            checkGroup = false;
          }
        }
        if (checkGroup) {
          groupRec.each(function(rec) {
            allChecked = rec.get(this.checkDataIndex);
            groupName = rec.get(groupField);
            if (allChecked === false) {
              return false;
            }
          }, this);
          this.updateParentRecord(groupName, allChecked);
        }
      }, this);
    }
  }
}, updateParentRecord:function(groupName, checked) {
  var me = this, parentRecord = this.getParentRecord(groupName);
  var metaGroup = this.getMetaGroup(groupName);
  if (metaGroup.isChecked !== checked) {
    metaGroup.isChecked = checked;
    if (!me.updatingRecords) {
      me.refreshView(groupName);
    }
  }
}, getParentRecord:function(groupName) {
  var parentRecord;
  var metaGroup;
  if (this.getMetaGroup) {
    metaGroup = this.getMetaGroup(groupName);
  } else {
    metaGroup = this.groupCache[groupName];
  }
  if (metaGroup) {
    parentRecord = metaGroup.placeholder;
  }
  return parentRecord;
}, refreshView:function(groupName) {
  var view = this.view;
  if (view) {
    view.refreshView();
  }
}, changeViewSelection:function(selModel, records) {
}, onViewSelect:function(selModel, record) {
  var me = this;
  var groupField = this.getGroupField();
  var selection = selModel.getSelection();
  if (!groupField) {
    return;
  }
  if (this.chacheSelection && Ext.Array.equals(this.chacheSelection, selection)) {
    return;
  }
  if (this.grid.ownerLockable.lockedGrid !== this.grid) {
    return;
  }
  var groupName = record.get(groupField);
  var groupRecord = this.getRecordGroup(record);
  var selected = true;
  groupRecord.each(function(rec) {
    if (!~selection.indexOf(rec)) {
      selected = false;
      return false;
    }
  });
  this.updateParentRecord(groupName, selected);
  this.chacheSelection = selection;
}, onViewDeselect:function(selModel, record) {
  var groupField = this.getGroupField();
  var selection = selModel.getSelection();
  if (!groupField) {
    return;
  }
  if (this.chacheSelection && Ext.Array.equals(this.chacheSelection, selection)) {
    return;
  }
  if (this.grid.ownerLockable.lockedGrid !== this.grid) {
    return;
  }
  this.updateParentRecord(record.get(groupField), false);
  this.chacheSelection = selection;
}, onStoreUpdate:function(store, record, operation, modifiedFieldNames, details, eOpts) {
  console.log('update');
  var grid = this.grid;
  if (!this.updatingRecords && grid && record) {
    var groupName = record.get(this.getGroupField());
    this.checkAllGroups(groupName);
    this.refreshView(groupName);
  }
}, setRecordChecked:function(rec, checked) {
}, onGroupClick:function(grid, node, group, event, eOpts) {
  if (event && grid) {
    var me = this, sm = me.grid.selModel, target = event.getTarget('.' + me.targetCls), store = grid.getStore(), groupRecord = me.getRecordGroup(event.record);
    if (target && store && groupRecord) {
      var checked = target.checked;
      me.updatingRecords = true;
      if (checked) {
        sm.doSelect(Ext.Array.clone(groupRecord.items), true, true);
      } else {
        sm.doDeselect(Ext.Array.clone(groupRecord.items), true);
      }
      me.updateParentRecord(group, checked);
      me.updatingRecords = false;
    } else {
      this.callParent(arguments);
    }
  }
}});
