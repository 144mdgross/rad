(function() {
'use strict'


angular
  .module('app')
  .service('PostService', PostService)


function PostService($http) {
  const BASE_URL = '/api/posts'

  this.getPosts = function() {
  return $http.get(BASE_URL)
      .then(response => {
        return response.data
      })
  }

  this.getComments = function (id) {
    return $http.get(BASE_URL + '/' + id + '/comments')
      .then(res => res)
  }

  this.createPost = function(newPost) {
    return $http.post(BASE_URL, newPost).then(result => result)
  }

  this.createComment = function(post) {
    return $http.post(BASE_URL + '/' + post.id + '/comments', {'post_id': post.id, 'content': post.comment.text})
      .then(comment => comment)
  }

  this.getPost = function(id) {
    return $http.get(BASE_URL + '/' + id)
  }

  this.updatePost = function(updatedPost) {
    return $http.patch(BASE_URL + '/' + updatedPost.id, updatedPost)
  }

  this.deletePost = function(id) {
    return $http.delete(BASE_URL + '/' + id)
  }
}

PostService.$inject = ['$http']

})()
