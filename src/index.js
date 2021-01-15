let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

let selectedToy = {}
let allToys = []
fetchAllToys()
addEventListeners()

//FETCH
function fetchAllToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {allToys = toys
      allToys.forEach(toy => renderToys(toy))})
}

function postToy(toy){
  fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
      },
      body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => {
      renderToys(toy)
  })
  .catch(error => console.log(error))
}

function patchToy(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: 'PATCH',
      headers: {
          'Content-Type':'application/json',
      },
      body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => {
      renderToys(toy)
  })
  .catch(error => console.log(error))
}

//HANDLERS
function renderToys(toy) {
  let div = document.createElement('div')
  let toyCollection = document.getElementById('toy-collection')
  div.id = toy.id
  div.className = 'card'
  toyCollection.appendChild(div)

  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.src = toy.image
  img.className = 'toy-avatar'

  let p = document.createElement('p')
  p.innerText = toy.likes

  let btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.innerText = 'Like <3'
  btn.addEventListener('click', countLikes)

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(btn)
}

function countLikes(e) {
  let likes = parseInt(e.target.parentElement.querySelector('p').innerText) + 1
  let toy = {likes: likes,
     id: parseInt(e.target.parentElement.id),
      name: e.target.parentElement.querySelector('h2').innerText,
       image: e.target.parentElement.querySelector('img').src}
  patchToy(toy)
}

function addEventListeners() {
  let form = document.getElementsByClassName('add-toy-form')[0]
  form.addEventListener('submit', handleSubmit)
}

function handleEdit() {

}

function handleSubmit(e) {
  e.preventDefault()
  let toy = {
    'name': e.target.name.value,
    'image': e.target.image.value,
    'likes': 0
  }
  postToy(toy)
}
});