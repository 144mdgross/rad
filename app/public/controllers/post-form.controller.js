(function() {
  'use strict'

  angular
    .module('app')
    .component('posts', {
      controller: controller,
      templateUrl: `../elements/post-form.template.html`
    })

  controller.$inject = ['$state', '$stateParams', '$scope', '$http', 'PostService']

  function controller($state, $stateParams, $scope, $http, PostService) {
    const vm = this

    vm.$onInit = onInit
    vm.createPost = createPost
    vm.createComment = createComment
    vm.buttonName = 'New Post'
    $scope.sort = sort

    $scope.val = 3
    $scope.even = false
    $scope.options = ['votes', 'title', 'date']
    $scope.selected = $scope.options[0]
    vm.select = $scope.selected

    function onInit() {
      PostService.getPosts().then(res => {
        vm.posts = res
      })
    }

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
      PostService.updatePost(post)
        .then(updated => {
          sort()
        })
    }

    $scope.voteDown = function(post) {
      post.vote_count === 0 ? post.vote_count = 0 : post.vote_count -= 1
      PostService.updatePost(post)
        .then(updated => {
          sort()
        })
    }

    $scope.del = function(id) {
      PostService.deletePost(id)
        .then(del => {
          onInit()
        })
    }

    function createPost(event) {
      event.preventDefault()
      PostService.createPost(vm.post).then(post => {
        delete vm.post
        onInit()
      })
    }

    function createComment(event, post) {
      event.preventDefault()
      PostService.createComment(post)
        .then(comment => {
          onInit()
        })
    }

    function sort() {
      vm.select === "votes" || vm.select === "-vote_count" ? vm.select = '-vote_count' : vm.select === 'date' ? vm.select = '-created_at' : vm.select = 'title'

    }
  }
})()
