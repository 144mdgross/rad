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
    vm.sort = sort


    // see vm.votes below scope variables


    vm.createPost = function createPost(event, author) {
      event.preventDefault()
      vm.post.votes = 0
      vm.post.date = new Date()
      vm.post.comments = []
      vm.posts.push(vm.post)
      delete vm.author
    }

    $scope.val = 2
    $scope.even = true
    $scope.options = ['votes', 'title', 'date']
    $scope.selected = $scope.options[0]
    vm.select = $scope.selected
        console.log("select", vm.select);
    // controlls ngShow on create post form
    $scope.counter = function() {
      $scope.val += 1
      $scope.even = $scope.val % 2 === 0
    }

    $scope.voteUp = function(post) {
      post.votes += 1
    }

    $scope.voteDown = function (post) {
      post.votes === 0 ? post.votes = 0 : post.votes -= 1
    }

    function populate() {
      vm.posts = [{
        title: 'AORTA is the best',
        author: 'Esteban Kelly',
        body: 'the Anit-Opression Resource and Training Alliance is a great resource for everyone.',
        date: new Date(),
        image: 'http://aorta.coop/sites/default/files/imagecache/trainer_about_image/dsc_03111_0.jpg',
        votes: 10,
        comments: []

      }, {
        title: 'Ed Whitfeild on Education and Reparations',
        author: 'Amber Brown',
        body: 'Know the difference between equity and equality.',
        date: new Date(),
        image: 'http://community-wealth.org/sites/clone.community-wealth.org/files/ed-whitfield-usfwc-2012.jpg',
        votes: 9,
        comments: [{text:'Make America Pay Reparations'}]

      }]
    }

    function createComment(event, post) {
      event.preventDefault()
      if(post.comment !== undefined) {
        console.log(post.comment);
      post.comments.push(post.comment)
      }
      delete post.comment
    }


  } // end of BindForm

})();
