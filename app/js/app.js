import { Fancybox } from "@fancyapps/ui"
import Swiper, { Pagination } from 'swiper'
import SlimSelect from 'slim-select'
import IMask from 'imask'

document.addEventListener('DOMContentLoaded', () => {

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
	}

	const swiperOptions = {
		slidesPerView: 1.2,
		speed: 1000,
		spaceBetween: 20,
	}

	let swiperNews = undefined
	let swiper = undefined

	function initSwiper() {

		const screenWidth = window.window.window.innerWidth;

		if (screenWidth < 768 && swiperNews == undefined) {

			swiperNews = new Swiper('.swiper-last-news-slider', swiperLastNewsOptions)

		} else if (screenWidth > 768 && swiperNews != undefined) {
			swiperNews.destroy()
			swiperNews = undefined
		}

		if (screenWidth < 768 && swiper == undefined) {

			swiper = new Swiper('.swiper-slider', swiperOptions)

		} else if (screenWidth > 768 && swiper != undefined) {
			swiper.destroy()
			swiper = undefined
		}

	}

	initSwiper()

	window.addEventListener('resize', () => {
		initSwiper()
	})

	function toggleMainMenu() {

		const menu = document.querySelector('.main-menu')

		const hamburger = document.querySelector('.hamburger')

		const dropdown = document.querySelector('.main-menu__dropdown')

		const dropdownMenu = document.querySelector('.dropdown-menu')

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

	function initSelect() {

		const selects = Array.from(document.querySelectorAll('.c-form-control__select'));

		selects.forEach(select => {

			new SlimSelect({
				select: select,
				showSearch: false,
				disabled: false,
				allowDeselectOption: true
			});

		});
	}

	if (document.querySelectorAll('.c-form-control__select')) initSelect();

	class SAccordion {

		constructor(el) {

			this.$el = document.querySelector(el);
			this.recalculation();
			this.addEventListener();
		}
		addEventListener() {
			this.$el.addEventListener('click', (e) => {

				const $elHeader = e.target.closest('.c-select-accordion__header .c-select-accordion__text');
				const $elButton = e.target.closest('.c-select-accordion__button');
				const $elItem = e.target.closest('.c-select-accordion__item');

				if ($elButton) this.toggle();

				if ($elItem) {
					this.recalculation();
				}

				if ($elHeader) {
					this.selectAll();
					if (e.pointerId == 1) this.toggle()
				}

			})
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

			const countCheck = Array.from(checkboxes).filter(checkbox => checkbox.checked == true).length;

			const $elCount = this.$el.querySelector('.c-select-accordion__text span');

			if (countCheck) {
				$elCount.innerHTML = `Выбрано (${countCheck})`;

				$checkboxSelectAll.required = false;

				checkboxes.forEach(checkbox => {
					checkbox.required = false;
				});

			} else {
				$elCount.innerHTML = `Выбрать всех (${checkboxes.length})`;
				$checkboxSelectAll.checked = false;

				$checkboxSelectAll.required = true;

				checkboxes.forEach(checkbox => {
					checkbox.required = true;
				});
			}
		}
		show() {
			const $elBody = this.$el.querySelector('.c-select-accordion__body');
			$elBody.style['display'] = `block`;
			const height = $elBody.clientHeight;
			$elBody.style['height'] = `0`;
			$elBody.style['transition'] = `height 250ms ease`;
			setTimeout(() => {
				$elBody.style['height'] = `${height}px`;
			})
		}
		hide() {
			const $elBody = this.$el.querySelector('.c-select-accordion__body');
			$elBody.style['transition'] = `height 250ms ease`;
			$elBody.style['height'] = `0`;
			setTimeout(() => {
				$elBody.style['display'] = '';
				$elBody.style['height'] = '';
			}, 250)
		}
		toggle() {
			this.$el.classList.toggle('c-select-accordion--show');
			this.$el.classList.contains('c-select-accordion--show') ? this.show() : this.hide();
		}

	}

	if (document.querySelector('.c-select-accordion')) new SAccordion('.c-select-accordion');

	function initPopup() {

		Fancybox.bind('.c-filter-form__button', {
			hideScrollbar: false,
			autoFocus: false,
			mainClass: 'c-popup-filter__container',
		});

		Fancybox.bind('.c-profile-card-button', {
			hideScrollbar: false,
			autoFocus: false,
			mainClass: 'c-popup-filter__container',
		});

	}

	initPopup()

	function initMaskPhone() {
		const phoneMask = IMask(document.querySelector('.c-form-control__phone-mask'), {
			mask: '+{7} (000) 000-00-00'
		});
	}

	if (document.querySelector('.c-form-control__phone-mask')) initMaskPhone();

	function initMaskDate() {

		var lazyMask = IMask(document.querySelector('.c-form-control__birthday-mask'),
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

	}

	if (document.querySelector('.c-form-control__birthday-mask')) initMaskDate();


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
