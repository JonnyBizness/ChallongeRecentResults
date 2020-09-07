/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//global for lazy people\nvar participants = [];\n\nvar getCompletedMatches = function getCompletedMatches(tournament) {\n  return new Promise(function (resolve, reject) {\n    $.ajax({\n      type: \"GET\",\n      dataType: 'json',\n      url: \"https://api.challonge.com/v1/tournaments/\".concat(tournament, \".json\"),\n      ///${tournament}.json`,\n      data: {\n        'api_key': 'zU8uSiEtYLjlqFXPQCRzto3RiEp1KegdJ8TCyvLj',\n        'include_matches': 1,\n        'include_participants': 1\n      },\n      cache: false,\n      crossDomain: true,\n      error: function error(jqXHR, textStatus, errorThrown) {\n        console.log(\"Something went wrong!\");\n        console.log(jqXHR);\n        console.log(textStatus);\n        console.log(errorThrown); //reject('error?');\n      },\n      success: function success(result) {\n        resolve(result.tournament);\n      }\n    });\n  });\n};\n\nvar go = function go() {\n  var bracket = $(\"#bracket\").val();\n  console.log('going with bracket: ', bracket);\n\n  if (bracket) {\n    Promise.all([getCompletedMatches(bracket)]).then(function (values) {\n      var matches = values[0].matches;\n      participants = values[0].participants;\n      var completed = matches.filter(function (match) {\n        return match.match.state == \"complete\";\n      });\n      var maxCompletedWinnersRound = Math.max.apply(Math, completed.map(function (o) {\n        return o.match.round;\n      }));\n      var maxCompletedLosersRound = Math.min.apply(Math, completed.map(function (o) {\n        return o.match.round;\n      }));\n      var roundsToShow = [];\n\n      if (maxCompletedWinnersRound > 1) {\n        var unfinishedWinners = matches.filter(function (match) {\n          return match.match.state != \"complete\" && match.match.round == maxCompletedWinnersRound;\n        });\n\n        if (unfinishedWinners.length >= 1) {\n          roundsToShow.push(maxCompletedWinnersRound);\n          roundsToShow.push(maxCompletedWinnersRound - 1);\n        } else {\n          roundsToShow.push(maxCompletedWinnersRound);\n        }\n      } else {\n        roundsToShow.push(1);\n      }\n\n      if (maxCompletedLosersRound < -1) {\n        var unfinishedLosers = matches.filter(function (match) {\n          return match.match.state != \"complete\" && match.match.round == maxCompletedLosersRound;\n        });\n\n        if (unfinishedLosers.length >= 1) {\n          roundsToShow.push(maxCompletedLosersRound);\n          roundsToShow.push(maxCompletedLosersRound + 1);\n        } else {\n          roundsToShow.push(maxCompletedLosersRound);\n        }\n      } else {\n        roundsToShow.push(-1);\n      }\n\n      console.log('Rounds To Display', roundsToShow); //matches to display\n\n      var display = matches.filter(function (match) {\n        return match.match.state == \"complete\" && roundsToShow.includes(match.match.round);\n      });\n      console.log(display);\n      var i = 0;\n\n      var loopDisplay = function loopDisplay() {\n        $(\"#round\").text(display[i].match.round > 0 ? \"Winners round \".concat(display[i].match.round) : \"Losers round \".concat(Math.abs(display[i].match.round)));\n        $(\"#match\").html(\"\".concat(convertIdToName(display[i].match.winner_id), \" <span class=\\\"subtext\\\">defeats</span> \").concat(convertIdToName(display[i].match.loser_id)));\n        i++;\n        setTimeout(function () {\n          if (i < display.length) {\n            loopDisplay();\n          } else {\n            go();\n          }\n        }, 5000);\n      };\n\n      loopDisplay();\n    });\n  }\n};\n\ngo();\n\nvar convertIdToName = function convertIdToName(id) {\n  var matchedParticipant = participants.find(function (participant) {\n    return participant.participant.id == id || participant.participant.group_player_ids.includes(id);\n  });\n  return matchedParticipant.participant.display_name;\n};\n\n$(\"#round\").on('click', function () {\n  $(\"#bracket\").toggle();\n});\n$(\"#bracket\").on('change', function () {\n  go();\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2dsb2JhbCBmb3IgbGF6eSBwZW9wbGVcbnZhciBwYXJ0aWNpcGFudHMgPSBbXTtcblxubGV0IGdldENvbXBsZXRlZE1hdGNoZXMgPSAodG91cm5hbWVudCkgPT4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHVybDogYGh0dHBzOi8vYXBpLmNoYWxsb25nZS5jb20vdjEvdG91cm5hbWVudHMvJHt0b3VybmFtZW50fS5qc29uYCwvLy8ke3RvdXJuYW1lbnR9Lmpzb25gLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAnYXBpX2tleSc6ICd6VTh1U2lFdFlMamxxRlhQUUNSenRvM1JpRXAxS2VnZEo4VEN5dkxqJyxcbiAgICAgICAgICAgICdpbmNsdWRlX21hdGNoZXMnOiAxLFxuICAgICAgICAgICAgJ2luY2x1ZGVfcGFydGljaXBhbnRzJzogMVxuICAgICAgICB9LFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTb21ldGhpbmcgd2VudCB3cm9uZyFcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhqcVhIUik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXh0U3RhdHVzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yVGhyb3duKTtcbiAgICAgICAgICAgIC8vcmVqZWN0KCdlcnJvcj8nKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQudG91cm5hbWVudCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5jb25zdCBnbyA9ICgpID0+IHtcbiAgICBsZXQgYnJhY2tldCA9ICQoXCIjYnJhY2tldFwiKS52YWwoKTtcbiAgICBjb25zb2xlLmxvZygnZ29pbmcgd2l0aCBicmFja2V0OiAnLCBicmFja2V0KTtcblxuICAgIGlmKGJyYWNrZXQpe1xuICAgICAgICBQcm9taXNlLmFsbChbZ2V0Q29tcGxldGVkTWF0Y2hlcyhicmFja2V0KV0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgICAgICAgbGV0IG1hdGNoZXMgPSB2YWx1ZXNbMF0ubWF0Y2hlcztcbiAgICAgICAgICAgIHBhcnRpY2lwYW50cyA9IHZhbHVlc1swXS5wYXJ0aWNpcGFudHM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZWQgPSBtYXRjaGVzLmZpbHRlcihtYXRjaCA9PiBtYXRjaC5tYXRjaC5zdGF0ZSA9PSBcImNvbXBsZXRlXCIpO1xuICAgICAgICAgICAgbGV0IG1heENvbXBsZXRlZFdpbm5lcnNSb3VuZCA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIGNvbXBsZXRlZC5tYXAoKG8pID0+IHsgcmV0dXJuIG8ubWF0Y2gucm91bmQ7IH0pKTtcbiAgICAgICAgICAgIGxldCBtYXhDb21wbGV0ZWRMb3NlcnNSb3VuZCA9IE1hdGgubWluLmFwcGx5KE1hdGgsIGNvbXBsZXRlZC5tYXAoZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8ubWF0Y2gucm91bmQ7IH0pKTtcblxuICAgICAgICAgICAgbGV0IHJvdW5kc1RvU2hvdyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAobWF4Q29tcGxldGVkV2lubmVyc1JvdW5kID4gMSkge1xuICAgICAgICAgICAgICAgIGxldCB1bmZpbmlzaGVkV2lubmVycyA9IG1hdGNoZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICBtYXRjaCA9PiBtYXRjaC5tYXRjaC5zdGF0ZSAhPSBcImNvbXBsZXRlXCIgJiYgbWF0Y2gubWF0Y2gucm91bmQgPT0gbWF4Q29tcGxldGVkV2lubmVyc1JvdW5kXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAodW5maW5pc2hlZFdpbm5lcnMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91bmRzVG9TaG93LnB1c2gobWF4Q29tcGxldGVkV2lubmVyc1JvdW5kKTtcbiAgICAgICAgICAgICAgICAgICAgcm91bmRzVG9TaG93LnB1c2gobWF4Q29tcGxldGVkV2lubmVyc1JvdW5kIC0gMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcm91bmRzVG9TaG93LnB1c2gobWF4Q29tcGxldGVkV2lubmVyc1JvdW5kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvdW5kc1RvU2hvdy5wdXNoKDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWF4Q29tcGxldGVkTG9zZXJzUm91bmQgPCAtMSkge1xuICAgICAgICAgICAgICAgIGxldCB1bmZpbmlzaGVkTG9zZXJzID0gbWF0Y2hlcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0+IG1hdGNoLm1hdGNoLnN0YXRlICE9IFwiY29tcGxldGVcIiAmJiBtYXRjaC5tYXRjaC5yb3VuZCA9PSBtYXhDb21wbGV0ZWRMb3NlcnNSb3VuZFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKHVuZmluaXNoZWRMb3NlcnMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91bmRzVG9TaG93LnB1c2gobWF4Q29tcGxldGVkTG9zZXJzUm91bmQpO1xuICAgICAgICAgICAgICAgICAgICByb3VuZHNUb1Nob3cucHVzaChtYXhDb21wbGV0ZWRMb3NlcnNSb3VuZCArIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kc1RvU2hvdy5wdXNoKG1heENvbXBsZXRlZExvc2Vyc1JvdW5kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvdW5kc1RvU2hvdy5wdXNoKC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1JvdW5kcyBUbyBEaXNwbGF5Jywgcm91bmRzVG9TaG93KTtcblxuICAgICAgICAgICAgLy9tYXRjaGVzIHRvIGRpc3BsYXlcbiAgICAgICAgICAgIGxldCBkaXNwbGF5ID0gbWF0Y2hlcy5maWx0ZXIobWF0Y2ggPT5cbiAgICAgICAgICAgICAgICBtYXRjaC5tYXRjaC5zdGF0ZSA9PSBcImNvbXBsZXRlXCIgJiZcbiAgICAgICAgICAgICAgICByb3VuZHNUb1Nob3cuaW5jbHVkZXMobWF0Y2gubWF0Y2gucm91bmQpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpc3BsYXkpO1xuXG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICBjb25zdCBsb29wRGlzcGxheSA9ICgpID0+ICB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjcm91bmRcIikudGV4dChkaXNwbGF5W2ldLm1hdGNoLnJvdW5kID4gMCA/IGBXaW5uZXJzIHJvdW5kICR7ZGlzcGxheVtpXS5tYXRjaC5yb3VuZH1gIDogYExvc2VycyByb3VuZCAke01hdGguYWJzKGRpc3BsYXlbaV0ubWF0Y2gucm91bmQpfWApO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI21hdGNoXCIpLmh0bWwoYCR7Y29udmVydElkVG9OYW1lKGRpc3BsYXlbaV0ubWF0Y2gud2lubmVyX2lkKX0gPHNwYW4gY2xhc3M9XCJzdWJ0ZXh0XCI+ZGVmZWF0czwvc3Bhbj4gJHtjb252ZXJ0SWRUb05hbWUoZGlzcGxheVtpXS5tYXRjaC5sb3Nlcl9pZCl9YCk7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IGRpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9vcERpc3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNleyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDUwMDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb29wRGlzcGxheSgpO1xuICAgICAgICB9KVxuICAgIH1cbn1cblxuXG5nbygpO1xuXG5cbmNvbnN0IGNvbnZlcnRJZFRvTmFtZSA9IChpZCkgPT4ge1xuICAgIGxldCBtYXRjaGVkUGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmluZChwYXJ0aWNpcGFudCA9PiBwYXJ0aWNpcGFudC5wYXJ0aWNpcGFudC5pZCA9PSBpZCB8fCBwYXJ0aWNpcGFudC5wYXJ0aWNpcGFudC5ncm91cF9wbGF5ZXJfaWRzLmluY2x1ZGVzKGlkKSk7XG4gICAgcmV0dXJuIG1hdGNoZWRQYXJ0aWNpcGFudC5wYXJ0aWNpcGFudC5kaXNwbGF5X25hbWU7XG59XG5cblxuJChcIiNyb3VuZFwiKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgJChcIiNicmFja2V0XCIpLnRvZ2dsZSgpO1xufSk7XG5cbiQoXCIjYnJhY2tldFwiKS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgIGdvKCk7XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFwQkE7QUFzQkE7QUF2QkE7QUFDQTtBQXdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFNQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });