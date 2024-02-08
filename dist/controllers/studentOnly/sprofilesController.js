"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var sequelize = require("sequelize");
var Sprofile = require("../../models/SprofileModel");
var Student = require("../../models/StudentModel");
var Yunit = require("../../models/YunitModel");
var Lesson = require("../../models/LessonModel");
var Exercise = require("../../models/ExerciseModel");
var CompletedExercise = require("../../models/CompletedExerciseModel");
var CompletedLesson = require("../../models/CompletedLessonModel");
var CompletedUnit = require("../../models/CompletedUnitModel");
function login(_x, _x2) {
  return _login.apply(this, arguments);
}
function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, firstname, lastname, username, student, studentProfile, currentDate, formattedDate, updatedLoginDates;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, username = _req$body.username;
          _context.prev = 1;
          _context.next = 4;
          return Student.findOne({
            where: {
              firstname: firstname,
              lastname: lastname,
              username: username
            }
          });
        case 4:
          student = _context.sent;
          if (student) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: "Student not found"
          }));
        case 7:
          _context.next = 9;
          return Sprofile.findOne({
            where: {
              studentId: student.studentId
            }
          });
        case 9:
          studentProfile = _context.sent;
          currentDate = new Date();
          formattedDate = currentDate.toISOString().split("T")[0];
          if (studentProfile) {
            _context.next = 19;
            break;
          }
          _context.next = 15;
          return Sprofile.create({
            studentId: student.studentId,
            profileId: student.profileId,
            firstLoginDate: currentDate,
            loginDates: formattedDate,
            userId: student.userId
          });
        case 15:
          studentProfile = _context.sent;
          return _context.abrupt("return", res.json({
            message: "First login, profile created",
            profile: studentProfile
          }));
        case 19:
          if (!(!studentProfile.loginDates || !studentProfile.loginDates.includes(formattedDate))) {
            _context.next = 26;
            break;
          }
          // Append the current login date to the existing loginDates string
          updatedLoginDates = studentProfile.loginDates ? studentProfile.loginDates + "," + formattedDate : formattedDate;
          _context.next = 23;
          return studentProfile.update({
            firstLoginDate: studentProfile.firstLoginDate || currentDate,
            loginDates: updatedLoginDates
          });
        case 23:
          return _context.abrupt("return", res.json({
            message: "Returning student, loginDates updated",
            profile: studentProfile
          }));
        case 26:
          return _context.abrupt("return", res.json({
            message: "Returning student, login date already exists",
            profile: studentProfile
          }));
        case 27:
          _context.next = 33;
          break;
        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 33:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 29]]);
  }));
  return _login.apply(this, arguments);
}
function getStudentProfileId(_x3, _x4) {
  return _getStudentProfileId.apply(this, arguments);
}
function _getStudentProfileId() {
  _getStudentProfileId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var studentId, student;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          studentId = req.params.studentId;
          _context2.prev = 1;
          _context2.next = 4;
          return Student.findByPk(studentId);
        case 4:
          student = _context2.sent;
          if (student) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Student not found"
          }));
        case 7:
          if (student.profileId) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Profile not found for the student"
          }));
        case 9:
          return _context2.abrupt("return", res.json({
            studentProfileId: student.profileId
          }));
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 12]]);
  }));
  return _getStudentProfileId.apply(this, arguments);
}
function getStudentInformation(_x5, _x6) {
  return _getStudentInformation.apply(this, arguments);
}
function _getStudentInformation() {
  _getStudentInformation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var studentProfileId, studentProfile, student, completedExercises, completedLessons, completedUnits, averageStarRatingPerYunit, averageStarRatingPerLesson, minExercise, maxExercise, minLesson, maxLesson, minYunit, maxYunit, studentProfileWithInfo;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          studentProfileId = req.params.studentProfileId;
          _context3.prev = 1;
          _context3.next = 4;
          return Sprofile.findOne({
            where: {
              profileId: studentProfileId
            }
          });
        case 4:
          studentProfile = _context3.sent;
          if (studentProfile) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "Student profile not found"
          }));
        case 7:
          _context3.next = 9;
          return Student.findOne({
            where: {
              studentId: studentProfile.studentId
            }
          });
        case 9:
          student = _context3.sent;
          _context3.next = 12;
          return CompletedExercise.findAll({
            where: {
              studentProfileId: studentProfileId
            },
            include: {
              model: Exercise,
              attributes: ["exerciseName"]
            }
          });
        case 12:
          completedExercises = _context3.sent;
          _context3.next = 15;
          return CompletedLesson.findAll({
            where: {
              studentProfileId: studentProfileId
            },
            include: {
              model: Lesson,
              attributes: ["lessonName"]
            }
          });
        case 15:
          completedLessons = _context3.sent;
          _context3.next = 18;
          return CompletedUnit.findAll({
            where: {
              studentProfileId: studentProfileId
            },
            include: {
              model: Yunit,
              attributes: ["yunitName"]
            }
          });
        case 18:
          completedUnits = _context3.sent;
          _context3.next = 21;
          return CompletedUnit.findAll({
            attributes: ["yunitId", [sequelize.fn("avg", sequelize.col("starRating")), "averageStarRating"]],
            where: {
              studentProfileId: studentProfileId
            },
            group: ["yunitId"],
            include: {
              model: Yunit,
              attributes: ["yunitName"]
            }
          });
        case 21:
          averageStarRatingPerYunit = _context3.sent;
          _context3.next = 24;
          return CompletedLesson.findAll({
            attributes: ["lessonId", [sequelize.fn("avg", sequelize.col("starRating")), "averageStarRating"]],
            where: {
              studentProfileId: studentProfileId
            },
            group: ["lessonId"],
            include: {
              model: Lesson,
              attributes: ["lessonName"]
            }
          });
        case 24:
          averageStarRatingPerLesson = _context3.sent;
          _context3.next = 27;
          return CompletedExercise.findOne({
            where: {
              studentProfileId: studentProfileId
            },
            order: [["starRating", "ASC"]],
            include: {
              model: Exercise,
              attributes: ["exerciseName"]
            }
          });
        case 27:
          minExercise = _context3.sent;
          _context3.next = 30;
          return CompletedExercise.findOne({
            where: {
              studentProfileId: studentProfileId
            },
            order: [["starRating", "DESC"]],
            include: {
              model: Exercise,
              attributes: ["exerciseName"]
            }
          });
        case 30:
          maxExercise = _context3.sent;
          _context3.next = 33;
          return CompletedLesson.findOne({
            where: {
              studentProfileId: studentProfileId
            },
            order: [["starRating", "ASC"]],
            include: {
              model: Lesson,
              attributes: ["lessonName"]
            }
          });
        case 33:
          minLesson = _context3.sent;
          _context3.next = 36;
          return CompletedLesson.findOne({
            where: {
              studentProfileId: studentProfileId
            },
            order: [["starRating", "DESC"]],
            include: {
              model: Lesson,
              attributes: ["lessonName"]
            }
          });
        case 36:
          maxLesson = _context3.sent;
          _context3.next = 39;
          return CompletedUnit.findOne({
            where: {
              studentProfileId: studentProfileId
            },
            order: [["starRating", "ASC"]],
            include: {
              model: Yunit,
              attributes: ["yunitName"]
            }
          });
        case 39:
          minYunit = _context3.sent;
          _context3.next = 42;
          return CompletedUnit.findOne({
            where: {
              studentProfileId: studentProfileId
            },
            order: [["starRating", "DESC"]],
            include: {
              model: Yunit,
              attributes: ["yunitName"]
            }
          });
        case 42:
          maxYunit = _context3.sent;
          studentProfileWithInfo = {
            studentProfile: studentProfile,
            student: student,
            completedExercises: completedExercises,
            completedLessons: completedLessons,
            completedUnits: completedUnits,
            averageStarRatingPerYunit: averageStarRatingPerYunit,
            averageStarRatingPerLesson: averageStarRatingPerLesson,
            minExercise: minExercise,
            maxExercise: maxExercise,
            minLesson: minLesson,
            maxLesson: maxLesson,
            minYunit: minYunit,
            maxYunit: maxYunit
          };
          return _context3.abrupt("return", res.json(studentProfileWithInfo));
        case 47:
          _context3.prev = 47;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 51:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 47]]);
  }));
  return _getStudentInformation.apply(this, arguments);
}
function addCompletedExercise(_x7, _x8) {
  return _addCompletedExercise.apply(this, arguments);
}
function _addCompletedExercise() {
  _addCompletedExercise = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body2, exerciseId, starRating, studentProfileId, completionTime, existingEntry, completedExercise;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, exerciseId = _req$body2.exerciseId, starRating = _req$body2.starRating, studentProfileId = _req$body2.studentProfileId;
          completionTime = new Date();
          _context4.next = 5;
          return CompletedExercise.findOne({
            where: {
              exerciseId: exerciseId,
              studentProfileId: studentProfileId
            }
          });
        case 5:
          existingEntry = _context4.sent;
          if (!existingEntry) {
            _context4.next = 10;
            break;
          }
          _context4.next = 9;
          return existingEntry.update({
            starRating: starRating,
            completionTime: completionTime
          });
        case 9:
          return _context4.abrupt("return", res.json(existingEntry));
        case 10:
          _context4.next = 12;
          return CompletedExercise.create({
            exerciseId: exerciseId,
            starRating: starRating,
            completionTime: completionTime,
            studentProfileId: studentProfileId
          });
        case 12:
          completedExercise = _context4.sent;
          return _context4.abrupt("return", res.json(completedExercise));
        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 16]]);
  }));
  return _addCompletedExercise.apply(this, arguments);
}
function addCompletedLesson(_x9, _x10) {
  return _addCompletedLesson.apply(this, arguments);
}
function _addCompletedLesson() {
  _addCompletedLesson = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body3, lessonId, studentProfileId, existingEntry, totalStarRating, completedLesson;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, lessonId = _req$body3.lessonId, studentProfileId = _req$body3.studentProfileId;
          _context5.prev = 1;
          _context5.next = 4;
          return CompletedLesson.findOne({
            where: {
              lessonId: lessonId,
              studentProfileId: studentProfileId
            }
          });
        case 4:
          existingEntry = _context5.sent;
          _context5.next = 7;
          return CompletedExercise.sum("starRating", {
            where: {
              studentProfileId: studentProfileId
            },
            include: {
              model: Exercise,
              where: {
                lessonId: lessonId
              }
            }
          });
        case 7:
          totalStarRating = _context5.sent;
          if (!existingEntry) {
            _context5.next = 14;
            break;
          }
          _context5.next = 11;
          return existingEntry.update({
            starRating: totalStarRating
          });
        case 11:
          return _context5.abrupt("return", res.json(existingEntry));
        case 14:
          _context5.next = 16;
          return CompletedLesson.create({
            lessonId: lessonId,
            starRating: totalStarRating,
            studentProfileId: studentProfileId
          });
        case 16:
          completedLesson = _context5.sent;
          return _context5.abrupt("return", res.json(completedLesson));
        case 18:
          _context5.next = 24;
          break;
        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](1);
          console.error(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 24:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 20]]);
  }));
  return _addCompletedLesson.apply(this, arguments);
}
function addCompletedYunit(_x11, _x12) {
  return _addCompletedYunit.apply(this, arguments);
}
function _addCompletedYunit() {
  _addCompletedYunit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body4, yunitId, studentProfileId, existingEntry, totalStarRating, completedUnit;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body4 = req.body, yunitId = _req$body4.yunitId, studentProfileId = _req$body4.studentProfileId;
          _context6.prev = 1;
          _context6.next = 4;
          return CompletedUnit.findOne({
            where: {
              yunitId: yunitId,
              studentProfileId: studentProfileId
            }
          });
        case 4:
          existingEntry = _context6.sent;
          _context6.next = 7;
          return CompletedLesson.sum("starRating", {
            where: {
              studentProfileId: studentProfileId
            },
            include: {
              model: Lesson,
              where: {
                yunitId: yunitId
              }
            }
          });
        case 7:
          totalStarRating = _context6.sent;
          if (!existingEntry) {
            _context6.next = 14;
            break;
          }
          _context6.next = 11;
          return existingEntry.update({
            starRating: totalStarRating
          });
        case 11:
          return _context6.abrupt("return", res.json(existingEntry));
        case 14:
          _context6.next = 16;
          return CompletedUnit.create({
            yunitId: yunitId,
            starRating: totalStarRating,
            studentProfileId: studentProfileId
          });
        case 16:
          completedUnit = _context6.sent;
          return _context6.abrupt("return", res.json(completedUnit));
        case 18:
          _context6.next = 24;
          break;
        case 20:
          _context6.prev = 20;
          _context6.t0 = _context6["catch"](1);
          console.error(_context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 24:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 20]]);
  }));
  return _addCompletedYunit.apply(this, arguments);
}
module.exports = {
  login: login,
  getStudentProfileId: getStudentProfileId,
  getStudentInformation: getStudentInformation,
  addCompletedExercise: addCompletedExercise,
  addCompletedLesson: addCompletedLesson,
  addCompletedYunit: addCompletedYunit
};