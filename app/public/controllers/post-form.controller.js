
(function () {
  angular
    .module('app')
    .component('posts', {
      controller: controller,
      template: `<h1>Fruit Bat! {{ $ctrl.posts[0].title }}</h1>`
    })

  function controller($state, $stateParams) {
    const vm = this
    vm.$onInit = onInit

    function onInit() {
      vm.posts = [{
        title: 'Sadly untitled'
      }]
    }
  }
})()
