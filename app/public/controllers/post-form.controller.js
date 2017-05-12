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

  function controller($scope, $http) {
    const vm = this
    console.log(vm);

    vm.$onInit = onInit
    // vm.post = post
    // vm.comment = comment
    vm.buttonName = 'New Post'

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
    post.votes += 1
  }

  $scope.voteDown = function (post) {
    post.votes === 0 ? post.votes = 0 : post.votes -= 1
  }


    function onInit() {
      $http.get('/api/posts')
        .then(response => {
          console.log(response);
          vm.posts =response.data
        })
    }
    //
    // function post(event, post){
    //   event.preventDefault()
    //   // placeholder for now
    //   // PostService.createPost(vm.post)
    // }

    // function comment(event, comment) {
    //   // do I need this?
    //   event.preventDefault()
    //
    //   // this is a placeholder for now.
    //   // PostService.createComment(vm.comment)
    //
    // }
  }
})()
