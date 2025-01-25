/* fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json)) */

const urlBase = 'https://jsonplaceholder.typicode.com/posts'
let posts = [] //inicia posteos como array vacío

function getData(){
    fetch(urlBase)
    .then(res => res.json())
    .then(data => {
        posts = data
        renderPostList()
    })
    .catch(error => console.error('Error al mostrar datos'))
}

function renderPostList(){
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('postItem');
        listItem.innerHTML = `

        <strong>${post.title}</strong>
        <p>${post.body}</p>
        <button onclick = "editPost(${post.id})">Editar</button>
        <button onclick = "deletePost(${post.id})">Eliminar</button>

        <div id="editForm-${post.id}" class="editForm" style="display:none"> 
            <label for="editTitle">Título: </label> 
            <input type="text" id="editTitle"-${post.id}" value="${post.title}" required>
            <label for="editBody"> Comentario: </label>
            <textarea id="editBody-${post.id}" required></textarea>
            <button onclick="updatePost(${post.id})"> Acutalizar </button>
        </div>
        `
        postList.appendChild(listItem)
    })
}