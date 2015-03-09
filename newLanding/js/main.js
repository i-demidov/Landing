/*$('.js-slider').on('click', '.js-slider-background', (function () {
	var backgroundIndex = 1;

	return function (e) {
		var $currentBackground = $(e.currentTarget),
			$newBackground = $currentBackground.clone();

		backgroundIndex = backgroundIndex === 50 ? 1 : backgroundIndex + 1;
			

		$newBackground
			.css('display', 'none')
			.insertAfter($currentBackground)
			.attr('src', 'images/50-Low-Poly-Backgrounds/p' + backgroundIndex + '.jpg')
			.fadeIn('fast', function () {
				$currentBackground.remove();
			});
	};
})());*/

(function () {
	var backgroundIndex = 2;

	function changeBackground () {
		var $currentBackground = $('.js-slider-background:first'),
			$cachedBackground = $('.js-slider-background:last'),
			$newBackground = $currentBackground.clone();

		backgroundIndex = backgroundIndex === 50 ? 1 : backgroundIndex + 1;
				

		$newBackground
			.css('display', 'none')
			.insertAfter($cachedBackground)
			.attr('src', 'images/50-Low-Poly-Backgrounds/p' + backgroundIndex + '.jpg');

		$cachedBackground.fadeIn('fast', function () {
			$currentBackground.remove();

			setTimeout(changeBackground, 5000);
		});
	}

	setTimeout(changeBackground, 5000);
})();

(function () {
	var $window = $(window),
		$navigation = $('.js-navigation'),
		$contact = $('.js-contact'),
		offsetTop = $navigation.offset().top,
		defaultOffsetTop = offsetTop - $contact.height();

	function fixNavigationBlock () {
		var navigationOnBottom = ($window.height() + $window.scrollTop()) < ($navigation.height() + offsetTop);
		
		if (navigationOnBottom) {
			$navigation
				.removeClass('b-navigation--sticky')
				.addClass('b-navigation--sticky_bottom');
		} else {
			$navigation
				.removeClass('b-navigation--sticky_bottom')
				.toggleClass('b-navigation--sticky', $window.scrollTop() > defaultOffsetTop);
		}
	}

	$window.on('scroll resize', fixNavigationBlock);

	fixNavigationBlock();
})();