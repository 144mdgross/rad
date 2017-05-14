// how do I want to organize my controllers and compnenets?
// i think i like separate controllers more than a bundle of controllers in one file.

(function () {
  angular
    .module('app')
    .component('posts', {
      controller: controller,
      templateUrl: `../elements/post-form.html`
    })

// inject dependencies into params here

  function controller($state, $stateParams, $scope, $http) {
    const vm = this
    console.log(vm);

    vm.$onInit = onInit
    vm.createPost = createPost
    vm.createComment = createComment
    vm.buttonName = 'New Post'

    $scope.val = 3
    $scope.even = false
    $scope.options = ['vote_count', 'title', 'date']
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
  }

  $scope.voteDown = function (post) {
    post.vote_count === 0 ? post.vote_count = 0 : post.vote_count -= 1
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

    }
  }
})()
