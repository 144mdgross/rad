(function() {
  'use strict'

  angular
    .module('app', [])
    .component('newPost', {
      controller: ('BindForm', BindForm),
      templateUrl: `../../elements/post-form.html`
    })

  function BindForm($scope) {
    const vm = this
    console.log("VM", vm);

    vm.$onInit = populate
    vm.createComment = createComment
    vm.comments = []

    vm.createPost = function createPost(event, author) {
      event.preventDefault()
      let buildPost = {
        title: vm.post.title,
        author: vm.post.author,
        body: vm.post.body,
        time: '1 hour ago',
        image: vm.post.image
      }
      vm.posts.push(buildPost)
      delete vm.author
    }

    $scope.val = 2
    $scope.commentVal = 2
    $scope.commentEven = true
    $scope.even = true

    // this is for ngShow
    $scope.counter = function() {
      $scope.val += 1
      $scope.even = $scope.val % 2 === 0
    }

    $scope.commentCounter = function() {
      $scope.commentVal += 1
      $scope.commentEven = $scope.commentVal % 2 === 0
    }

    function populate() {
      vm.posts = [{
        title: 'AORTA is the best',
        author: 'Esteban Kelly',
        body: 'the Anit-Opression Resource and Training Alliance is a great resource for everyone.',
        time: '1 hour ago',
        image: 'http://aorta.coop/sites/default/files/imagecache/trainer_about_image/dsc_03111_0.jpg'
      }]
    }

    function createComment(event, comment) {
      event.preventDefault()
      let opinion = {
        text: vm.comment
      }

      vm.comments.push(opinion)
      delete vm.comment
    }

  } // end of BindForm

})();
