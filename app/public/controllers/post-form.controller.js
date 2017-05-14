(function () {
  'use strict'

  angular
    .module('app')
    .component('posts', {
      controller: controller,
      templateUrl: `../elements/post-form.template.html`
    })

    controller.$inject = ['$state', '$stateParams', '$scope', '$http']

  function controller($state, $stateParams, $scope, $http) {
    const vm = this
    console.log(vm);

    vm.$onInit = onInit
    vm.createPost = createPost
    vm.createComment = createComment
    vm.buttonName = 'New Post'
    vm.sort = sort

    $scope.val = 3
    $scope.even = false
    $scope.options = ['votes', 'title', 'date']
    $scope.selected = $scope.options[0]
    vm.select = $scope.selected

  $scope.counter = function() {
    $scope.val += 1
    $scope.even = $scope.val % 2 === 0
    if ($scope.even) {
      vm.buttonName = 'Hide Form'
    } else {
      vm.buttonName = 'New Post'
    }
  }

  $scope.voteUp = function(post) {
    post.vote_count += 1
    console.log(post.vote_count);
    console.log(post);
    $http.patch(`/api/posts/${post.id}`, post)
      .then(increment => {
            sort()
      })
  }

  $scope.voteDown = function (post) {
    post.vote_count === 0 ? post.vote_count = 0 : post.vote_count -= 1
    $http.patch(`/api/posts/${post.id}`, post)
      .then(increment => {
            sort()
      })
      .catch(err => console.log(err))
  }

  $scope.del = function(id) {
    $http.delete(`/api/posts/${id}`)
      .then(gone => {
        onInit()
      })
  }

    function onInit() {
      $http.get('/api/posts')
        .then(response => {
          vm.posts =response.data
          for (var i = 0; i < newPost.length; i++) {
            $http.get(`/api/posts/${newPost[i].id}/comments`)
              .then(comments => {
                vm.posts.comments = comments
              })
              .catch(err => console.log(err))
          }
        })
    }

    function createPost(event){
      event.preventDefault()

      $http.post('/api/posts', vm.post)
        .then(newPost => {
          delete vm.post
          onInit()
        })
    }

    function createComment(event, post) {
      event.preventDefault()

      $http.post(`/api/posts/${post.id}/comments`, { 'post_id': post.id, 'content': post.comment.text })
        .then(thoughts => {
          onInit()
        })
        .catch(err => console.log(err))
    }
    function sort() {
      vm.select === 'votes' || vm.select === '-vote_count' ? vm.select = '-vote_count' : vm.select === 'date' ? vm.select = '-$ctrl.post.created_at' : vm.select = 'title'
    }
  }
})()
