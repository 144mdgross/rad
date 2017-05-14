(function () {
  'use strict'

angular
  .module('app')
  .component('editPost', {
    controller: controller,
    templateUrl: `../elements/edit-post.template.html`
  })

  controller.$inject = ['$stateParams', '$state', '$http']

  function controller($stateParams, $state, $http) {
    const vm = this
    console.log("edit vm", vm);

    vm.$onInit = onInit
    vm.updatePost = updatePost

    function onInit() {
      $http.get(`/api/posts/${$stateParams.id}`)
        .then(response => {
          vm.posts =response.data
            $http.get(`/api/posts/${response.data.id}/comments`)
              .then(comments => {
                vm.posts.comments = comments.data
              })
              .catch(err => console.log(err))
        })
    }

    function updatePost(event, post) {
      event.preventDefault()
      $http.patch(`/api/posts/${$stateParams.id}`, vm.post)
        .then(updated => {
          $state.go('posts')
        })
        .catch(err => console.log(err))
    }
  }
})()
