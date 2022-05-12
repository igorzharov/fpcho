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
			});

		});
	}

	if (document.querySelectorAll('.c-form-control__select')) initSelect()

	const ss = new SlimSelect({
		select: '.c-form-control__multiple-select',
		showSearch: false,
		disabled: false,
		closeOnSelect: false,
		// onChange: function (e) {
		// 	console.log(e);
			// return false
			// console.log(this);
			// console.log(e[0]);
		// },
		beforeOnChange: (info) => {
			console.log(info)
			return false // this will stop propagation
		}
	});

	ss.set(['28561246', 'value2'])

	// console.log(ss.onChange);

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
