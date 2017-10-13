import { api, headers } from './Constants'

const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

const update = (bookId, shelf) =>
  fetch(`${api}/books/${bookId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)

export default {
  get,
  getAll,
  update,
  search
}
