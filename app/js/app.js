import { Fancybox } from "@fancyapps/ui"
import Swiper, { Pagination } from 'swiper'
import SlimSelect from 'slim-select'
import IMask from 'imask'
import AirDatepicker from 'air-datepicker';

document.addEventListener('DOMContentLoaded', () => {

	function initSlider($slider, sliderOptions) {

		let swiper = Swiper;
		let init = false;

		function swiperMode($slider, sliderOptions) {
			let mobile = window.matchMedia('(min-width: 0px) and (max-width: 768px)');
			let desktop = window.matchMedia('(min-width: 768px)');

			// Enable (for mobile)
			if (mobile.matches) {
				if (!init) {
					init = true;
					swiper = new Swiper($slider, sliderOptions);
				}
			}

			// Disable (for desktop)
			else if (desktop.matches) {
				if (init) {
					if (!Array.isArray(swiper)) {
						swiper.destroy();
					} else {
						swiper.forEach(item => {
							item.destroy();
						})
					}
				}
				init = false;

			}
		}

		// On Load

		window.addEventListener('load', function () {
			swiperMode($slider, sliderOptions);
		});

		// On Resize
		window.addEventListener('resize', function () {
			swiperMode($slider, sliderOptions);
		});

	}

	const swiperLastNewsOptions = {
		modules: [Pagination],
		slidesPerView: 1,
		loop: true,
		speed: 1000,
		spaceBetween: 20,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 2500,
		}
	};

	const swiperOptions = {
		slidesPerView: 1.2,
		speed: 1000,
		spaceBetween: 20,
	};

	if (document.querySelector('.swiper-last-news-slider')) initSlider('.swiper-last-news-slider', swiperLastNewsOptions);

	if (document.querySelector('.swiper-slider')) initSlider('.swiper-slider', swiperOptions);

	function toggleMainMenu() {

		const menu = document.querySelector('.main-menu');

		const hamburger = document.querySelector('.hamburger');

		const dropdown = document.querySelector('.main-menu__dropdown');

		const dropdownMenu = document.querySelector('.dropdown-menu');

		hamburger.addEventListener('click', function () {

			this.classList.toggle('is-active')

			if (menu.style.maxHeight) {
				menu.style.maxHeight = null;
				dropdownMenu.style.maxHeight = null;
			} else {
				menu.style.maxHeight = menu.scrollHeight + "px";
			}

		})

		dropdown.addEventListener('click', function () {

			this.classList.toggle('main-menu__dropdown-is-active');

			if (dropdownMenu.style.maxHeight) {
				dropdownMenu.style.maxHeight = null;
				menu.style.maxHeight = menu.scrollHeight + "px";
			} else {
				dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
				menu.style.maxHeight = dropdownMenu.scrollHeight + menu.scrollHeight + "px";
			}

		})

	}

	if (document.querySelector('.main-menu')) toggleMainMenu()

	function togglePassword() {

		document.querySelector('body').addEventListener('click', (e) => {

			if (e.target.classList.contains('c-form-control__toggle-visibility')) {
				const input = e.target.offsetParent.children[0];

				if (input.type === 'password') {
					input.type = "text";
					e.target.children[0].classList.add('c-form-control__toggle-on');
					e.target.children[1].classList.remove('c-form-control__toggle-on');
				} else {
					input.type = "password";
					e.target.children[0].classList.remove('c-form-control__toggle-on');
					e.target.children[1].classList.add('c-form-control__toggle-on');
				}
			}

		})

	}

	if (document.querySelector('[type="password"]')) togglePassword();

	const slims = []; // Array from init SlimSelects

	function initSelect() {

		const selects = Array.from(document.querySelectorAll('select.c-form-control__select'));

		selects.forEach(select => {

			slims.push(new SlimSelect({
				select: select,
				showSearch: false,
				disabled: false,
				allowDeselectOption: false
			}));

		});

	}

	function initDatepickerCompetition() {
		
		const datepickers = document.querySelectorAll('.js--datepicker-competition');

		datepickers.forEach(datepicker => {

			new AirDatepicker(datepicker, {
				range: true,
				multipleDatesSeparator: ' - '
			});

		})

	}

	if (document.querySelectorAll('.js--datepicker-competition')) 
	initDatepickerCompetition();

	if (document.querySelectorAll('.c-form-control__select')) initSelect();

	class SAccordion {

		constructor(el) {

			this.$el = el;
			this.recalculation();
			this.addEventListener();
		}
		addEventListener() {
			
			this.$el.addEventListener('click', (e) => {

				const $elHeaderCheckbox = e.target.closest('.c-select-accordion__header .c-form-control__radio');
				const $elHeaderText = e.target.closest('.c-select-accordion__header .c-select-accordion__count');
				const $elButton = e.target.closest('.c-select-accordion__button');
				const $elItem = e.target.closest('.c-select-accordion__item');

				if ($elButton) this.toggle();
				if ($elHeaderText) this.toggle();

				if ($elItem) {
					this.recalculation();
				}

				if ($elHeaderCheckbox) {
					this.selectAll();
				}

			});
		}

		selectAll() {
			const checkboxes = this.$el.querySelectorAll('.c-select-accordion__body .c-form-control__radio');

			const $checkboxSelectAll = this.$el.querySelector('.c-select-accordion__header .c-form-control__radio');

			checkboxes.forEach((checkbox) => {
				checkbox.checked = $checkboxSelectAll.checked;
			})

			this.recalculation();

		}
		recalculation() {
			const checkboxes = this.$el.querySelectorAll('.c-select-accordion__body .c-form-control__radio');

			const $checkboxSelectAll = this.$el.querySelector('.c-select-accordion__header .c-form-control__radio');

			const countActive = Array.from(checkboxes).filter(checkbox => checkbox.checked == true).length;

			const countCheckbox = Array.from(checkboxes).length;

			const $elCount = this.$el.querySelector('.c-select-accordion__text span');

			$elCount.innerHTML = `Выбрано (${countActive})`;

			if (countCheckbox == countActive) {
				$checkboxSelectAll.checked = true;
			} else {
				$checkboxSelectAll.checked = false;
			}
		}
		show() {
			const $elBody = this.$el.querySelector('.c-select-accordion__body');
			$elBody.style['display'] = `block`;
			const height = 264;
			const elHeight = $elBody.clientHeight;

			if (height < elHeight) {
				$elBody.style['overflow-y'] = `scroll`;
			}

			$elBody.style['max-height'] = `0`;
			$elBody.style['transition'] = `max-height 250ms ease`;
			setTimeout(() => {
				$elBody.style['max-height'] = `${height}px`;
			})
		}
		hide() {
			const $elBody = this.$el.querySelector('.c-select-accordion__body');
			$elBody.style['transition'] = `max-height 250ms ease`;
			$elBody.style['max-height'] = `0`;
			setTimeout(() => {
				$elBody.style['display'] = '';
				$elBody.style['max-height'] = '';
			}, 250);
		}
		toggle() {
			this.$el.classList.toggle('c-select-accordion--show');
			this.$el.classList.contains('c-select-accordion--show') ? this.show() : this.hide();
		}

	}

	function initSAccordion() {

		if (document.querySelector('.c-select-accordion')) {
		
			const SA = document.querySelectorAll('.c-select-accordion');
	
			SA.forEach(item => {
				new SAccordion(item);
			})
	
		}

	}

	initSAccordion();

	function initMaskDate() {

		const inputs = document.querySelectorAll('.c-form-control__birthday-mask');

		inputs.forEach(input => {
			
			IMask(input,
			{
				mask: Date,
				pattern: 'd{.}`m{.}`Y',
				autofix: true,
				blocks: {
					d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
					m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
					Y: { mask: IMask.MaskedRange, from: 1900, to: 2999, maxLength: 4 }
				}
			});

		})

	}

	function initMaskYear() {

		const inputs = document.querySelectorAll('.c-form-control__year-mask');

		inputs.forEach(input => {
			
			IMask(input, {
					mask: IMask.MaskedRange,
					from: 1990,
					to: new Date().getFullYear() + 1,
					maxLength: 4,
					autofix: true
			});

		})

	}

	initMaskYear();

	function initMaskYearNoLimit() {

		const inputs = document.querySelectorAll('.c-form-control__year-mask-no-limit');

		inputs.forEach(input => {
			
			IMask(input, {
					mask: IMask.MaskedRange,
					from: 1960,
					to: new Date().getFullYear() + 15,
					maxLength: 4,
					autofix: true
			});

		})

	}

	initMaskYearNoLimit();

	function initPopup() {

		Fancybox.bind('.button-call-popup', {
			hideScrollbar: false,
			autoFocus: false,
			mainClass: 'c-popup-filter__container',
			type: "clone",
			on: {
				done: () => {

					// Фэнсибокс копирует dom. Но не копирует проинициализированный slimSelect

					// Проблема. В попап окне не работает слайдер т.к он не проинициализирован.

					// Решение. Скрыть скопированный слимСелект
					// Проиницализировать селекты внутри попап окна

					const $oldSlims = document.querySelectorAll('.fancybox__content .ss-main.c-form-control__select');

					$oldSlims.forEach(item => {
						item.style.display = 'none';
					});

					const selects = document.querySelectorAll('.fancybox__content select.c-form-control__select');

					selects.forEach(item => {
						delete item.dataset.ssid;
						item.style.display = 'block';

						new SlimSelect({
							select: item,
							showSearch: false,
							disabled: false,
							allowDeselectOption: false
						});

					});

					initSAccordion();
					initMaskDate();
					initMaskYear();
					initMaskYearNoLimit();
					initMaskPhone();
					initDatepickerCompetition();

				},
			},
		});

		Fancybox.bind('.c-profile-card-button', {
			hideScrollbar: false,
			autoFocus: false,
			mainClass: 'c-popup-filter__container',
			type: "clone"
		});

		Fancybox.bind('.gallery-js .gallery-item-js', {
			mainClass: 'gallery-fancybox',
			groupAll : true
		});

		Fancybox.bind('.button-call-popup-calendar', {
			hideScrollbar: false,
			autoFocus: false,
			mainClass: 'c-popup-filter__container',
			parentEl: document.querySelector('.js--modal-parent-el'),
			type: 'inline',
		});

	}

	initPopup()

	function initMaskPhone() {

		const inputs = document.querySelectorAll('.c-form-control__phone-mask');

		inputs.forEach(input => {
			
			IMask(input, {
				mask: '+{7} (000) 000-00-00'
			});

		})

	}

	if (document.querySelector('.c-form-control__phone-mask')) initMaskPhone();

	if (window.location.href == 'http://localhost:3000/lk-federation-alert.html') {

		Fancybox.show([
			{
				src: '#dialog-content',
				type: 'inline',
				mainClass: 'c-alert-popup'
			}
		]);

	}

})
