/*!
 * jquery.imgcentering.js v0.91 - jQuery plugin for Centering images and maximum sizing in block.
 * Copyright (c) 2014 Lei Hau'oli Co.,Ltd. - https://github.com/leihauoli/jquery.imgcentering.js
 * License: MIT
 */
;(function (jQuery) {
	var ImgCentering = function ($element) {
		this.$win = $(window);
		this.$element = $element;
		this.$image = this.$element.find('img');
		this.deferredCompleteImage = new $.Deferred();

		if (!this.$image.length) {
			return;
		}

		this.init();
	};
	ImgCentering.prototype = {
		init: function () {
			this.confirmCompleteImage();
			this.bindEvents();
		},
		bindEvents: function () {
			var _self = this;

			this.$win.on('resize orientationchange', function () {
				_self.adjustImageSizeAndPosition();
			});
			this.deferredCompleteImage.done(function () {
				_self.adjustImageSizeAndPosition();
			});
		},
		confirmCompleteImage: function () {
			if (this.$image[0].complete) {
				this.deferredCompleteImage.resolve();
				return;
			}

			setTimeout($.proxy(function () {
				this.confirmCompleteImage();
			}, this), 100);
		},
		adjustImageSizeAndPosition: function () {
			var
				widthImage = 0,
				heightImage = 0,
				marginTopAdjusted = 0,
				marginLeftAdjusted = 0,
				widthElement = this.$element.width(),
				heightElement = this.$element.height();

			this.$image
				.width('100%')
				.height('auto');

			heightImage = this.$image.height();

			if (heightImage < heightElement) {
				this.$image
					.width('auto')
					.height('100%');
			}

			widthImage = this.$image.width();
			heightImage = this.$image.height();

			marginTopAdjusted = (heightImage - heightElement) / 2;
			marginLeftAdjusted = (widthImage - widthElement) / 2;

			this.$image.css({
				marginTop: -marginTopAdjusted,
				marginLeft: -marginLeftAdjusted
			});
		}
	};
	$.fn.imgcentering =  function () {
		return this.each(function () {
			new ImgCentering($(this));
		});
	};
})($);
