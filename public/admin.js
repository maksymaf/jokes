const wrap = document.querySelector('.wrap');


async function getAllJokes() {
    wrap.innerHTML = '';
    const {data} = await axios.get('/jokes');
    console.log(data.jokes)
    data.jokes.forEach(item => {
        const joke = document.createElement('div');
        joke.classList.add('joke');

        const jokeContent = document.createElement('p');
        const authorContent = document.createElement('p');
        const isVerfiedContent = document.createElement('p');

        const btnContainer = document.createElement('div');
        const verifyBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        btnContainer.classList.add('row');
        verifyBtn.classList.add('verify-btn');
        deleteBtn.classList.add('delete-btn');

        verifyBtn.id = `${item._id}-verify`;
        deleteBtn.id = item._id;

        verifyBtn.textContent = 'Verify';
        deleteBtn.textContent = 'Delete'

        verifyBtn.addEventListener('click', updateJoke);
        deleteBtn.addEventListener('click', deleteJoke);

        btnContainer.append(verifyBtn, deleteBtn);

        jokeContent.textContent = item.joke;
        authorContent.textContent = `Author : ${item.author}`;
        isVerfiedContent.textContent =  `Verified : ${item.verified}`;

        joke.append(jokeContent, authorContent, isVerfiedContent, btnContainer);

        wrap.appendChild(joke);
    });
}

function deleteJoke(e){
    const id = e.target.id;
    axios.delete(`/delete-joke/${id}`)
        .then(getAllJokes);
}

function updateJoke(e) {
    const id = e.target.id.split('-')[0];
    axios.put(`/verify-joke/${id}`)
        .then(getAllJokes);
}


getAllJokes();
