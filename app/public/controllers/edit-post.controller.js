(function () {
  'use strict'

angular
  .module('app')
  .component('editPost', {
    controller: controller,
    templateUrl: `../elements/edit-post.html`
  })

  function controller() {
    const vm = this
    console.log("edit vm", vm);


  }

})()
