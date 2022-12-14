// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper'
// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import '../../blocks/swiper-pagination/swiper-pagination.css'

function marginSwiper(maxWidth) {
	const elementWidth = document.documentElement.clientWidth
	return (elementWidth - maxWidth) / 2
}

// init Swiper:
const swiper = new Swiper('.swiper', {
	modules: [Navigation, Pagination],
	slidesPerView: 'auto',
	spaceBetween: 8,
	centeredSlides: true,
	navigation: {
		enabled: false,
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
	},
	breakpoints: {
		768: {
			slidesPerView: 'auto',
			centeredSlides: false,
			slidesOffsetBefore: marginSwiper(688),
			slidesOffsetAfter: marginSwiper(688),
			navigation: {
				enabled: true,
			},
		},
		1024: {
			spaceBetween: 16,
			centeredSlides: false,
			slidesOffsetBefore: marginSwiper(920),
			slidesOffsetAfter: marginSwiper(920),
			navigation: {
				enabled: true,
			},
		},
		1280: {
			spaceBetween: 16,
			centeredSlides: false,
			slidesOffsetBefore: marginSwiper(1220),
			slidesOffsetAfter: marginSwiper(1220),
			navigation: {
				enabled: true,
			},
		},
	},
})
