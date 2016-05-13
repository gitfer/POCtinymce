myAppModule.directive('arxInjectableContent', function () {
    return {
        restrict: 'EC',
        transclude: true,
        link: function (scope,elem) {
            elem.replaceWith("<span>Nuovo testo <i>Iniettato</i></span>");
        }
    }
})