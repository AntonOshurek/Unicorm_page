const showServices = () => {
  let imageItems = [...document.querySelectorAll('.services__img-wrap')];
  let titles = [...document.querySelectorAll('.services__text')];

  let options = {
    rootMargin: '0px',
    threshold: .2
  }

  let setItemActive = (entries) => {
    console.log(entries);
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('services__img-wrap--active');
      }
    })
  }

  let observer = new IntersectionObserver(setItemActive, options);

  imageItems.forEach((item, idx) => {
    //  idx % 2 == 1? item.style.left = '5%' : item.style.left = '5%';
    observer.observe(item);
  })

  // titles.forEach((title, idx) => {
  //   // idx % 2 == 0? title.style.left = '45%' : title.style.left = '35%';
  //   observer.observe(title);
  // })
}

export {showServices};
