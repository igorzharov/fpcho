import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui"
import Swiper, { Pagination, Autoplay } from 'swiper'
import SlimSelect from 'slim-select'
import IMask from 'imask'

// import './calendar.js'
// import './calendar-event.js'
// import './posts.js'
// import './post.js'
// import './gallery.js'
// import './login.js'

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

		document.querySelector('.p-login').addEventListener('click', (e) => {

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

	if (document.querySelector('.p-login')) togglePassword();

	const selects = Array.from(document.querySelectorAll('.c-form-control__select'));

	selects.forEach(select => {

		new SlimSelect({
			select: select,
			showSearch: false,
			disabled: false,
		});

	});

	Fancybox.bind('.c-filter-form__button', {
		hideScrollbar: false,
		autoFocus: false,
		mainClass: 'c-popup-filter__container',
		// type: 'clone'
	});

	function initMask() {

		const phoneMask = IMask(document.querySelector('.c-form-control__phone-mask'), {
			mask: '+{7} (000) 000-00-00'
		});

		// const dateMask = IMask(document.querySelector('.c-form-control__birthday-mask'), {

		// });

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

	initMask();

	// function initSelect() {

	// 	if (document.querySelector('.p-rating')) {

	// 		new SlimSelect({
	// 			select: '.с-select-school',
	// 			showSearch: false,
	// 			disabled: false,
	// 		})
	// 		new SlimSelect({
	// 			select: '.с-select-trener',
	// 			showSearch: false,
	// 			disabled: false,
	// 		})
	// 		new SlimSelect({
	// 			select: '.с-select-type',
	// 			showSearch: false,
	// 			disabled: false,
	// 		})
	// 		new SlimSelect({
	// 			select: '.с-select-bassen',
	// 			showSearch: false,
	// 			disabled: false,
	// 		})
	// 		new SlimSelect({
	// 			select: '.с-select-distance',
	// 			showSearch: false,
	// 			disabled: false,
	// 		})
	// 	}

	// }


})
