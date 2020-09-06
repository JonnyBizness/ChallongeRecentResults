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

eval("console.log('go');\nvar mainDiv = $(\"main\"); //https://challonge.com/ENZSFVW415\n//7FfjtWlBLGuWt0833EBSwEGC0mABrDG4B52rIcZ4\n\nvar getCompletedMatches = function getCompletedMatches(tournament) {\n  return new Promise(function (resolve, reject) {\n    console.log(tournament);\n    $.ajax({\n      type: \"GET\",\n      dataType: 'json',\n      url: \"https://api.challonge.com/v1/tournaments/\".concat(tournament, \".json\"),\n      ///${tournament}.json`,\n      data: {\n        'api_key': '7FfjtWlBLGuWt0833EBSwEGC0mABrDG4B52rIcZ4',\n        'include_matches': 1,\n        'include_participants': 1\n      },\n      cache: false,\n      crossDomain: true,\n      error: function error(jqXHR, textStatus, errorThrown) {\n        console.log(\"Something went wrong!\");\n        console.log(jqXHR);\n        console.log(textStatus);\n        console.log(errorThrown); //reject('error?');\n      },\n      success: function success(result) {\n        resolve(result.tournament);\n      }\n    });\n  });\n}; //ENZBossBattle\n\n\nvar go = function go() {\n  Promise.all([getCompletedMatches('ac1ieajq')]).then(function (values) {\n    var matches = values[0].matches;\n    var participants = values[0].participants;\n    console.log(matches); // matches.forEach(match => {\n    //     console.log(match.match.round);\n    // });\n\n    var completed = matches.filter(function (match) {\n      return match.match.state == \"complete\";\n    });\n    var maxCompletedWinnersRound = Math.max.apply(Math, completed.map(function (o) {\n      return o.match.round;\n    }));\n    console.log('max winners:', maxCompletedWinnersRound);\n    var losers = matches.filter(function (match) {\n      return match.match.state == \"complete\" && match.match.round <= 0;\n    }); //do something convert rounds to positive in losers?\n\n    losers.map(function (x) {\n      console.log(x);\n      x.match.round = Math.abs(x.match.round); //return Math.abs(x.match.round);\n\n      return x;\n    });\n    var maxCompletedLosersRound = Math.max.apply(Math, losers.map(function (o) {\n      return o.match.round;\n    }));\n    console.log(losers);\n    console.log('max losers', maxCompletedLosersRound);\n    var roundsToShow = [];\n\n    if (maxCompletedWinnersRound > 1) {\n      var unfinishedWinners = matches.filter(function (match) {\n        return match.match.state != \"complete\" && match.match.round == maxCompletedWinnersRound;\n      });\n      console.log(unfinishedWinners);\n\n      if (unfinishedWinners.length >= 1) {\n        //current max completed is incomplete, show this round + prev\n        roundsToShow.push(maxCompletedWinnersRound);\n        roundsToShow.push(maxCompletedWinnersRound - 1);\n      } else {\n        //current maxcompleted is complete, just show this round.\n        roundsToShow.push(maxCompletedWinnersRound);\n      }\n    } else {\n      roundsToShow.push(1);\n    }\n\n    if (maxCompletedLosersRound > 1) {\n      var unfinishedLosers = matches.filter(function (match) {\n        return match.match.state != \"complete\" && match.match.round == maxCompletedLosersRound;\n      });\n\n      if (unfinishedLosers.length >= 1) {\n        //current max completed is incomplete, show this round + prev\n        roundsToShow.push(-maxCompletedLosersRound);\n        roundsToShow.push(-maxCompletedLosersRound - 1);\n      } else {\n        //current maxcompleted is complete, just show this round.\n        roundsToShow.push(-maxCompletedLosersRound);\n      }\n    } else {\n      roundsToShow.push(-1);\n    } //instead of this logic maybe look for prevwinners to display and current winners to display?\n\n\n    console.log('roundsToShow', roundsToShow); // console.log('winnersRoundToDisplay', winnersRoundToDisplay);\n    // console.log('losersRoundToDisplay', losersRoundToDisplay);\n    //my initial array is being edited to now have 1 instead of -1 for losers.\n    // i need to make a copy to do that positive number filter\n    // or i need to use negatives to revers teh logic, use min instead of max?\n\n    var display = matches.filter(function (match) {\n      return match.match.state == \"complete\" && roundsToShow.includes(match.match.round);\n    });\n    console.log(matches.filter(function (match) {\n      return match.match.round == 1;\n    }));\n    console.log(matches);\n    console.log(display);\n  });\n};\n\ngo();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnNvbGUubG9nKCdnbycpO1xuXG5sZXQgbWFpbkRpdiA9ICQoXCJtYWluXCIpO1xuXG5cbi8vaHR0cHM6Ly9jaGFsbG9uZ2UuY29tL0VOWlNGVlc0MTVcblxuLy83RmZqdFdsQkxHdVd0MDgzM0VCU3dFR0MwbUFCckRHNEI1MnJJY1o0XG5cblxubGV0IGdldENvbXBsZXRlZE1hdGNoZXMgPSAodG91cm5hbWVudCkgPT4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc29sZS5sb2codG91cm5hbWVudCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuY2hhbGxvbmdlLmNvbS92MS90b3VybmFtZW50cy8ke3RvdXJuYW1lbnR9Lmpzb25gLC8vLyR7dG91cm5hbWVudH0uanNvbmAsXG4gICAgICAgIGRhdGE6IHsnYXBpX2tleSc6ICc3RmZqdFdsQkxHdVd0MDgzM0VCU3dFR0MwbUFCckRHNEI1MnJJY1o0JyxcbiAgICAgICAgICAgICdpbmNsdWRlX21hdGNoZXMnOiAxLFxuICAgICAgICAgICAgJ2luY2x1ZGVfcGFydGljaXBhbnRzJzogMX0sXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU29tZXRoaW5nIHdlbnQgd3JvbmchXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coanFYSFIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGV4dFN0YXR1cyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvclRocm93bik7XG4gICAgICAgICAgICAvL3JlamVjdCgnZXJyb3I/Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkgeyAgICAgICAgICBcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnRvdXJuYW1lbnQpO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG4vL0VOWkJvc3NCYXR0bGVcblxuY29uc3QgZ28gPSAoKSA9PiB7XG4gICAgUHJvbWlzZS5hbGwoW2dldENvbXBsZXRlZE1hdGNoZXMoJ2FjMWllYWpxJyldKS50aGVuKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICBsZXQgbWF0Y2hlcyA9IHZhbHVlc1swXS5tYXRjaGVzO1xuICAgICAgICBsZXQgcGFydGljaXBhbnRzID0gdmFsdWVzWzBdLnBhcnRpY2lwYW50cztcblxuXG5cbiAgICAgICAgY29uc29sZS5sb2cobWF0Y2hlcyk7XG4gICAgICAgIC8vIG1hdGNoZXMuZm9yRWFjaChtYXRjaCA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhtYXRjaC5tYXRjaC5yb3VuZCk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICBsZXQgY29tcGxldGVkID0gbWF0Y2hlcy5maWx0ZXIobWF0Y2ggPT4gbWF0Y2gubWF0Y2guc3RhdGUgPT0gXCJjb21wbGV0ZVwiKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBtYXhDb21wbGV0ZWRXaW5uZXJzUm91bmQgPSBNYXRoLm1heC5hcHBseShNYXRoLGNvbXBsZXRlZC5tYXAoKG8pID0+IHtyZXR1cm4gby5tYXRjaC5yb3VuZDt9KSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXggd2lubmVyczonLCBtYXhDb21wbGV0ZWRXaW5uZXJzUm91bmQpO1xuXG4gICAgICAgIGxldCBsb3NlcnMgPSBtYXRjaGVzLmZpbHRlcihtYXRjaCA9PiBtYXRjaC5tYXRjaC5zdGF0ZSA9PSBcImNvbXBsZXRlXCIgJiYgbWF0Y2gubWF0Y2gucm91bmQgPD0gMCk7XG4gICAgICAgIC8vZG8gc29tZXRoaW5nIGNvbnZlcnQgcm91bmRzIHRvIHBvc2l0aXZlIGluIGxvc2Vycz9cbiAgICAgICAgbG9zZXJzLm1hcCgoeCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coeCk7XG4gICAgICAgICAgICB4Lm1hdGNoLnJvdW5kID0gTWF0aC5hYnMoeC5tYXRjaC5yb3VuZClcbiAgICAgICAgICAgIC8vcmV0dXJuIE1hdGguYWJzKHgubWF0Y2gucm91bmQpO1xuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbWF4Q29tcGxldGVkTG9zZXJzUm91bmQgPSBNYXRoLm1heC5hcHBseShNYXRoLGxvc2Vycy5tYXAoZnVuY3Rpb24obyl7cmV0dXJuIG8ubWF0Y2gucm91bmQ7fSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhsb3NlcnMpO1xuICAgICAgICBjb25zb2xlLmxvZygnbWF4IGxvc2VycycsIG1heENvbXBsZXRlZExvc2Vyc1JvdW5kKTtcblxuICAgICAgICBsZXQgcm91bmRzVG9TaG93ID0gW107XG5cbiAgICAgICAgaWYobWF4Q29tcGxldGVkV2lubmVyc1JvdW5kID4gMSl7XG4gICAgICAgICAgICBsZXQgdW5maW5pc2hlZFdpbm5lcnMgPSBtYXRjaGVzLmZpbHRlcihcbiAgICAgICAgICAgICAgICBtYXRjaCA9PiBtYXRjaC5tYXRjaC5zdGF0ZSAhPSBcImNvbXBsZXRlXCIgJiYgbWF0Y2gubWF0Y2gucm91bmQgPT0gbWF4Q29tcGxldGVkV2lubmVyc1JvdW5kXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc29sZS5sb2codW5maW5pc2hlZFdpbm5lcnMpO1xuICAgICAgICAgICAgaWYodW5maW5pc2hlZFdpbm5lcnMubGVuZ3RoID49IDEpe1xuICAgICAgICAgICAgICAgIC8vY3VycmVudCBtYXggY29tcGxldGVkIGlzIGluY29tcGxldGUsIHNob3cgdGhpcyByb3VuZCArIHByZXZcbiAgICAgICAgICAgICAgICByb3VuZHNUb1Nob3cucHVzaChtYXhDb21wbGV0ZWRXaW5uZXJzUm91bmQpO1xuICAgICAgICAgICAgICAgIHJvdW5kc1RvU2hvdy5wdXNoKG1heENvbXBsZXRlZFdpbm5lcnNSb3VuZC0xKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vY3VycmVudCBtYXhjb21wbGV0ZWQgaXMgY29tcGxldGUsIGp1c3Qgc2hvdyB0aGlzIHJvdW5kLlxuICAgICAgICAgICAgICAgIHJvdW5kc1RvU2hvdy5wdXNoKG1heENvbXBsZXRlZFdpbm5lcnNSb3VuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcm91bmRzVG9TaG93LnB1c2goMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXhDb21wbGV0ZWRMb3NlcnNSb3VuZCA+IDEpe1xuICAgICAgICAgICAgbGV0IHVuZmluaXNoZWRMb3NlcnMgPSBtYXRjaGVzLmZpbHRlcihcbiAgICAgICAgICAgICAgICBtYXRjaCA9PiBtYXRjaC5tYXRjaC5zdGF0ZSAhPSBcImNvbXBsZXRlXCIgJiYgbWF0Y2gubWF0Y2gucm91bmQgPT0gbWF4Q29tcGxldGVkTG9zZXJzUm91bmRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZih1bmZpbmlzaGVkTG9zZXJzLmxlbmd0aCA+PSAxKXtcbiAgICAgICAgICAgICAgICAvL2N1cnJlbnQgbWF4IGNvbXBsZXRlZCBpcyBpbmNvbXBsZXRlLCBzaG93IHRoaXMgcm91bmQgKyBwcmV2XG4gICAgICAgICAgICAgICAgcm91bmRzVG9TaG93LnB1c2goLW1heENvbXBsZXRlZExvc2Vyc1JvdW5kKTtcbiAgICAgICAgICAgICAgICByb3VuZHNUb1Nob3cucHVzaCgtbWF4Q29tcGxldGVkTG9zZXJzUm91bmQtMSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL2N1cnJlbnQgbWF4Y29tcGxldGVkIGlzIGNvbXBsZXRlLCBqdXN0IHNob3cgdGhpcyByb3VuZC5cbiAgICAgICAgICAgICAgICByb3VuZHNUb1Nob3cucHVzaCgtbWF4Q29tcGxldGVkTG9zZXJzUm91bmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJvdW5kc1RvU2hvdy5wdXNoKC0xKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9pbnN0ZWFkIG9mIHRoaXMgbG9naWMgbWF5YmUgbG9vayBmb3IgcHJldndpbm5lcnMgdG8gZGlzcGxheSBhbmQgY3VycmVudCB3aW5uZXJzIHRvIGRpc3BsYXk/XG5cbiAgICAgICAgY29uc29sZS5sb2coJ3JvdW5kc1RvU2hvdycsIHJvdW5kc1RvU2hvdyk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3dpbm5lcnNSb3VuZFRvRGlzcGxheScsIHdpbm5lcnNSb3VuZFRvRGlzcGxheSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdsb3NlcnNSb3VuZFRvRGlzcGxheScsIGxvc2Vyc1JvdW5kVG9EaXNwbGF5KTtcblxuXG4gICAgICAgIC8vbXkgaW5pdGlhbCBhcnJheSBpcyBiZWluZyBlZGl0ZWQgdG8gbm93IGhhdmUgMSBpbnN0ZWFkIG9mIC0xIGZvciBsb3NlcnMuXG4gICAgICAgIC8vIGkgbmVlZCB0byBtYWtlIGEgY29weSB0byBkbyB0aGF0IHBvc2l0aXZlIG51bWJlciBmaWx0ZXJcbiAgICAgICAgLy8gb3IgaSBuZWVkIHRvIHVzZSBuZWdhdGl2ZXMgdG8gcmV2ZXJzIHRlaCBsb2dpYywgdXNlIG1pbiBpbnN0ZWFkIG9mIG1heD9cblxuICAgICAgICBsZXQgZGlzcGxheSA9IG1hdGNoZXMuZmlsdGVyKG1hdGNoID0+IFxuICAgICAgICAgICAgbWF0Y2gubWF0Y2guc3RhdGUgPT0gXCJjb21wbGV0ZVwiICYmXG4gICAgICAgICAgICByb3VuZHNUb1Nob3cuaW5jbHVkZXMobWF0Y2gubWF0Y2gucm91bmQpXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc29sZS5sb2cobWF0Y2hlcy5maWx0ZXIobWF0Y2ggPT4gbWF0Y2gubWF0Y2gucm91bmQgPT0gMSkpO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cobWF0Y2hlcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRpc3BsYXkpO1xuICAgIH0pXG59XG5nbygpOyJdLCJtYXBwaW5ncyI6IkFBQ0E7QUFFQTtBQUtBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFuQkE7QUFxQkE7QUF2QkE7QUFDQTtBQUNBO0FBeUJBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

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