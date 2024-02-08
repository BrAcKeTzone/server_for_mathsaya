"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Lesson = require("../../models/LessonModel");
var cloudinary = require("../../config/cloudinaryConfig");
function addLesson(_x, _x2) {
  return _addLesson.apply(this, arguments);
}
function _addLesson() {
  _addLesson = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, lessonNumber, lessonName, lessonDescription, yunitId, userId, existingLesson, newLessonData, newLesson;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("req.file:", req.file);
          _req$body = req.body, lessonNumber = _req$body.lessonNumber, lessonName = _req$body.lessonName, lessonDescription = _req$body.lessonDescription, yunitId = _req$body.yunitId, userId = _req$body.userId;
          _context.next = 5;
          return Lesson.findOne({
            where: {
              lessonNumber: lessonNumber,
              yunitId: yunitId,
              userId: userId
            }
          });
        case 5:
          existingLesson = _context.sent;
          if (!existingLesson) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "Lesson with the same number and teacher already exists"
          }));
        case 8:
          newLessonData = {
            lessonNumber: lessonNumber,
            lessonName: lessonName,
            lessonDescription: lessonDescription,
            yunitId: yunitId,
            userId: userId
          };
          if (req.file) {
            newLessonData.lessonThumbnail = req.file.path;
            newLessonData.public_id_thumbnail = req.file.filename;
          }
          _context.next = 12;
          return Lesson.create(newLessonData);
        case 12:
          newLesson = _context.sent;
          res.status(201).json(newLesson);
          _context.next = 20;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error("Error during Lesson addition:", _context.t0);
          res.status(500).json({
            error: "Lesson addition failed"
          });
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 16]]);
  }));
  return _addLesson.apply(this, arguments);
}
function uploadVid(_x3, _x4) {
  return _uploadVid.apply(this, arguments);
}
function _uploadVid() {
  _uploadVid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var lessonId, lesson;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          lessonId = req.params.lessonId;
          _context2.next = 4;
          return Lesson.findByPk(lessonId);
        case 4:
          lesson = _context2.sent;
          if (lesson) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            error: "Lesson not found"
          }));
        case 7:
          if (!req.file) {
            _context2.next = 16;
            break;
          }
          if (!lesson.lessonVideo) {
            _context2.next = 11;
            break;
          }
          _context2.next = 11;
          return cloudinary.uploader.destroy(lesson.public_id_video);
        case 11:
          _context2.next = 13;
          return lesson.update({
            lessonVideo: req.file.path,
            public_id_video: req.file.filename
          });
        case 13:
          res.json({
            message: "Video uploaded successfully"
          });
          _context2.next = 17;
          break;
        case 16:
          res.status(400).json({
            error: "No video file provided"
          });
        case 17:
          _context2.next = 23;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          console.error("Error uploading video:", _context2.t0);
          res.status(500).json({
            error: "Video upload failed"
          });
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 19]]);
  }));
  return _uploadVid.apply(this, arguments);
}
function editLesson(_x5, _x6) {
  return _editLesson.apply(this, arguments);
}
function _editLesson() {
  _editLesson = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var lessonId, updatedData, lesson;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          lessonId = req.params.lessonId;
          updatedData = req.body;
          _context3.next = 5;
          return Lesson.findByPk(lessonId);
        case 5:
          lesson = _context3.sent;
          if (lesson) {
            _context3.next = 9;
            break;
          }
          res.status(404).json({
            error: "Lesson not found"
          });
          return _context3.abrupt("return");
        case 9:
          if (!req.file) {
            _context3.next = 15;
            break;
          }
          if (!(lesson.lessonThumbnail && lesson.public_id_thumbnail)) {
            _context3.next = 13;
            break;
          }
          _context3.next = 13;
          return cloudinary.uploader.destroy(lesson.public_id_thumbnail);
        case 13:
          updatedData.lessonThumbnail = req.file.path;
          updatedData.public_id_thumbnail = req.file.filename;
        case 15:
          _context3.next = 17;
          return lesson.update(updatedData);
        case 17:
          res.json(lesson);
          _context3.next = 24;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          console.error("Error during Lesson edit:", _context3.t0);
          res.status(500).json({
            error: "Lesson edit failed"
          });
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 20]]);
  }));
  return _editLesson.apply(this, arguments);
}
function viewLesson(_x7, _x8) {
  return _viewLesson.apply(this, arguments);
}
function _viewLesson() {
  _viewLesson = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var lessonId, lesson;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          lessonId = req.params.lessonId;
          _context4.next = 4;
          return Lesson.findByPk(lessonId);
        case 4:
          lesson = _context4.sent;
          if (!lesson) {
            res.status(404).json({
              error: "Lesson not found"
            });
          } else {
            res.json(lesson);
          }
          _context4.next = 12;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error("Error during Lesson view:", _context4.t0);
          res.status(500).json({
            error: "Lesson retrieval failed"
          });
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return _viewLesson.apply(this, arguments);
}
function deleteLesson(_x9, _x10) {
  return _deleteLesson.apply(this, arguments);
}
function _deleteLesson() {
  _deleteLesson = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var lessonId, lesson, deletedCount;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          lessonId = req.params.lessonId;
          _context5.next = 4;
          return Lesson.findByPk(lessonId);
        case 4:
          lesson = _context5.sent;
          if (lesson) {
            _context5.next = 8;
            break;
          }
          res.status(404).json({
            error: "Lesson not found"
          });
          return _context5.abrupt("return");
        case 8:
          _context5.next = 10;
          return Lesson.destroy({
            where: {
              lessonId: lessonId
            }
          });
        case 10:
          deletedCount = _context5.sent;
          if (!(deletedCount === 0)) {
            _context5.next = 15;
            break;
          }
          res.status(404).json({
            error: "Lesson not found"
          });
          _context5.next = 22;
          break;
        case 15:
          if (!lesson.lessonThumbnail) {
            _context5.next = 18;
            break;
          }
          _context5.next = 18;
          return cloudinary.uploader.destroy(lesson.public_id_thumbnail);
        case 18:
          if (!lesson.lessonVideo) {
            _context5.next = 21;
            break;
          }
          _context5.next = 21;
          return cloudinary.uploader.destroy(lesson.public_id_video);
        case 21:
          res.status(204).send();
        case 22:
          _context5.next = 28;
          break;
        case 24:
          _context5.prev = 24;
          _context5.t0 = _context5["catch"](0);
          console.error("Error during Lesson deletion:", _context5.t0);
          res.status(500).json({
            error: "Lesson deletion failed"
          });
        case 28:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 24]]);
  }));
  return _deleteLesson.apply(this, arguments);
}
function getLessonsByYunit(_x11, _x12) {
  return _getLessonsByYunit.apply(this, arguments);
}
function _getLessonsByYunit() {
  _getLessonsByYunit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var yunitId, lessons;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          yunitId = req.params.yunitId;
          _context6.next = 4;
          return Lesson.findAll({
            where: {
              yunitId: yunitId
            },
            order: [["lessonNumber", "ASC"]]
          });
        case 4:
          lessons = _context6.sent;
          res.json(lessons);
          _context6.next = 12;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error("Error getting Lessons for Yunit:", _context6.t0);
          res.status(500).json({
            error: "Failed to get Lessons"
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return _getLessonsByYunit.apply(this, arguments);
}
module.exports = {
  addLesson: addLesson,
  uploadVid: uploadVid,
  editLesson: editLesson,
  viewLesson: viewLesson,
  deleteLesson: deleteLesson,
  getLessonsByYunit: getLessonsByYunit
};