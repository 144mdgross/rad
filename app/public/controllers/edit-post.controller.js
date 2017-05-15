(function () {
  'use strict'

angular
  .module('app')
  .component('editPost', {
    controller: controller,
    templateUrl: `../elements/edit-post.template.html`
  })

  controller.$inject = ['$stateParams', '$state', '$http', 'PostService']

  function controller($stateParams, $state, $http, PostService) {
    const vm = this
    console.log("edit vm", vm);

    vm.$onInit = onInit
    vm.updatePost = updatePost

    function onInit() {
      PostService.getPost($stateParams.id)
        .then(success => {
          vm.posts = success
        })
    }

    function updatePost(event, update) {
      event.preventDefault()
      let id = vm.posts.id
      update.id = id
      PostService.updatePost(update)
        .then(updated => {
          $state.go('posts')
        })
    }
  }
})()
