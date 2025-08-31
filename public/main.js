const getRandomJoke = document.getElementById('get-random-joke');
const wrap = document.querySelector('.wrap');
const jokeContent = document.querySelector('.joke-content');
const navBarItems = document.querySelector('.nav-bar-items');
const jokeWrap = document.getElementById('joke-wrap');
const author = document.getElementById('author');

axios.get('/api/check-auth')
.then(response => {
    if(response.data.isAuth){
        navBarItems.innerHTML = `
            <li class="nav-bar-item"><a href="/add-joke">Create joke</a></li>
            <li class="nav-bar-item">
                <form action="/logout" method="POST">
                    <button type="submit" class="logout-btn">Logout</button>
                </form>
            </li>
        `;
    }else{
        navBarItems.innerHTML = `
            <li class="nav-bar-item"><a href="/login">Log In</a></li>
            <li class="nav-bar-item"><a href="/register">Register</a></li>
        `;
    }
})

// <p class="author">By</p>

getRandomJoke.addEventListener('click', async () => {
    const response = await axios.get('/random-joke');
    jokeContent.textContent = response.data.joke.joke;
    const authorResponse = await axios.post('/api/check-username', { email: response.data.joke.author });
    author.textContent = `By ${authorResponse.data.info}`;
});

