// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _primordials = primordials,
    ArrayIsArray = _primordials.ArrayIsArray,
    ArrayPrototypeFilter = _primordials.ArrayPrototypeFilter,
    ArrayPrototypeIncludes = _primordials.ArrayPrototypeIncludes,
    ArrayPrototypeJoin = _primordials.ArrayPrototypeJoin,
    ArrayPrototypeLastIndexOf = _primordials.ArrayPrototypeLastIndexOf,
    ArrayPrototypePush = _primordials.ArrayPrototypePush,
    ArrayPrototypeSlice = _primordials.ArrayPrototypeSlice,
    ArrayPrototypeSort = _primordials.ArrayPrototypeSort,
    ArrayPrototypeSplice = _primordials.ArrayPrototypeSplice,
    ArrayPrototypeUnshift = _primordials.ArrayPrototypeUnshift,
    Error = _primordials.Error,
    NumberIsInteger = _primordials.NumberIsInteger,
    ObjectAssign = _primordials.ObjectAssign,
    ObjectDefineProperty = _primordials.ObjectDefineProperty,
    ObjectPrototypeHasOwnProperty = _primordials.ObjectPrototypeHasOwnProperty,
    Promise = _primordials.Promise,
    RegExpPrototypeTest = _primordials.RegExpPrototypeTest,
    SafeSet = _primordials.SafeSet,
    StringPrototypeSlice = _primordials.StringPrototypeSlice,
    StringPrototypeToUpperCase = _primordials.StringPrototypeToUpperCase;

var _require = require('internal/util'),
    promisify = _require.promisify,
    convertToValidSignal = _require.convertToValidSignal,
    getSystemErrorName = _require.getSystemErrorName;

var _require2 = require('internal/util/types'),
    isArrayBufferView = _require2.isArrayBufferView;

var debug = require('internal/util/debuglog').debuglog('child_process', function (fn) {
  debug = fn;
});

var _require3 = require('buffer'),
    Buffer = _require3.Buffer;

var _internalBinding = internalBinding('pipe_wrap'),
    Pipe = _internalBinding.Pipe,
    PipeConstants = _internalBinding.constants;

var _require4 = require('internal/errors'),
    AbortError = _require4.AbortError,
    errorCodes = _require4.codes;

var ERR_INVALID_ARG_VALUE = errorCodes.ERR_INVALID_ARG_VALUE,
    ERR_CHILD_PROCESS_IPC_REQUIRED = errorCodes.ERR_CHILD_PROCESS_IPC_REQUIRED,
    ERR_CHILD_PROCESS_STDIO_MAXBUFFER = errorCodes.ERR_CHILD_PROCESS_STDIO_MAXBUFFER,
    ERR_INVALID_ARG_TYPE = errorCodes.ERR_INVALID_ARG_TYPE,
    ERR_OUT_OF_RANGE = errorCodes.ERR_OUT_OF_RANGE;

var _require5 = require('timers'),
    clearTimeout = _require5.clearTimeout,
    setTimeout = _require5.setTimeout;

var _require6 = require('internal/validators'),
    validateString = _require6.validateString,
    isInt32 = _require6.isInt32,
    validateAbortSignal = _require6.validateAbortSignal;

var child_process = require('internal/child_process');

var getValidStdio = child_process.getValidStdio,
    setupChannel = child_process.setupChannel,
    ChildProcess = child_process.ChildProcess,
    stdioStringToArray = child_process.stdioStringToArray;
var MAX_BUFFER = 1024 * 1024;

function fork(modulePath
/* , args, options */
) {
  validateString(modulePath, 'modulePath'); // Get options and args arguments.

  var execArgv;
  var options = {};
  var args = [];
  var pos = 1;

  if (pos < arguments.length && ArrayIsArray(arguments[pos])) {
    args = arguments[pos++];
  }

  if (pos < arguments.length && (arguments[pos] === undefined || arguments[pos] === null)) {
    pos++;
  }

  if (pos < arguments.length && arguments[pos] != null) {
    if (_typeof(arguments[pos]) !== 'object') {
      throw new ERR_INVALID_ARG_VALUE("arguments[".concat(pos, "]"), arguments[pos]);
    }

    options = _objectSpread({}, arguments[pos++]);
  } // Prepare arguments for fork:


  execArgv = options.execArgv || process.execArgv;

  if (execArgv === process.execArgv && process._eval != null) {
    var index = ArrayPrototypeLastIndexOf(execArgv, process._eval);

    if (index > 0) {
      // Remove the -e switch to avoid fork bombing ourselves.
      execArgv = ArrayPrototypeSlice(execArgv);
      ArrayPrototypeSplice(execArgv, index - 1, 2);
    }
  }

  args = [].concat(_toConsumableArray(execArgv), [modulePath], _toConsumableArray(args));

  if (typeof options.stdio === 'string') {
    options.stdio = stdioStringToArray(options.stdio, 'ipc');
  } else if (!ArrayIsArray(options.stdio)) {
    // Use a separate fd=3 for the IPC channel. Inherit stdin, stdout,
    // and stderr from the parent if silent isn't set.
    options.stdio = stdioStringToArray(options.silent ? 'pipe' : 'inherit', 'ipc');
  } else if (!ArrayPrototypeIncludes(options.stdio, 'ipc')) {
    throw new ERR_CHILD_PROCESS_IPC_REQUIRED('options.stdio');
  }

  options.execPath = options.execPath || process.execPath;
  options.shell = false;
  return spawn(options.execPath, args, options);
}

function _forkChild(fd, serializationMode) {
  // set process.send()
  var p = new Pipe(PipeConstants.IPC);
  p.open(fd);
  p.unref();
  var control = setupChannel(process, p, serializationMode);
  process.on('newListener', function onNewListener(name) {
    if (name === 'message' || name === 'disconnect') control.refCounted();
  });
  process.on('removeListener', function onRemoveListener(name) {
    if (name === 'message' || name === 'disconnect') control.unrefCounted();
  });
}

function normalizeExecArgs(command, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  } // Make a shallow copy so we don't clobber the user's options object.


  options = _objectSpread({}, options);
  options.shell = typeof options.shell === 'string' ? options.shell : true;
  return {
    file: command,
    options: options,
    callback: callback
  };
}

function exec(command, options, callback) {
  var opts = normalizeExecArgs(command, options, callback);
  return module.exports.execFile(opts.file, opts.options, opts.callback);
}

var customPromiseExecFunction = function customPromiseExecFunction(orig) {
  return function () {
    var resolve;
    var reject;
    var promise = new Promise(function (res, rej) {
      resolve = res;
      reject = rej;
    });

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    promise.child = orig.apply(void 0, args.concat([function (err, stdout, stderr) {
      if (err !== null) {
        err.stdout = stdout;
        err.stderr = stderr;
        reject(err);
      } else {
        resolve({
          stdout: stdout,
          stderr: stderr
        });
      }
    }]));
    return promise;
  };
};

ObjectDefineProperty(exec, promisify.custom, {
  enumerable: false,
  value: customPromiseExecFunction(exec)
});

function execFile(file
/* , args, options, callback */
) {
  var args = [];
  var callback;
  var options; // Parse the optional positional parameters.

  var pos = 1;

  if (pos < arguments.length && ArrayIsArray(arguments[pos])) {
    args = arguments[pos++];
  } else if (pos < arguments.length && arguments[pos] == null) {
    pos++;
  }

  if (pos < arguments.length && _typeof(arguments[pos]) === 'object') {
    options = arguments[pos++];
  } else if (pos < arguments.length && arguments[pos] == null) {
    pos++;
  }

  if (pos < arguments.length && typeof arguments[pos] === 'function') {
    callback = arguments[pos++];
  }

  if (!callback && pos < arguments.length && arguments[pos] != null) {
    throw new ERR_INVALID_ARG_VALUE('args', arguments[pos]);
  }

  options = _objectSpread({
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: MAX_BUFFER,
    killSignal: 'SIGTERM',
    cwd: null,
    env: null,
    shell: false
  }, options); // Validate the timeout, if present.

  validateTimeout(options.timeout); // Validate maxBuffer, if present.

  validateMaxBuffer(options.maxBuffer); // Validate signal, if present

  validateAbortSignal(options.signal, 'options.signal');
  options.killSignal = sanitizeKillSignal(options.killSignal);
  var child = spawn(file, args, {
    cwd: options.cwd,
    env: options.env,
    gid: options.gid,
    uid: options.uid,
    shell: options.shell,
    windowsHide: !!options.windowsHide,
    windowsVerbatimArguments: !!options.windowsVerbatimArguments
  });
  var encoding;
  var _stdout = [];
  var _stderr = [];

  if (options.encoding !== 'buffer' && Buffer.isEncoding(options.encoding)) {
    encoding = options.encoding;
  } else {
    encoding = null;
  }

  var stdoutLen = 0;
  var stderrLen = 0;
  var killed = false;
  var exited = false;
  var timeoutId;
  var ex = null;
  var cmd = file;

  function exithandler(code, signal) {
    if (exited) return;
    exited = true;

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    if (!callback) return; // merge chunks

    var stdout;
    var stderr;

    if (encoding || child.stdout && child.stdout.readableEncoding) {
      stdout = ArrayPrototypeJoin(_stdout, '');
    } else {
      stdout = Buffer.concat(_stdout);
    }

    if (encoding || child.stderr && child.stderr.readableEncoding) {
      stderr = ArrayPrototypeJoin(_stderr, '');
    } else {
      stderr = Buffer.concat(_stderr);
    }

    if (!ex && code === 0 && signal === null) {
      callback(null, stdout, stderr);
      return;
    }

    if (args.length !== 0) cmd += " ".concat(ArrayPrototypeJoin(args, ' '));

    if (!ex) {
      // eslint-disable-next-line no-restricted-syntax
      ex = new Error('Command failed: ' + cmd + '\n' + stderr);
      ex.killed = child.killed || killed;
      ex.code = code < 0 ? getSystemErrorName(code) : code;
      ex.signal = signal;
    }

    ex.cmd = cmd;
    callback(ex, stdout, stderr);
  }

  function errorhandler(e) {
    ex = e;
    if (child.stdout) child.stdout.destroy();
    if (child.stderr) child.stderr.destroy();
    exithandler();
  }

  function kill() {
    if (child.stdout) child.stdout.destroy();
    if (child.stderr) child.stderr.destroy();
    killed = true;

    try {
      child.kill(options.killSignal);
    } catch (e) {
      ex = e;
      exithandler();
    }
  }

  if (options.timeout > 0) {
    timeoutId = setTimeout(function delayedKill() {
      kill();
      timeoutId = null;
    }, options.timeout);
  }

  if (options.signal) {
    if (options.signal.aborted) {
      process.nextTick(function () {
        return kill();
      });
    } else {
      options.signal.addEventListener('abort', function () {
        if (!ex) {
          ex = new AbortError();
        }

        kill();
      });

      var remove = function remove() {
        return options.signal.removeEventListener('abort', kill);
      };

      child.once('close', remove);
    }
  }

  if (child.stdout) {
    if (encoding) child.stdout.setEncoding(encoding);
    child.stdout.on('data', function onChildStdout(chunk) {
      var encoding = child.stdout.readableEncoding;
      var length = encoding ? Buffer.byteLength(chunk, encoding) : chunk.length;
      var slice = encoding ? StringPrototypeSlice : function (buf) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return buf.slice.apply(buf, args);
      };
      stdoutLen += length;

      if (stdoutLen > options.maxBuffer) {
        var truncatedLen = options.maxBuffer - (stdoutLen - length);
        ArrayPrototypePush(_stdout, slice(chunk, 0, truncatedLen));
        ex = new ERR_CHILD_PROCESS_STDIO_MAXBUFFER('stdout');
        kill();
      } else {
        ArrayPrototypePush(_stdout, chunk);
      }
    });
  }

  if (child.stderr) {
    if (encoding) child.stderr.setEncoding(encoding);
    child.stderr.on('data', function onChildStderr(chunk) {
      var encoding = child.stderr.readableEncoding;
      var length = encoding ? Buffer.byteLength(chunk, encoding) : chunk.length;
      stderrLen += length;

      if (stderrLen > options.maxBuffer) {
        var truncatedLen = options.maxBuffer - (stderrLen - length);
        ArrayPrototypePush(_stderr, chunk.slice(0, truncatedLen));
        ex = new ERR_CHILD_PROCESS_STDIO_MAXBUFFER('stderr');
        kill();
      } else {
        _stderr.push(chunk);
      }
    });
  }

  child.addListener('close', exithandler);
  child.addListener('error', errorhandler);
  return child;
}

ObjectDefineProperty(execFile, promisify.custom, {
  enumerable: false,
  value: customPromiseExecFunction(execFile)
});

function normalizeSpawnArguments(file, args, options) {
  validateString(file, 'file');
  if (file.length === 0) throw new ERR_INVALID_ARG_VALUE('file', file, 'cannot be empty');

  if (ArrayIsArray(args)) {
    args = ArrayPrototypeSlice(args);
  } else if (args == null) {
    args = [];
  } else if (_typeof(args) !== 'object') {
    throw new ERR_INVALID_ARG_TYPE('args', 'object', args);
  } else {
    options = args;
    args = [];
  }

  if (options === undefined) options = {};else if (options === null || _typeof(options) !== 'object') throw new ERR_INVALID_ARG_TYPE('options', 'object', options); // Validate the cwd, if present.

  if (options.cwd != null && typeof options.cwd !== 'string') {
    throw new ERR_INVALID_ARG_TYPE('options.cwd', 'string', options.cwd);
  } // Validate detached, if present.


  if (options.detached != null && typeof options.detached !== 'boolean') {
    throw new ERR_INVALID_ARG_TYPE('options.detached', 'boolean', options.detached);
  } // Validate the uid, if present.


  if (options.uid != null && !isInt32(options.uid)) {
    throw new ERR_INVALID_ARG_TYPE('options.uid', 'int32', options.uid);
  } // Validate the gid, if present.


  if (options.gid != null && !isInt32(options.gid)) {
    throw new ERR_INVALID_ARG_TYPE('options.gid', 'int32', options.gid);
  } // Validate the shell, if present.


  if (options.shell != null && typeof options.shell !== 'boolean' && typeof options.shell !== 'string') {
    throw new ERR_INVALID_ARG_TYPE('options.shell', ['boolean', 'string'], options.shell);
  } // Validate argv0, if present.


  if (options.argv0 != null && typeof options.argv0 !== 'string') {
    throw new ERR_INVALID_ARG_TYPE('options.argv0', 'string', options.argv0);
  } // Validate windowsHide, if present.


  if (options.windowsHide != null && typeof options.windowsHide !== 'boolean') {
    throw new ERR_INVALID_ARG_TYPE('options.windowsHide', 'boolean', options.windowsHide);
  } // Validate windowsVerbatimArguments, if present.


  var _options = options,
      windowsVerbatimArguments = _options.windowsVerbatimArguments;

  if (windowsVerbatimArguments != null && typeof windowsVerbatimArguments !== 'boolean') {
    throw new ERR_INVALID_ARG_TYPE('options.windowsVerbatimArguments', 'boolean', windowsVerbatimArguments);
  }

  if (options.shell) {
    var command = ArrayPrototypeJoin([file].concat(_toConsumableArray(args)), ' '); // Set the shell, switches, and commands.

    if (process.platform === 'win32') {
      if (typeof options.shell === 'string') file = options.shell;else file = process.env.comspec || 'cmd.exe'; // '/d /s /c' is used only for cmd.exe.

      if (RegExpPrototypeTest(/^(?:.*\\)?cmd(?:\.exe)?$/i, file)) {
        args = ['/d', '/s', '/c', "\"".concat(command, "\"")];
        windowsVerbatimArguments = true;
      } else {
        args = ['-c', command];
      }
    } else {
      if (typeof options.shell === 'string') file = options.shell;else if (process.platform === 'android') file = '/system/bin/sh';else file = '/bin/sh';
      args = ['-c', command];
    }
  }

  if (typeof options.argv0 === 'string') {
    ArrayPrototypeUnshift(args, options.argv0);
  } else {
    ArrayPrototypeUnshift(args, file);
  }

  var env = options.env || process.env;
  var envPairs = []; // process.env.NODE_V8_COVERAGE always propagates, making it possible to
  // collect coverage for programs that spawn with white-listed environment.

  if (process.env.NODE_V8_COVERAGE && !ObjectPrototypeHasOwnProperty(options.env || {}, 'NODE_V8_COVERAGE')) {
    env.NODE_V8_COVERAGE = process.env.NODE_V8_COVERAGE;
  }

  var envKeys = []; // Prototype values are intentionally included.

  for (var key in env) {
    ArrayPrototypePush(envKeys, key);
  }

  if (process.platform === 'win32') {
    // On Windows env keys are case insensitive. Filter out duplicates,
    // keeping only the first one (in lexicographic order)
    var sawKey = new SafeSet();
    envKeys = ArrayPrototypeFilter(ArrayPrototypeSort(envKeys), function (key) {
      var uppercaseKey = StringPrototypeToUpperCase(key);

      if (sawKey.has(uppercaseKey)) {
        return false;
      }

      sawKey.add(uppercaseKey);
      return true;
    });
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = envKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _key3 = _step.value;
      var value = env[_key3];

      if (value !== undefined) {
        ArrayPrototypePush(envPairs, "".concat(_key3, "=").concat(value));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return _objectSpread({}, options, {
    args: args,
    detached: !!options.detached,
    envPairs: envPairs,
    file: file,
    windowsHide: !!options.windowsHide,
    windowsVerbatimArguments: !!windowsVerbatimArguments
  });
}

function spawn(file, args, options) {
  var child = new ChildProcess();
  options = normalizeSpawnArguments(file, args, options);
  debug('spawn', options);
  child.spawn(options);
  return child;
}

function spawnSync(file, args, options) {
  options = _objectSpread({
    maxBuffer: MAX_BUFFER
  }, normalizeSpawnArguments(file, args, options));
  debug('spawnSync', options); // Validate the timeout, if present.

  validateTimeout(options.timeout); // Validate maxBuffer, if present.

  validateMaxBuffer(options.maxBuffer); // Validate and translate the kill signal, if present.

  options.killSignal = sanitizeKillSignal(options.killSignal);
  options.stdio = getValidStdio(options.stdio || 'pipe', true).stdio;

  if (options.input) {
    var stdin = options.stdio[0] = _objectSpread({}, options.stdio[0]);

    stdin.input = options.input;
  } // We may want to pass data in on any given fd, ensure it is a valid buffer


  for (var i = 0; i < options.stdio.length; i++) {
    var input = options.stdio[i] && options.stdio[i].input;

    if (input != null) {
      var pipe = options.stdio[i] = _objectSpread({}, options.stdio[i]);

      if (isArrayBufferView(input)) {
        pipe.input = input;
      } else if (typeof input === 'string') {
        pipe.input = Buffer.from(input, options.encoding);
      } else {
        throw new ERR_INVALID_ARG_TYPE("options.stdio[".concat(i, "]"), ['Buffer', 'TypedArray', 'DataView', 'string'], input);
      }
    }
  }

  return child_process.spawnSync(options);
}

function checkExecSyncError(ret, args, cmd) {
  var err;

  if (ret.error) {
    err = ret.error;
  } else if (ret.status !== 0) {
    var msg = 'Command failed: ';
    msg += cmd || ArrayPrototypeJoin(args, ' ');
    if (ret.stderr && ret.stderr.length > 0) msg += "\n".concat(ret.stderr.toString()); // eslint-disable-next-line no-restricted-syntax

    err = new Error(msg);
  }

  if (err) {
    ObjectAssign(err, ret);
  }

  return err;
}

function execFileSync(command, args, options) {
  options = normalizeSpawnArguments(command, args, options);
  var inheritStderr = !options.stdio;
  var ret = spawnSync(options.file, ArrayPrototypeSlice(options.args, 1), options);
  if (inheritStderr && ret.stderr) process.stderr.write(ret.stderr);
  var err = checkExecSyncError(ret, options.args, undefined);
  if (err) throw err;
  return ret.stdout;
}

function execSync(command, options) {
  var opts = normalizeExecArgs(command, options, null);
  var inheritStderr = !opts.options.stdio;
  var ret = spawnSync(opts.file, opts.options);
  if (inheritStderr && ret.stderr) process.stderr.write(ret.stderr);
  var err = checkExecSyncError(ret, opts.args, command);
  if (err) throw err;
  return ret.stdout;
}

function validateTimeout(timeout) {
  if (timeout != null && !(NumberIsInteger(timeout) && timeout >= 0)) {
    throw new ERR_OUT_OF_RANGE('timeout', 'an unsigned integer', timeout);
  }
}

function validateMaxBuffer(maxBuffer) {
  if (maxBuffer != null && !(typeof maxBuffer === 'number' && maxBuffer >= 0)) {
    throw new ERR_OUT_OF_RANGE('options.maxBuffer', 'a positive number', maxBuffer);
  }
}

function sanitizeKillSignal(killSignal) {
  if (typeof killSignal === 'string' || typeof killSignal === 'number') {
    return convertToValidSignal(killSignal);
  } else if (killSignal != null) {
    throw new ERR_INVALID_ARG_TYPE('options.killSignal', ['string', 'number'], killSignal);
  }
}

module.exports = {
  _forkChild: _forkChild,
  ChildProcess: ChildProcess,
  exec: exec,
  execFile: execFile,
  execFileSync: execFileSync,
  execSync: execSync,
  fork: fork,
  spawn: spawn,
  spawnSync: spawnSync
};