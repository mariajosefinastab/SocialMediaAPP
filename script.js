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
            <textarea id="editBody-${post.id}" required>${post.body}</textarea>
            <button onclick="updatePost(${post.id})"> Acutalizar </button>
        </div>
        `
        postList.appendChild(listItem)
    })
}


/*Creating a resource
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));*/

function postData(){

    const postTitleInput = document.getElementById('postTitle');
    const postBodyInput = document.getElementById('postBody');

    const postTitle = postTitleInput.value;
    const postBody = postBodyInput.value;



if(postTitle.trim() == '' || postBody.trim() == ''){
    alert('Los campos son obligatorios')
    return
}

    fetch(urlBase, {
        method: 'POST',
        body: JSON.stringify({
          title: postTitle,
          body: postBody,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(res => res.json())
    .then(data => {
        posts.push(data)
        renderPostList();
        postTitleInput.value = '' //limpia textarea luego de postear
        postBodyInput.value = ''
    })
    .catch(error => console.error('Error al querer crear posteo: ', error))
}

function editPost(id){
    const editForm = document.getElementById(`editForm-${id}`);
    editForm.style.display = (editForm.style.display == 'none') ? 'block' : 'none'
}

function updatePost(id){
    const editTitle = document.getElementById(`editTitle-${id}`).value;
    const editBody = document.getElementById(`editBody-${id}`).value;

    /*Updating a resource
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));*/

    fetch(`${urlBase}/${id}`, {

        method: 'PUT',
        body: JSON.stringify({
          id: id,
          title: editTitle,
          body: editBody,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(res => res.json())
    .then(data => {
        const index = posts.findIndex(post => post.id === data.id) //busca el índice que se debe actualizar
        if(index != -1){ // si no da -1
            posts[index] = data //el índice que encontró = data(actualiza el que encntró)
        } else {
            alert('Hubo un error al actualizar la información del posteo')
        } renderPostList()
    })
    .catch(error => console.error('Error al querer actualizar posteo: ', error))
}

/*Deleting a resource
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE',
});*/

function deletePost(id){
    fetch(`${urlBase}/${id}`, {
        method: 'DELETE',
    })
    .then(res => {
        if(res.ok){
            post = posts.filter(post => post.id != id) //agrra el response y si es ok filtra los post que no coincidan con el id, están todos salvo los que coincidan
            renderPostList();
        }else{
            alert('Hubo un error y no se pudo eliminar el posteo')
        }
    })

    .catch(error => console.error('Hubo un error:', error))
}