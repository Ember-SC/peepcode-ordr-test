/**
 * Pavlov Improved - Test framework-independent behavioral API
 *
 * version 0.4.0pre
 *
 * http://github.com/mmonteleone/pavlov
 *
 * Copyright (c) 2009-2011 Michael Monteleone
 * Licensed under terms of the MIT License (README.markdown)
 */
/*jshint onevar: false*/
/*jslint browser: true, vars: true, undef: true, plusplus: true, regexp: true, unparam: true */

(function (global) {
    'use strict';
    // ===========
    // = Helpers =
    // ===========

    var util = {
        /**
         * Iterates over an object or array
         * @param {Object|Array} object object or array to iterate
         * @param {Function} callback callback for each iterated item
         */
        each: function (object, callback) {
            if (object === undefined || callback === undefined || object === null || callback === null) {
                throw new Error("both 'target' and 'callback' arguments are required");
            }
            var name,
                i = 0,
                length = object.length,
                value;

            if (length === undefined) {
                for (name in object) {
                    if (object.hasOwnProperty(name)) {
                        if (callback.call(object[name], name, object[name]) === false) {
                            break;
                        }
                    }
                }
            } else {
                value = object[0];
                while (i < length && callback.call(value, i, value) !== false) {
                    value = object[++i];
                }
            }

            return object;
        },
        /**
         * converts an array-like object to an array
         * @param {Object} array array-like object
         * @returns array
         */
        makeArray: function (array) {
            return Array.prototype.slice.call(array);
        },
        /**
         * returns the type of any object (in lowercase)
         * @param  {Mixed} obj object or any other variable
         * @return {[type]}     [description]
         */
        type: function (obj) {
            if (obj === undefined || obj === null) {
                return String(obj);
            }
            return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        },
        /**
         * checks if an object is of type type
         * @param  {String} type e.g. array
         * @param  {Mixed}  obj  the object to check, e.g. []
         * @return {Boolean}
         */
        is: function (type, object) {
            return type === util.type(object);
        },
        /**
         * merges properties form one object to another
         * @param {Object} dest object to receive merged properties
         * @param {Object} src object containing properies to merge
         */
        extend: function (dest, src) {
            if (dest === undefined || src === undefined || dest === null || src === null) {
                throw new Error("both 'source' and 'target' arguments " +
                                "are required");
            }
            var prop;
            for (prop in src) {
                if (src.hasOwnProperty(prop)) {
                    dest[prop] = src[prop];
                }
            }
        },
        /**
         * Print a readable version of a value / object / whatever.
         * @param {mixed} obj the object to display
         * @param {boolean} [printDetails] also display code of functions
         * @return {string}
         */
        prettyPrint: function (obj, printDetails) {
            if (util.is('string', obj)) {
                return '"' + obj + '"';
            }
            if (util.is('array', obj)) {
                return '[' + obj.toString() + ']';
            }
            if (util.is('function', obj)) {
                return printDetails ? obj.toString() : 'function()';
            }
            return String(obj);
        },
        /**
         * transforms a camel or pascal case string
         * to all lower-case space-separated phrase
         * @param {string} value pascal or camel-cased string
         * @returns all-lower-case space-separated phrase
         */
        phraseCase: function (value) {
            return value.replace(/([A-Z])/g, ' $1').toLowerCase();
        }
    };


    // ====================
    // = Example Building =
    // ====================

    var specify, adapter,
        examples = [],
        currentExample,
        /**
         * Rolls up list of current and ancestors values for given prop name
         * @param {String} prop Name of property to roll up
         * @returns array of values corresponding to prop name
         */
        rollup = function (example, prop) {
            var items = [];
            while (example !== null) {
                items.push(example[prop]);
                example = example.parent;
            }
            return items;
        };

    /**
     * Example Class
     * Represents an instance of an example (a describe)
     * contains references to parent and nested examples
     * exposes methods for returning combined lists of before, after, and names
     * @constructor
     * @param {example} parent example to append self as child to (optional)
     */
    function Example(parent) {
        if (parent) {
            // if there's a parent, append self as nested example
            this.parent = parent;
            this.parent.children.push(this);
        } else {
            // otherwise, add this as a new root example
            examples.push(this);
        }

        this.children = [];
        this.specs = [];
    }
    util.extend(Example.prototype, {
        name: '',                           // name of this description
        parent: null,                       // parent example
        children: [],                       // nested examples
        specs: [],                          // array of it() tests/specs
        before: function () {},              // called before all contained specs
        after: function () {},               // called after all contained specs
        /**
         * rolls up this and ancestor's before functions
         * @returns array of functions
         */
        befores: function () {
            return rollup(this, 'before').reverse();
        },
        /**
         * Rolls up this and ancestor's after functions
         * @returns array of functions
         */
        afters: function () {
            return rollup(this, 'after');
        },
        /**
         * Rolls up this and ancestor's description names, joined
         * @returns string of joined description names
         */
        names: function () {
            return rollup(this, 'name').reverse().join(specify.descriptionSeparator);
        }
    });



    // ==============
    // = Assertions =
    // ==============

    /**
     * AssertionHandler
     * represents instance of an assertion regarding a particular
     * actual value, and provides an api around asserting that value
     * against any of the bundled assertion handlers and custom ones.
     * @constructor
     * @param {Object} value A test-produced value to assert against
     * @param {Object} [desc] Optional, e.g. the name of the variable
     *                        for automatic descriptions
     */
    function AssertionHandler(value, desc) {
        this.value = value;
        this.description = desc;
    }

    /**
     * Appends assertion methods to the AssertionHandler prototype
     * For each provided assertion implementation, adds an identically named
     * assertion function to assertionHandler prototype which can run implementation
     * @param {Object} asserts Object containing assertion implementations
     */
    function addAssertions(asserts) {
        util.each(asserts, function (name, fn) {
            AssertionHandler.prototype[name] = function () {
                // implement this handler against backend
                // by pre-pending AssertionHandler's current value to args
                var args = util.makeArray(arguments),
                    desc = ['asserting', util.phraseCase(name)],
                    expected;

                if (fn.shouldPrintValue !== false) {
                    desc.splice(1, 0, util.prettyPrint(this.value, fn.shouldPrintDetails));
                }

                args.unshift(this.value);

                if (this.description) {
                    desc[1] += ',';
                    desc.splice(1, 0, 'that (' + this.description + '), being');
                }

                // if no explicit message was given with the assertion,
                // then let's build our own friendly one
                if (fn.length === 2) {
                    args[1] = args[1] || desc.join(' ');
                } else if (fn.length === 3) {
                    if (fn.shouldPrintExpected && !fn.shouldPrintExpected(args[1])) {
                        expected = '';
                    } else {
                        expected = ' ' + util.prettyPrint(args[1]);
                    }
                    args[2] = args[2] || desc.join(' ') + expected;
                }

                fn.apply(this, args);
            };
        });
    }

    /**
     * Add default assertions
     */
    var defaultAssertions = {
        equals: function (actual, expected, message) {
            adapter.assert(actual === expected, message);
        },
        isSimilarTo: function (actual, expected, message) {
            /*jshint eqeqeq:false*/
            /*jslint eqeq: true */
            adapter.assert(actual == expected, message);
            /*jslint eqeq: false */
            /*jshint eqeqeq:true*/
        },
        isNotSimilarTo: function (actual, expected, message) {
            /*jshint eqeqeq:false*/
            /*jslint eqeq: true */
            adapter.assert(actual != expected, message);
            /*jslint eqeq: false */
            /*jshint eqeqeq:true*/
        },
        isEqualTo: function (actual, expected, message) {
            adapter.assert(actual === expected, message);
        },
        isNotEqualTo: function (actual, expected, message) {
            adapter.assert(actual !== expected, message);
        },
        // legacy:
        isStrictlyEqualTo: function (actual, expected, message) {
            adapter.assert(actual === expected, message);
        },
        // legacy:
        isNotStrictlyEqualTo: function (actual, expected, message) {
            adapter.assert(actual !== expected, message);
        },
        isOfType: function (actual, expected, message) {
            adapter.assert(util.is(expected, actual), message);
        },
        isTrue: function (actual, message) {
            adapter.assert(actual === true, message);
        },
        isFalse: function (actual, message) {
            adapter.assert(actual === false, message);
        },
        isDefined: function (actual, message) {
            adapter.assert(actual !== undefined, message);
        },
        isNotDefined: function (actual, message) {
            adapter.assert(actual === undefined, message);
        },
        pass: function (actual, message) {
            adapter.assert(true, message);
        },
        fail: function (actual, message) {
            adapter.assert(false, message);
        },
        throwsException: function (actual, expectedError, message) {
            // can optionally accept expected error message string or object
            try {
                actual();
                adapter.assert(false, message);
            } catch (e) {
                if (expectedError === undefined) {
                    // e always === e so assertion always passes
                    adapter.assert(e === e, message);
                } else if (typeof e === 'string') {
                    adapter.assert(e === expectedError, message);
                } else if (typeof e === 'object') {
                    if (typeof expectedError === 'object') {
                        adapter.assert(e.name === expectedError.name && e.message === expectedError.message, message);
                    } else if(typeof expectedError === 'string')  {
                        adapter.assert(e.message === expectedError, message);
                    }
                }
            }
        },
        throwsError: function (actual, message) {
            try {
                actual();
                adapter.assert(false, message);
            } catch (e) {
                adapter.assert(util.is('error', e), message);
            }
        },
        throwsErrorWithMessage: function (actual, expectedMessage, message) {
            try {
                actual();
                adapter.assert(false, message);
            } catch (e) {
                adapter.assert(util.is('error', e) && e.message === expectedMessage, message);
            }
        }
    };

    // Create a bunch of convenience assertions,
    // isString, isNotString, ..., isNull, isNotNull:
    util.each([
        'String',
        'Array',
        'Object',
        'Function',
        'RegExp',
        'Date',
        'Number',
        'Boolean',
        'Undefined',
        'Null'
    ], function (i, key) {
        defaultAssertions['is' + key] = function (actual, message) {
            adapter.assert(util.is(key.toLowerCase(), actual), message);
        };
        defaultAssertions['isNot' + key] = function (actual, message) {
            adapter.assert(!util.is(key.toLowerCase(), actual), message);
        };
    });

    defaultAssertions.pass.shouldPrintValue = false;
    defaultAssertions.fail.shouldPrintValue = false;

    defaultAssertions.throwsException.shouldPrintExpected = function (expected) {
        return expected !== undefined;
    };
    defaultAssertions.throwsException.shouldPrintDetails = true;

    addAssertions(defaultAssertions);

    // =====================
    // = pavlov Public API =
    // =====================


    /**
     * Object containing methods to be made available as public API
     */
    var api = {
        /**
         * Initiates a new Example context
         * @param {String} description Name of what's being "described"
         * @param {Function} fn Function containing description
         *                      (before, after, specs, nested examples)
         */
        describe: function (description, fn) {
            if (arguments.length < 2) {
                throw new Error("both 'description' and 'fn' arguments " +
                                "are required");
            }

            // capture reference to current example before construction
            var originalExample = currentExample;
            try {
                // create new current example for construction
                currentExample = new Example(currentExample);
                currentExample.name = description;
                fn();
            } finally {
                // restore original reference after construction
                currentExample = originalExample;
            }
        },

        /**
         * Sets a function to occur before all contained specs and nested examples' specs
         * @param {Function} fn Function to be executed
         */
        before: function (fn) {
            if (arguments.length === 0) {
                throw new Error("'fn' argument is required");
            }
            currentExample.before = fn;
        },

        /**
         * Sets a function to occur after all contained tests and nested examples' tests
         * @param {Function} fn Function to be executed
         */
        after: function (fn) {
            if (arguments.length === 0) {
                throw new Error("'fn' argument is required");
            }
            currentExample.after = fn;
        },

        /**
         * Creates a spec (test) to occur within an example
         * When not passed fn, creates a spec-stubbing fn which
         * asserts fail "Not Implemented"
         * @param {String} specification Description of what "it" "should do"
         * @param {Function} fn Function containing a test to assert that it
         *                      does indeed do it (optional)
         */
        it: function (specification, fn) {
            var spec = specification;
            if (arguments.length === 0) {
                throw new Error("'specification' argument is required");
            }
            if (fn) {
                if (fn.async) {
                    spec += " asynchronously";
                }
                currentExample.specs.push([spec, fn]);
            } else {
                // if not passed an implementation, create an implementation
                // that simply asserts fail
                api.it(spec, function () { api.assert.fail('Not Implemented'); });
            }
        },

        /**
         * wraps a spec (test) implementation with an initial call to pause()
         * the test runner
         * The spec must call resume() when ready
         * @param {Function} fn Function containing a test to assert that it
         *                      does indeed do it (optional)
         */
        async: function (fn) {
            var implementation = function () {
                adapter.pause();
                fn.apply(this, arguments);
            };
            implementation.async = true;
            return implementation;
        },

        /**
         * Generates a row spec for each argument passed, applying
         * each argument to a new call against the spec
         * @returns an object with an it() function for defining
         * function to be called for each of given's arguments
         * @param {Array} arguments either list of values or list of arrays of values
         */
        given: function given() {
            var args = arguments;
            if (args.length === 0) {
                throw new Error("at least one argument is required");
            }
            if (args.length === 1 && util.is('array', args[0])) {
                args = args[0];
            }

            return {
                /**
                 * Defines a row spec (test) which is applied against each
                 * of the given's arguments.
                 */
                it: function given_it(specification, fn) {
                    util.each(args, function (i, arg) {
                        api.it("given " + arg + ", " + specification, function () {
                            fn.apply(this, util.is('array', arg) ? arg : [arg]);
                        });
                    });
                }
            };
        },

        /**
         * Assert a value against any of the bundled or custom assertions
         * @param {Object} value A value to be asserted
         * @param {String} [name] The name of the variable, for clearer messages
         * @returns an AssertionHandler instance to fluently perform an assertion with
         */
        assert: function (value, name) {
            return new AssertionHandler(value, name);
        },

        /**
         * specifies test runner to synchronously wait
         * @param {Number} ms Milliseconds to wait
         * @param {Function} fn Function to execute after ms has
         * passed before resuming
         */
        wait: function (ms, fn) {
            if (arguments.length < 2) {
                throw new Error("both 'ms' and 'fn' arguments are required");
            }
            adapter.pause();
            global.setTimeout(function () {
                fn();
                adapter.resume();
            }, ms);
        },

        /**
         * specifies test framework to pause test runner
         */
        pause: function () {
            adapter.pause();
        },

        /**
         * specifies test framework to resume test runner
         */
        resume: function () {
            adapter.resume();
        }
    };

    // extend api's assert function for easier access to
    // parameter-less assert.pass() and assert.fail() calls
    util.each(['pass', 'fail'], function (i, method) {
        api.assert[method] = function (message) {
            api.assert()[method](message);
        };
    });

    /**
     * Extends a function's scope
     * applies the extra scope to the function returns un-run new version of fn
     * inspired by Yehuda Katz's metaprogramming Screw.Unit
     * different in that new function can still accept all parameters original function could
     * @param {Function} fn Target function for extending
     * @param {Object} thisArg Object for the function's "this" to refer
     * @param {Object} extraScope object whose members will be added to fn's scope
     * @returns Modified version of original function with extra scope.  Can still
     * accept parameters of original function
     */
    function extendScope(fn, thisArg, extraScope) {
        var fnAsString = fn.toString(),
            params = fnAsString.match(/\(([^\)]*)\)/)[1], // get a string of the fn's parameters
            source = fnAsString.match(/^[^\{]*\{((.*\s*)*)\}/m)[1]; // get a string of fn's body

        /*jshint evil:true*/
        /*jslint evil:true*/
        // create a new function with same parameters and
        // body wrapped in a with(extraScope) { }
        fn = new Function(
            "extraScope" + (params ?  ", " + params : ""),
            "with(extraScope) {" + source + "}"
        );
        /*jslint evil:false*/
        /*jshint evil:false*/

        // returns a fn wrapper which takes passed args,
        // pre-pends extraScope arg, and applies to modified fn
        return function () {
            var args = [extraScope];
            util.each(arguments, function () {
                args.push(this);
            });
            fn.apply(thisArg, args);
        };
    }

    /**
     * Top-level Specify method.  Declares a new pavlov context
     * @param {String} name Name of what's being specified
     * @param {Function} fn Function containing exmaples and specs
     */
    specify = function specify(name, fn) {
        if (arguments.length < 2) {
            throw new Error("both 'name' and 'fn' arguments are required");
        }
        examples = [];
        currentExample = null;

        // set the test suite title
        var specName = name + " Specifications";

        // run the adapter initiation
        adapter.initiate(specName);

        if (specify.globalApi) {
            // if set to extend global api,
            // extend global api and run example builder
            util.extend(global, api);
            fn();
        } else {
            // otherwise, extend example builder's scope with api
            // and run example builder
            extendScope(fn, this, api)();
        }

        // compile examples against the adapter and then run them
        adapter.compile(specName, examples)();
    };

    // ====================================
    // = Test Framework Adapter Interface =
    // ====================================

    // abstracts functionality of underlying testing framework
    adapter = {
        /**
         * adapter-specific initialization code
         * which is called once before any tests are run
         * @param {String} suiteName name of the pavlov suite name
         */
        initiate: function (suiteName) { },
        /**
         * adapter-specific assertion method
         * @param {bool} expr Boolean expression to assert against
         * @param {String} message message to pass along with assertion
         */
        assert: function (expr, message) {
            throw new Error("'assert' must be implemented by a test framework adapter");
        },
        /**
         * adapter-specific compilation method.  Translates a nested set of
         * pre-constructed Pavlov example objects into a callable function which, when run
         * will execute the tests within the backend test framework
         * @param {String} suiteName name of overall test suite
         * @param {Array} examples Array of example object instances, possibly nesteds
         */
        compile: function (suiteName, examples) {
            throw new Error("'compile' must be implemented by a test framework adapter");
        },
        /**
         * adapter-specific pause method.  When an adapter implements,
         * allows for its test runner to pause its execution
         */
        pause: function () {
            throw new Error("'pause' not implemented by current test framework adapter");
        },
        /**
         * adapter-specific resume method.  When an adapter implements,
         * allows for its test runner to resume after a pause
         */
        resume: function () {
            throw new Error("'resume' not implemented by current test framework adapter");
        }
    };


    // =====================
    // = Expose Public API =
    // =====================

    // add global settings onto pavlov
    global.pavlov = {
        version: '0.4.0pre',
        specify: specify,
        adapter: adapter,
        adapt: function (frameworkName, testFrameworkAdapter) {
            if (!frameworkName || !testFrameworkAdapter) {
                throw new Error("both 'frameworkName' and 'testFrameworkAdapter' arguments are required");
            }
            adapter.name = frameworkName;
            util.extend(adapter, testFrameworkAdapter);
        },
        util: {
            each: util.each,
            extend: util.extend
        },
        api: api,
        globalApi: false,                 // when true, adds api to global scope
        extendAssertions: addAssertions,  // function for adding custom assertions
        descriptionSeparator: ', '       // separator used when rolling up names
    };
}(window));


// =========================
// = Default QUnit Adapter =
// =========================

(function () {
    'use strict';
    /*global document: false, QUnit: false, pavlov: false, ok: false, stop: false, start: false, module: false, test: false, deepEqual: false, notDeepEqual: false */

    if (QUnit === undefined) { return; }

    pavlov.adapt("QUnit", {
        initiate: function (name) {
            // after suite loads, set title and header on the report page
            QUnit.addEvent(window, 'load', function () {
                if (document !== undefined) {
                    document.title = name + ' - Pavlov - QUnit';
                }

                var h1s = document.getElementsByTagName('h1');
                if (h1s.length > 0) {
                    h1s[0].innerHTML = name;
                }
            });
        },
        /**
         * Implements assert against QUnit's `ok`
         */
        assert: function (expr, msg) {
            ok(expr, msg);
        },
        /**
         * Implements pause against QUnit's stop()
         */
        pause: function () {
            stop();
        },
        /**
         * Implements resume against QUnit's start()
         */
        resume: function () {
            start();
        },
        /**
         * Compiles nested set of examples into flat array of QUnit statements
         * returned bound up in a single callable function
         * @param {Array} examples Array of possibly nested Example instances
         * @returns function of which, when called, will execute all translated QUnit statements
         */
        compile: function (name, examples) {
            var statements = [],
                each = pavlov.util.each;

            /**
             * Comples a single example and its children into QUnit statements
             * @param {Example} example Single example instance
             * possibly with nested instances
             */
            var compileDescription = function (example) {

                // get before and after rollups
                var befores = example.befores(),
                    afters = example.afters();

                // create a module with setup and teardown
                // that executes all current befores/afters
                statements.push(function () {
                    module(example.names(), {
                        setup: function () {
                            each(befores, function () { this(); });
                        },
                        teardown: function () {
                            each(afters, function () { this(); });
                        }
                    });
                });

                // create a test for each spec/"it" in the example
                each(example.specs, function () {
                    var spec = this;
                    statements.push(function () {
                        test(spec[0], spec[1]);
                    });
                });

                // recurse through example's nested examples
                each(example.children, function () {
                    compileDescription(this);
                });
            };

            // compile all root examples
            each(examples, function () {
                compileDescription(this, statements);
            });

            // return a single function which, when called,
            // executes all qunit statements
            return function () {
                each(statements, function () { this(); });
            };
        }
    });

    pavlov.extendAssertions({
        /**
         * Asserts two objects are deeply equivalent, proxying QUnit's deepEqual assertion
         */
        isSameAs: function (actual, expected, message) {
            deepEqual(actual, expected, message);
        },
        /*
         * Asserts two objects are deeply in-equivalent, proxying QUnit's notDeepEqual assertion
         */
        isNotSameAs: function (actual, expected, message) {
            notDeepEqual(actual, expected, message);
        }
    });

    // alias pavlov.specify as QUnit.specify for legacy support
    QUnit.specify = pavlov.specify;
    pavlov.util.extend(QUnit.specify, pavlov);
}());
