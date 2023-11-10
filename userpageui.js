
const root = document.querySelector('#root');
const userContainer = document.createElement('div'); 
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');


const getUserDataAndPosts = async (userId) => {
    try {
        const [responseUser, responsePost] = await Promise.all([
            fetch(`https://dummyjson.com/users/${userId}`),
            fetch(`https://dummyjson.com/posts/user/${userId}`)
        ]);

        if (!responseUser.ok) {
            throw Error('User not found');
        }

        const userData = await responseUser.json();
        const postData = await responsePost.json();
        console.log(userData,postData);
        const { firstName, email } = userData;
        const { posts } = postData;
        showUserAndPosts(firstName, email, posts); 
    } catch (error) {
        console.log(error);
        root.innerHTML = `<h1>${error.message}</h1>`;
    }
};

getUserDataAndPosts(5); 

const showUserAndPosts = (firstName, email, posts) => {
    userContainer.innerHTML = '';
    const user = document.createElement('div');
    user.classList.add('user')
    const userName = document.createElement('h1');
    userName.innerText = firstName;
    const userEmail = document.createElement('h2');
    userEmail.innerText = email;
    user.append(userName, userEmail);
    userContainer.append(user);
    const text=document.createElement('div')
    text.classList.add('text')
    text.innerText='User Posts:'
    userContainer.append(text)

    posts.forEach((product) => {
        const post = document.createElement('div');
        post.classList.add('posts')
        const title = document.createElement('h4');
        title.innerText = product.title;
        const body = document.createElement('p');
        body.innerText = product.body;
        post.append(title, body);
        userContainer.append(post);
    });

    root.append(userContainer);
};



