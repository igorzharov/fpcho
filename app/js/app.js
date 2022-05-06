import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui"
import Swiper, { Pagination, Autoplay } from 'swiper'
import SlimSelect from 'slim-select'

// import './calendar.js'
// import './calendar-event.js'
// import './posts.js'
// import './post.js'
// import './gallery.js'
// import './login.js'

document.addEventListener('DOMContentLoaded', () => {

	Fancybox.bind('[data-fancybox="gallery"]', {

		animated: true,
		showClass: 'fancybox-zoomInUp',
		hideClass: 'fancybox-zoomOutDown',
		infinite: true,

		Toolbar: false,

		closeButton: "top",
		click: 'close',
		dragToClose: false,

		Carousel: {
			// Disable content slide animation
			friction: 0,

			// Disable touch guestures
			Panzoom: {
				touch: false,
			},

			Navigation: true,
		},

		Image: {
			// Disable animation from/to thumbnail on start/close
			zoom: true,

			// Disable zoom on scroll event
			wheel: true,

			// Disable zoom on image click
			click: false,

			// Fit image horizontally only
			fit: "contain-w",
		},
	})

	Fancybox.bind('[data-fancybox="gallery-slider"]', {

		animated: true,
		showClass: 'fancybox-zoomInUp',
		hideClass: 'fancybox-zoomOutDown',
		infinite: true,

		Toolbar: false,

		closeButton: "top",
		click: 'close',
		dragToClose: false,

		Carousel: {
			// Disable content slide animation
			friction: 0,

			// Disable touch guestures
			Panzoom: {
				touch: false,
			},

			Navigation: true,
		},

		Image: {
			// Disable animation from/to thumbnail on start/close
			zoom: true,

			// Disable zoom on scroll event
			wheel: true,

			// Disable zoom on image click
			click: false,

			// Fit image horizontally only
			fit: "contain-w",
		},
	})

	const swiperNewsOptions = {

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

	const swiperSliderOptions = {

		slidesPerView: 1.2,

		loop: false,

		speed: 1000,

		spaceBetween: 20,

	}

	let swiperNews = undefined

	let swiperSliderCalendar = undefined
	let swiperSliderBirthdays = undefined
	let swiperSliderLastPost = undefined
	let swiperSliderGallery = undefined
	

	function initSwiper() {

		const screenWidth = window.window.window.innerWidth;

		if (screenWidth < 576 && swiperNews == undefined) {

			swiperNews = new Swiper('.main .swiper__last__news', swiperNewsOptions)

		} else if (screenWidth > 576 && swiperNews != undefined) {
			swiperNews.destroy()
			swiperNews = undefined
		}

		if (screenWidth < 576 && swiperSliderCalendar == undefined) {

			swiperSliderCalendar = new Swiper('.main .swiper__slider__calendar', swiperSliderOptions)

		} else if (screenWidth > 576 && swiperSliderCalendar != undefined) {
			swiperSliderCalendar.destroy()
			swiperSliderCalendar = undefined
		}

		if (screenWidth < 576 && swiperSliderBirthdays == undefined) {

			swiperSliderBirthdays = new Swiper('.main .swiper__slider__birthdays', swiperSliderOptions)

		} else if (screenWidth > 576 && swiperSliderBirthdays != undefined) {
			swiperSliderBirthdays.destroy()
			swiperSliderBirthdays = undefined
		}
		
		if (screenWidth < 576 && swiperSliderLastPost == undefined) {

			swiperSliderLastPost = new Swiper('.main .swiper__slider__last__posts', swiperSliderOptions)

		} else if (screenWidth > 576 && swiperSliderLastPost != undefined) {
			swiperSliderLastPost.destroy()
			swiperSliderLastPost = undefined
		}

		if (screenWidth < 576 && swiperSliderGallery == undefined) {

			swiperSliderGallery = new Swiper('.main .swiper__slider__gallery', swiperSliderOptions)

		} else if (screenWidth > 576 && swiperSliderGallery != undefined) {
			swiperSliderGallery.destroy()
			swiperSliderGallery = undefined
		}

	}

	//Swiper plugin initialization
	initSwiper()

	// console.log(window.innerWidth);

	//Swiper plugin initialization on window resize

	window.addEventListener('resize', () => {
		initSwiper()
		// console.log(window.innerWidth);
	})

	function initSelect() {

		if (document.querySelector('.p-rating')) {
			
			new SlimSelect({
				select: '.с-select-school',
				showSearch: false,
				disabled: false,
			})
			new SlimSelect({
				select: '.с-select-trener',
				showSearch: false,
				disabled: false,
			})
			new SlimSelect({
				select: '.с-select-type',
				showSearch: false,
				disabled: false,
			})
			new SlimSelect({
				select: '.с-select-bassen',
				showSearch: false,
				disabled: false,
			})
			new SlimSelect({
				select: '.с-select-distance',
				showSearch: false,
				disabled: false,
			})
		}

	}

	initSelect()

})
