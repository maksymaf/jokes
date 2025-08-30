const getRandomJoke = document.getElementById('get-random-joke');
const wrap = document.querySelector('.wrap');
const jokeContent = document.querySelector('.joke-content');

getRandomJoke.addEventListener('click', () => {
    axios.get('/random-joke')
    .then(response => {
        jokeContent.textContent = response.data.joke.joke;
    });
});
