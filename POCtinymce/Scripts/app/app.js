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
        var newHtmlContent = $(el).html();
        return newHtmlContent;
    }
    function generate_table(editor, placeholder, tableData) {
        // get the reference for the body
        var content = editor.getContent();
        var el = $('<div></div>');
        el.html(content);
        var body = $(el).find(placeholder)[0];

        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        // creating all cells
        for (var i = 0; i < 2; i++) {
            // creates a table row
            var row = document.createElement("tr");

            for (var j = 0; j < 2; j++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                var cell = document.createElement("td");
                //var cellText = document.createTextNode("cell in row " + i + ", column " + j);
                var cellText = document.createTextNode(tableData[i][j]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            // add the row to the end of the table body
            tblBody.appendChild(row);
        }

        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tbl);
        // sets the border attribute of tbl to 2;
        tbl.setAttribute("border", "2");

        $(el).find(placeholder).html(body.innerHTML);
        var newHtmlContent = $(el).html();
        return newHtmlContent;
    }

    $scope.tinymceOptions = {
        plugins: 'link image code noneditable',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
        setup: function(editor) {
            //Focus the editor on load
            $timeout(function(){ editor.focus(); });
            editor.on("init", function () {
                $timeout(function () {
                    editor.setContent(setHtmlContent(editor, '.arx-injectable-content', 'ssd <strong>con parte in bold</strong><div class="arx-injectable-content-table"></div>'));
                    var tableData = [['1o el', '2o el'], ['3o el', '4o el']];
                    var newContent = generate_table(editor, '.arx-injectable-content-table:first', tableData);
                    editor.setContent(newContent);
                }, 3000);
                
            });
            editor.on("click", function() {
                });
        }
    };
});