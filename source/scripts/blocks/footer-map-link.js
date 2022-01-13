const footerMapLink = () => {
	//if browser on javaScript

	const noJsMap = document.querySelector('.footer__no-js-map');
	const imageItems = document.querySelectorAll('.services__img-wrap');

	noJsMap.remove();

	imageItems.forEach((item) => {
		item.classList.remove('services__img-wrap--active')
	})

}

export{footerMapLink};
