(function timer() {
	'use strict';

	var $timer,
		$nums,
		wrap,
		onExpired,
		view,
		curTime,
		fullTime,
		first,
		timeout;

    function showNum(num, noHw) {
		curTime = num;
		var $firstNum,
			time = Math.min(num, 99),
			first = time >= 10 ? Math.floor(time / 10) : num,
			second = time >= 10 ? time % 10 : null;

		$nums.css({
			display: '',
			opacity: 0.001
		});
		$firstNum = $nums.filter('.first.num_' + first).css({
			display: '',
			transform: '',
			marginLeft: '',
			opacity: noHw ? '' : 1
		});
		if(second !== null) {
			$nums.filter('.second.num_' + second).css({
				display: '',
				opacity: noHw ? '' : 1
			});
		} else { //only 1 digit
			$firstNum.css({
				marginLeft: noHw ? '16px' : '',
				transform:  noHw ? 'none' : 'translate3d(16px, 0, 0) scale(1)'
			});
		}
		if(noHw) {
			$nums.each(function(i, num) {
				window.removeLayer(num);
			});
		}
		return curTime;
    }

    function generateNums(count, klass) {
		var html ='';
		count++;
		while(count--) {
			html += '<i class="num_' + (count) + ' ' + (klass || '') + '">' + (count) + '</i>';
		}
		return html;
    }


    function pause() {
    	if(timeout) {
			window.clearTimeout(timeout);
			timeout = null;
		}

		return this;
    }

    function cleanup() {
    	showNum(curTime, true);
    	window.removeLayer($timer[0]);
    	$timer[0].style.opacity = 1;

    	return this;
    }

    function getOptions(options) {
    	fullTime = curTime = options.time || 60;
		onExpired = options.onExpired || onExpired;
    }

    function run(options) {
		if(!$timer) {
			init();
		}
		if(options) {
			pause();
			getOptions(options);
			showNum(curTime);
		}
		if(first) {
			$nums.each(function(i, num) {
				window.showLayer(num);
			});
			first = false;
		}

		timeout = window.setTimeout(window.requestAnimationFrame.bind(null, function () {
			if(showNum(--curTime)) {
				return run();
			}
			if(onExpired) {
				timeout = null;
				onExpired();
			}
		}), 1000);

		return this;
    }

	function show(delay) {
		if(delay) {
			$timer[0].style.webkitTransitionDelay = delay;
		}
		$timer.addClass('show');

		return this;
	}

	function getTime() {
		return curTime;
	}

	function getElapsed() {
		return fullTime - curTime;
	}

	function getDuration() {
		return fullTime;
	}

	function isActive() {
		return view === window.screens.current();
	}

    function init(options) {
		if($timer) {
			cleanup();
			wrap.removeChild($timer[0]);
		}
		view = window.screens.current();
		wrap = options ? (options.wrap || document.body) : document.body;
		getOptions(options || {});

		wrap.appendChild(($timer = $('<span class="timer">' + generateNums(9, 'first') + generateNums(9, 'second') + '</span>'))[0]);
		$nums = $timer.find('i');
		first = true;
		showNum(curTime, true);

		return this;
    }

    window.timer = {
		setup: init,
		start: run,
		set: showNum,
		pause: pause,
		show: show,
		teardown: cleanup,
		time: getTime,
		elapsed: getElapsed,
		active: isActive,
		duration: getDuration
    };

}());