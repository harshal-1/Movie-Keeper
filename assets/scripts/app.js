const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const startAddMovieButton = document.querySelector('header button');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
// const cancelAddMovieButton = addMovieModal.lastElementChild.firstElementChild;
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const modifyMovieModal = document.getElementById('modify-modal');
const userInputs2 = modifyMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');

const deleteMovieModal = document.getElementById('delete-modal');


const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const updateUI = () => {
    if(movies.length === 0){
        entryTextSection.style.display = 'block';
    }
    else{
        entryTextSection.style.display = 'none';
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}

const closeMovieModifyModal = () => {
    modifyMovieModal.classList.remove('visible');
    toggleBackdrop();
    clearMovieInputs2();
}

const deleteMovieHandler = movieId => {
    let movieIndex = 0;
    for (const movie of movies){
        if( movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);
    closeMovieDeletionModal();
    updateUI();
}

//Change
const modifyMovieHandler = movieId => {
    let movieIndex = 0;
    for (const movie of movies){
        if( movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    // const temp = movieIndex;
    // console.log(userInputs2);
    // console.log(userInputs2[0]);
    // userInputs2[0].value= movies[movieIndex].title;
    // userInputs2[1].value= movies[movieIndex].image;
    // userInputs2[2].value= movies[movieIndex].rating;

  const titleValue = userInputs2[0].value;
  const imageUrlValue = userInputs2[1].value;
  const ratingValue = userInputs2[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5)');
    return;
  }
    
  movies[movieIndex].title = titleValue;
  movies[movieIndex].image = imageUrlValue;
  movies[movieIndex].rating = ratingValue;

  const renderNew = document.getElementById(`${movies[movieIndex].id}`);
  // console.log(renderNew);
  renderNew.innerHTML = `
      <div class="movie-element__image">
          <img src = "${imageUrlValue}" alt="${titleValue}">
      </div>
      <div class="movie-element__info">
          <h2>${titleValue}</h2>
          <p>${ratingValue}/5 stars</p>
      </div>
      <button class="btn--new1">Modify</button>
      <button class="btn--new2">Delete</button>
  `;
  const modifyBtn = renderNew.querySelector('.btn--new1');
    const deleteBtn = renderNew.querySelector('.btn--new2');
    modifyBtn.addEventListener('click', startModifyMovieHandler.bind(null, movies[movieIndex].id));
    deleteBtn.addEventListener('click', startDeleteMovieHandler.bind(null, movies[movieIndex].id));
  // const listRoot = document.getElementById('movie-list');
  //   // 
  // console.log(listRoot.children(movieIndex));
  // console.log(renderNew);
  // renderNew.innerText = `${titleValue}\n\n${ratingValue}/5 stars\n\nModify\nDelete`;
  // movies.splice(movieIndex, 1);
    // const listRoot = document.getElementById('movie-list');
    // listRoot.children(movieIndex).innerHTML = `
    //     <div class="movie-element__image">
    //         <img src = "${imageUrlValue}" alt="${titleValue}">
    //     </div>
    //     <div class="movie-element__info">
    //         <h2>${titleValue}</h2>
    //         <p>${ratingValue}/5 stars</p>
    //     </div>
    //     <button class="btn--new1">Modify</button>
    //     <button class="btn--new2">Delete</button>
    // `;
  // renderNewMovieElement(temp, titleValue, imageUrlValue, ratingValue);
  // renderNewMovieElement(movieId, movies[movieIndex].title, movies[movieIndex].image, movies[movieIndex].rating);
    closeMovieModifyModal();;
}

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    
    //This had to be done since previous event listeners remain in the DOM
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);

    cancelDeletionButton.addEventListener('click',closeMovieDeletionModal);

    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null,movieId));
};

//Modify here
const startModifyMovieHandler = (movieId) => {
    modifyMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelModifyButton = modifyMovieModal.querySelector('.btn--passive');
    let confirmModifyButton = modifyMovieModal.querySelector('.btn--success');
    
    //This had to be done since previous event listeners remain in the DOM
    confirmModifyButton.replaceWith(confirmModifyButton.cloneNode(true));
    confirmModifyButton = modifyMovieModal.querySelector('.btn--success');

    // cancelModifyButton.removeEventListener('click', closeMovieModifyModal);

    cancelModifyButton.addEventListener('click',closeMovieModifyModal);

    confirmModifyButton.addEventListener('click', modifyMovieHandler.bind(null,movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.id = `${id}`;
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src = "${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
        <button class="btn--new1">Modify</button>
        <button class="btn--new2">Delete</button>
    `;
    const modifyBtn = newMovieElement.querySelector('.btn--new1');
    const deleteBtn = newMovieElement.querySelector('.btn--new2');
    modifyBtn.addEventListener('click', startModifyMovieHandler.bind(null, id));
    deleteBtn.addEventListener('click', startDeleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.appendChild(newMovieElement);
}

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const clearMovieInputs = () => {
    for(const usrInput of userInputs){
        usrInput.value = '';
    }
}

const clearMovieInputs2 = () => {
    for(const usrInput of userInputs2){
        usrInput.value = '';
    }
}

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5)');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

const backdropEventHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInputs();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropEventHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
