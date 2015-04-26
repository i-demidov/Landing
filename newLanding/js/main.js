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
	/*var $styleBlock = $('<style type="text/css"></style>').appendTo($('head'));;

	$styleBlock.text('.b-slider {height: '+ $(window).height() + 'px;}');*/

	var $slider = $('.js-slider'),
		$window = $(window);

	$slider.height($window.height());
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

/*(function () {
	var $servicesListItems = $('.js-services-list-item'),
		activeItemClass = 'b-services-list-item--active';

	$servicesListItems.on('click', function (e) {
		$servicesListItems.removeClass(activeItemClass);

		$(e.currentTarget).addClass(activeItemClass);
	});
})();*/

/*(function () {
	var $body = $('body'),
		$fontSelect = $('#font_select');

	$fontSelect.on('change', function () {
		var fontClass = $fontSelect.val();

		$body.removeAttr('class');

		if (fontClass) {
			$body.addClass(fontClass);
		}
	})
})();*/

(function () {
	var reviews = [{
			name: 'JOHN DOE',
			secondName: 'Founder at MKTKO & Co.',
			img: 'images/lukoil logo.jpg',
			comment: 'comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment'
		}];

	var $reviewsSlider = $('#reviews-slider'),
		$sliderTable = $('<table class="b-reviews-table" cellspacing="0" cellpadding="0" style="left: 0;" data-offset="0"><tr></tr></table>'),
		$sliderTableRow = $sliderTable.find('tr'),
		$sliderPrevArrow = $('<a class="b-reviews-slider_arrow" href="#">'),
		$sliderNextArrow = $('<a class="b-reviews-slider_arrow b-reviews-slider_arrow--right" href="#">'),
		stepOffset = 3*320,
		tableWidth = 11*320;

	$reviewsSlider
		.after($sliderPrevArrow)
		.after($sliderNextArrow);

	for (var i = 0, max = 11; i < max; i++) {
		var reviewTemplate = '<td>'+
						   	 	'<div class="b-reviews-company_header">' +
						     		'<div class="b-reviews-company_header-logo">' +
						     			'<img src="' + reviews[0].img + '" />' +
						     		'</div>' +
                             		'<h5>' + reviews[0].name + '</h5>' +
                             		'<h6>' + reviews[0].secondName + '</h6>' +
                             	'</div>' +
                             	'<div class="b-reviews-company_comment"><p>' + reviews[0].comment + '</p></div>' +
                             '</td>';

		$sliderTableRow.append($(reviewTemplate));
	}

	$reviewsSlider.append($sliderTable.css('width', tableWidth));

	$sliderPrevArrow.bind('click', slide);
	$sliderNextArrow.bind('click', slide);

	function slide (e) {
		var isNextStep = this === $sliderNextArrow[0],
			currentOffset = parseInt($sliderTable.data('offset'), 10) || 0,
			newOffset = currentOffset + (isNextStep ? -stepOffset : stepOffset);



		if (Math.abs(newOffset) > (tableWidth - stepOffset)) {
			newOffset = Math.abs(newOffset) === tableWidth ? 0 : -(tableWidth - stepOffset);
		} else if (newOffset > 0) {
			newOffset = newOffset === stepOffset ? -(tableWidth - stepOffset) : 0;
		}

		$sliderTable
			.data('offset', newOffset)
			.css('left', newOffset);

		return false;
	}
})()