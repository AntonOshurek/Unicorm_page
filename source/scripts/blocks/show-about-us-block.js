const showAboutUsBlock = () => {

  const showButton = document.querySelector('.about-us__show-more-btn');
  const article = document.querySelector('.about-us__info');
  const buttonIcon = document.querySelector('.about-us__show-more-icon');


  showButton.addEventListener('click', () => {
    article.classList.toggle('about-us__info--open');
    buttonIcon.classList.toggle('about-us__show-more-icon--close');
  })

}

export {showAboutUsBlock};
