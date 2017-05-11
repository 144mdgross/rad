(function() {
  'use strict'

console.log('post-form-controller');
  angular
    .module('app', ['angularMoment'])
    .component('newPost', {
      controller: ('BindForm', BindForm),
      templateUrl: `../../elements/post-form.html`
    })

  function BindForm($scope) {
    const vm = this

    vm.$onInit = populate
    vm.createComment = createComment
    vm.sort = sort
    vm.buttonName = 'New Post'

    vm.createPost = function createPost(event, author) {
      event.preventDefault()
      vm.post.votes = 0
      vm.post.time = new Date()
      vm.post.comments = []
      vm.posts.push(vm.post)
      delete vm.post
    }

    $scope.val = 3
    $scope.even = false
    $scope.options = ['votes', 'title', 'date']
    $scope.selected = $scope.options[0]
    vm.select = $scope.selected

    // controlls ngShow on create post form
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

    function populate() {
      vm.posts = [{
        title: 'AORTA and Esteban',
        author: 'AORTA cooperative',
        body: 'Esteban Kelly is a visionary leader and compassionate strategist who inspires organizers by drawing on science fiction, social theory, and collective liberation. Uniting close friends and long-time co-organizers, Esteban was inspired to co-create AORTA (Anit-Opression Resource and Training Alliance) culling together his creative energy and organizational skills for expanding food sovereignty, solidarity economy & cooperative business, gender justice & queer liberation, and movements for racial justice. ',
        time: new Date('March 12, 2017 11:10:00'),
        image: 'http://aorta.coop/sites/default/files/imagecache/trainer_about_image/dsc_03111_0.jpg',
        votes: 10,
        comments: [{ text: 'check out the USFWC too' }]

      },
      {
        title: "The Rock Dove Collective",
        author: 'Autumn Brown',
        body: 'The Rock Dove Collective is a radical community health exchange working to address the need for accessible and anti-oppressive health care in our communities. We coordinate a network of health practitioners who provide physical, mental, sexual, emotional, social and spiritual care from a progressive perspective on well-being. We are a collective of anarchist and radical individuals who support de-centralized and non-oppressive forms and sources of health, we see this as both a daily necessity and a revolutionary strategy.',
        time: new Date(),
        image: 'http://aorta.coop/sites/default/files/imagecache/trainer_about_image/fullsizerender.jpg',
        votes: 14,
        comments: [{ text: 'check out Autumn\'s publication Octavia’s Brood: Science Fiction Stories from Social Justice Movements (AK Press, 2015)' }]
      },
      {
        title: 'REPARATIONS: HOW ARE WE DOING IT?',
        author: 'Ed Whitfeild',
        body: 'While, this is not a final statement on reparations, I hope that it will spark further thinking and discussion as we continue to build power and work for what is needed.',
        time: new Date('September 12, 2016 12:03:00'),
        image: 'https://f4dc.org/wp-content/uploads/2014/04/ed-whitfield-usfwc-2012-300x200.jpg',
        votes: 9,
        comments: [{ text: 'Resistance, Advocacy and Doing things for ourselves (RAD)' }]

      }]
    }

    function createComment(event, post) {
      event.preventDefault()
      if (post.comment !== undefined) {
        post.comments.push(post.comment)
      }
      delete post.comment
    }
  } // end of BindForm

})();
