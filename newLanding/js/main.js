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

/*(function () {
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
})();*/

(function () {
	var actions = [{
			img: 'images/1.png',
			backgroundImg: 'images/50-Low-Poly-Backgrounds/p6.jpg',
			title: 'wat wat wat wat wat wat wat wat wat',
			beforeTitle: '1',
			description: 'wat wat wat wat wat wat wat wat wat'
		}, {
			img: 'images/2.png',
			backgroundImg: 'images/50-Low-Poly-Backgrounds/p10.jpg',
			title: 'wat wat wat wat wat wat wat wat wat',
			beforeTitle: '2',
			description: 'wat wat wat wat wat wat wat wat wat'
		}, {
			img: 'images/3.png',
			backgroundImg: 'images/50-Low-Poly-Backgrounds/p14.jpg',
			title: 'wat wat wat wat wat wat wat wat wat',
			beforeTitle: '3',
			description: 'wat wat wat wat wat wat wat wat wat'
		}, {
			img: 'images/4.png',
			backgroundImg: 'images/50-Low-Poly-Backgrounds/p18.jpg',
			title: 'wat wat wat wat wat wat wat wat wat',
			beforeTitle: '4',
			description: 'wat wat wat wat wat wat wat wat wat'
		}, {
			img: 'images/5.png',
			backgroundImg: 'images/50-Low-Poly-Backgrounds/p22.jpg',
			title: 'wat wat wat wat wat wat wat wat wat',
			beforeTitle: '5',
			description: 'wat wat wat wat wat wat wat wat wat'
		}, {
			img: 'images/6.png',
			backgroundImg: 'images/50-Low-Poly-Backgrounds/p26.jpg',
			title: 'wat wat wat wat wat wat wat wat wat',
			beforeTitle: '6',
			description: 'wat wat wat wat wat wat wat wat wat'
		}];

	actions.push(actions[0]);

	var $slider = $('#slider'),
		$sliderContainer = $('<div class="b-slider-container">'),
		$sliderToggler = $('<div class="b-slider-toggler">'),
		$leftArow = $('<a href="#" class="b-slider-toggler-arrow b-slider-toggler-arrow--left">'),
		$rightArow = $('<a href="#" class="b-slider-toggler-arrow b-slider-toggler-arrow--right">'),
		slidesLength = actions.length,
		sliderContainerWidth = slidesLength*100,
		autoSlideId;

		for (var i = 0, max = slidesLength; i < max; i++) {
			var sliderItemTemplate = '<div class="b-slider-item" style="background-image: url(' + actions[i].backgroundImg + ')">' +
									 	'<div class="b-slider-item-wrapper">' +
									 		'<div class="b-slider-item-image">' +
												'<img src="' + actions[i].img + '" />' +
											'</div>' +
											'<div class="b-slider-item-text">' +
												'<h3 class="b-slider-item-text-before_title">' + actions[i].beforeTitle + '</h3>' +
												'<h2 class="b-slider-item-text-title">' +  actions[i].title + '</h2>' +
												'<p class="b-slider-item-text-description">' + actions[i].description + '</p>' +
												'<a href="Прайс.docx" class="b-slider-item-text-price">Прайс-лист</a>'
											'</div>' +
									 	'</div>' +
									 '</div>';

			$sliderContainer.append($(sliderItemTemplate).css('width', 100/slidesLength + '%'));
		}


		$sliderToggler
			.append($leftArow.bind('click', slide))
			.append($rightArow.bind('click', slide));

		$sliderContainer
			.css({
				width: sliderContainerWidth + '%',
				marginLeft: '0%'
			})
			.data('offset', '0%');

		$slider
			.append($sliderToggler)
			.append($sliderContainer);

		function slide (e) {
			clearTimeout(autoSlideId);

			var isNextStep = !e || ($(e.currentTarget)[0] === $rightArow[0]),
				currentOffset =  parseInt($sliderContainer.data('offset'), 10),
				stepSize = 100,
				lastNextOffset = sliderContainerWidth - stepSize;

			if (isNextStep) {
				if (Math.abs(currentOffset) === lastNextOffset) {
					$sliderContainer
						.data('offset', '0%')
						.css('margin-left', '0%');
				}
			} else {
				if (!currentOffset) {
					$sliderContainer
						.data('offset', -lastNextOffset + '%')
						.css('margin-left', -lastNextOffset + '%');
				}
			}

			$sliderContainer.stop();

			var newOffset = parseInt($sliderContainer.data('offset'), 10) + (isNextStep ? -stepSize : stepSize);

			$sliderContainer
				.css('margin-left', $sliderContainer.data('offset'))
				.data('offset', newOffset + '%');

			$sliderContainer.animate({
				marginLeft: newOffset + '%'
			}, {
				duaration: 500,
				complete: autoSlide
			});

			return false;
		}

		function autoSlide () {
			autoSlideId = setTimeout(slide, 10000);
		}

		autoSlide();
})();

(function () {
	/*var $styleBlock = $('<style type="text/css"></style>').appendTo($('head'));;

	$styleBlock.text('.b-slider {height: '+ $(window).height() + 'px;}');*/

	/*var $slider = $('.js-slider'),
		$window = $(window);

	$slider.height($window.height());*/
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

(function () {
	var $servicesSubLists = $('.js-services-sub_list'),
		$servicesListItems = $('.js-services-list-item');

	$servicesSubLists.each(function (i, list) {
		var $list = $(list);

		$list
			.data('height', $list.height())
			.addClass('b-services-sub_list--openable')
			.closest('.js-services-list-item')
			.data('sublist', $list);
	});

	$servicesListItems
		.bind('mouseenter', function (e) {
			var $sublist = $(e.currentTarget).data('sublist');

			$sublist && $sublist.css('height', $sublist.data('height'));
		})
		.bind('mouseleave', function (e) {
			setTimeout(function () {
				var $sublist = $(e.currentTarget).data('sublist');

				$sublist && $sublist.removeAttr('style');
			}, 500);
		});
	/*var $servicesListItems = $('.js-services-list-item'),
		activeItemClass = 'b-services-list-item--active';

	$servicesListItems.on('click', function (e) {
		$servicesListItems.removeClass(activeItemClass);

		$(e.currentTarget).addClass(activeItemClass);
	});*/
})();

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