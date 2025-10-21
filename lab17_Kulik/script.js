const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Отримуємо список справ із Local Storage або створюємо порожній
let todos = JSON.parse(localStorage.getItem('todos')) || [
  { id: 1, text: 'Вивчити HTML', done: true },
  { id: 2, text: 'Вивчити CSS', done: true },
  { id: 3, text: 'Вивчити JavaScript', done: false },
]

// Рендер однієї справи
function renderTodo(todo) {
  const checkedClass = todo.done ? 'text-success text-decoration-line-through' : ''
  const checkedAttr = todo.done ? 'checked' : ''
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${checkedAttr} />
      <label for="${todo.id}"><span class="${checkedClass}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" data-id="${todo.id}">delete</button>
    </li>
  `
}

// Повний рендер списку
function render() {
  list.innerHTML = todos.map(renderTodo).join('')
  updateCounter()
  saveTodos()
  attachEventListeners()
}

// Оновлення лічильників
function updateCounter() {
  itemCountSpan.textContent = todos.length
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.done).length
}

// Збереження в Local Storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Додавання нової справи
function newTodo() {
  const text = prompt('Введіть текст нової справи:')
  if (text) {
    const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1
    todos.push({ id: newId, text: text, done: false })
    render()
  }
}

// Видалення справи
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  render()
}

// Відмітка справи як виконаної
function checkTodo(id, done) {
  const todo = todos.find(t => t.id === id)
  if (todo) {
    todo.done = done
    render()
  }
}

// Прив'язка обробників подій для checkbox та delete
function attachEventListeners() {
  document.querySelectorAll('#todo-list input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', e => {
      checkTodo(Number(cb.id), cb.checked)
    })
  })
  document.querySelectorAll('#todo-list button').forEach(btn => {
    btn.addEventListener('click', e => {
      deleteTodo(Number(btn.dataset.id))
    })
  })
}

// Початковий рендер
render()
