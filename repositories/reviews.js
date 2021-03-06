const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

function getDbHandler() {
  const adapter = new FileSync('./db.json')
  const db = low(adapter)

  return db
}

class Repository {
  static insert(item) {
    return getDbHandler().get('reviews')
    .push(item)
    .write() 
  }

  static async getAll(movieIds) { 
    const reviews = getDbHandler().get('reviews').value()
    
    let reviewsFiltered
    if (movieIds && Array.isArray(movieIds) && movieIds.length > 0) {
      reviewsFiltered = reviews.filter(function filterMovieIds(item) {
        return movieIds.indexOf(item.movieId) !== -1
      })

      return reviewsFiltered
    } else {
      return reviews
    }
  }

  static async deleteAll() {
    return getDbHandler().set('reviews', [])
    .write()
  }
}

module.exports = Repository