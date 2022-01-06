const showServices = () => {
  let imageItems = [...document.querySelectorAll('.services__img-wrap')];

  let options = {
    rootMargin: '0px',
    threshold: .2
  }

  let setItemActive = (entries) => {
		entries.forEach(entry => {
			if(entry.isIntersecting) {
				entry.target.classList.add('services__img-wrap--active');
			}
		})
  }

  let observer = new IntersectionObserver(setItemActive, options);

  imageItems.forEach((item) => {
    observer.observe(item);
  })

}

export {showServices};
