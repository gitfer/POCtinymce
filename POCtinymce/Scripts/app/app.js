var myAppModule = angular.module('myApp', ['ui.tinymce']);

myAppModule.controller('TinyMceController', function ($scope, $timeout) {
    $scope.tinymceModel = '<h2>Il contenuto editabile cambiera\' dop 3 secondi</h2><div class="myclass mceNonEditable arx-injectable-content" style="background-color: yellow">Contenuto <strong>non editabile</strong> con un po\' di formattazione</div><div class="myclass arx-injectable-content">Zona con nostro placeholder sostituibile</div>';


    $scope.getContent = function () {
        console.log('Editor content:', $scope.tinymceModel);
    };

    $scope.setContent = function () {
        $scope.tinymceModel = 'Time: ' + (new Date());
    };

    function setHtmlContent(editor, placeholder, htmlContent) {
        // Qui potremmo mettere logica per non permettere l'editing programmatico delle porzioni marcate con mceNonEditable
        var content = editor.getContent();
        var el = $('<div></div>');
        el.html(content);
        $(el).find(placeholder).html(htmlContent);
        editor.setContent($(el).html());
    }

    $scope.tinymceOptions = {
        plugins: 'link image code noneditable',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
        setup: function(editor) {
            //Focus the editor on load
            $timeout(function(){ editor.focus(); });
            editor.on("init", function () {
                $timeout(function () {
                    setHtmlContent(editor, '.arx-injectable-content', 'ssd <strong>con parte in bold</strong>');
                }, 3000);
                
            });
            editor.on("click", function() {
                });
        }
    };
});