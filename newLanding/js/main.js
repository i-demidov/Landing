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
	var $document = $(document),
		$navigation = $('.js-navigation'),
		$contact = $('.js-contact'),
		defaultOffsetTop = $navigation.offset().top - $contact.height();

	$document.on('scroll', function () {
		$navigation.toggleClass('b-navigation--sticky', $document.scrollTop() > defaultOffsetTop);
	});
})();