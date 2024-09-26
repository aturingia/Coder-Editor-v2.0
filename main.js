//document.addEventListener("DOMContentLoaded", function () {
  var delay;
      // Initialize CodeMirror editor with a nice html5 canvas demo.
  var editorHtml = CodeMirror.fromTextArea(document.getElementById('code-html'), {
    lineNumbers: true,
    tabSize: 2,
    theme: "monokai",
    mode: "text/html",
    emmet: true,
    profile: "html",
    styleActiveLine: true,
    lineWrapping: true,
    indentUnit: 2,
    //indentWithTabs: false, // Indentación con espacios en lugar de tabulaciones.
    autoCloseTags: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    matchInMiddle: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    foldGutter: true,
    extraKeys: {"Ctrl-Space": "autocomplete"}
  });

  emmetCodeMirror(editorHtml);

  editorHtml.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
  });

// Función para descargar el contenido del editor html
  function downloadHtml() {
      // Obtiene el contenido del editor
    var contenido = editorHtml.getValue();

      // Crea un elemento <a> para la descarga
    var enlaceDescarga = document.createElement('a');
      enlaceDescarga.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenido);
      enlaceDescarga.download = 'index.html';

      // Agrega el enlace al documento y haz clic para iniciar la descarga
      document.body.appendChild(enlaceDescarga);
      enlaceDescarga.click();
      document.body.removeChild(enlaceDescarga);
  }

// Carga el contenido del archivo en CodeMirror
  function cargarArchivoContenido(archivoContenido) {
    editorHtml.setValue(archivoContenido);
  }

//======= Función para agregar líneas de indentación ================
    function addIndentGuides(cm, line, element) {
      var lineText = line.text;
      var indentLevel = lineText.match(/^\s+/);  // Detectar la indentación al inicio de la línea

      if (indentLevel) {
        var indentWidth = cm.defaultCharWidth() * cm.getOption("indentUnit");
        var numIndentGuides = Math.floor(indentLevel[0].length / cm.getOption("indentUnit"));

        // Agregar líneas de guía por cada nivel de indentación
        for (var i = 0; i < numIndentGuides; i++) {
          var indentGuide = document.createElement("div");
          indentGuide.className = "indent-guide";
          indentGuide.style.left = (i * indentWidth) + "px";
          element.insertBefore(indentGuide, element.firstChild);
        }
      }
    }

    // Evento que se dispara al renderizar una línea
    editorHtml.on("renderLine", function(cm, line, element) {
      addIndentGuides(cm, line, element);
    });

    // Refrescar el editor para aplicar los cambios
    editorHtml.refresh();



// Simula cargar un archivo (puedes reemplazar esto con tu lógica real)
  var contenidoArchivo = '<!DOCTYPE html>\n<html lang="es">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<meta http-equiv="X-UA-Compatible" content="ie=edge">\n\t<title>Mi Website</title>\n</head>\n<body>\n\t<h1>Hola, mundo!</h1>\n</body>\n</html>';
  cargarArchivoContenido(contenidoArchivo);

// Manejar el evento de cambio de archivo
  document.getElementById("fileInputHtml").addEventListener("change", function(event) {
    var file = event.target.files[0];

    if (file) {
    // Crear un lector de archivos
      var reader = new FileReader();

    // Definir la lógica para manejar la carga del archivo
      reader.onload = function(e) {
      // Establecer el contenido del editor con el contenido del archivo
        editorHtml.setValue(e.target.result);
      };

    // Leer el contenido del archivo como texto
    reader.readAsText(file);
    }
  });
  
  //====== Resaltado de linea activa =======
  var activeLine = null;

        // Agregar evento de clic al editor
        editorHtml.on("mousedown", function (cm, event) {
            // Obtener el número de línea haciendo clic en la posición del evento
            var line = cm.lineAtHeight(event.clientY, "window");

            // Verificar si ya hay una línea activa
            if (activeLine !== null) {
                // Deshacer el resaltado de la línea activa anterior
                cm.removeLineClass(activeLine, "background", "activeline");
            }

            // Marcar la nueva línea activa
            cm.addLineClass(line, "background", "activeline");

            // Guardar la línea activa actual
            activeLine = line;
        });


  var delay;
  var editorCss = CodeMirror.fromTextArea(document.getElementById('code-css'), {
    lineNumbers: true,
    tabSize: 2,
    theme: "monokai",
    mode:"css",
    styleActiveLine: true,
    lineWrapping: true,
    indentUnit: 2,
    indentWithTabs: false, // Indentación con espacios en lugar de tabulaciones.
    autoCloseTags: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    matchInMiddle: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    foldGutter: true,
    colorpicker : true,
    extraKeys: {"Ctrl-Space": "autocomplete"}
  });

  editorCss.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
  });

// Función para descargar el contenido del editor css
    function downloadCss() {
      // Obtiene el contenido del editor
      var contenido = editorCss.getValue();

      // Crea un elemento <a> para la descarga
      var enlaceDescarga = document.createElement('a');
      enlaceDescarga.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenido);
      enlaceDescarga.download = 'styles.css';

      // Agrega el enlace al documento y haz clic para iniciar la descarga
      document.body.appendChild(enlaceDescarga);
      enlaceDescarga.click();
      document.body.removeChild(enlaceDescarga);
    }

    // Manejar el evento de cambio de archivo
  document.getElementById("fileInputCss").addEventListener("change", function(event) {
    var file = event.target.files[0];

    if (file) {
    // Crear un lector de archivos
      var reader = new FileReader();

    // Definir la lógica para manejar la carga del archivo
      reader.onload = function(e) {
      // Establecer el contenido del editor con el contenido del archivo
        editorCss.setValue(e.target.result);
      };

    // Leer el contenido del archivo como texto
      reader.readAsText(file);
    }
  });

//======= Función para agregar líneas de indentación ================
    function addIndentGuides(cm, line, element) {
      var lineText = line.text;
      var indentLevel = lineText.match(/^\s+/);  // Detectar la indentación al inicio de la línea

      if (indentLevel) {
        var indentWidth = cm.defaultCharWidth() * cm.getOption("indentUnit");
        var numIndentGuides = Math.floor(indentLevel[0].length / cm.getOption("indentUnit"));

        // Agregar líneas de guía por cada nivel de indentación
        for (var i = 0; i < numIndentGuides; i++) {
          var indentGuide = document.createElement("div");
          indentGuide.className = "indent-guide";
          indentGuide.style.left = (i * indentWidth) + "px";
          element.insertBefore(indentGuide, element.firstChild);
        }
      }
    }

    // Evento que se dispara al renderizar una línea
    editorCss.on("renderLine", function(cm, line, element) {
      addIndentGuides(cm, line, element);
    });

    // Refrescar el editor para aplicar los cambios
    editorCss.refresh();


  
  //====== Resaltado de linea activa =======
  var activeLine = null;

        // Agregar evento de clic al editor
        editorCss.on("mousedown", function (cm, event) {
            // Obtener el número de línea haciendo clic en la posición del evento
            var line = cm.lineAtHeight(event.clientY, "window");

            // Verificar si ya hay una línea activa
            if (activeLine !== null) {
                // Deshacer el resaltado de la línea activa anterior
                cm.removeLineClass(activeLine, "background", "activeline");
            }

            // Marcar la nueva línea activa
            cm.addLineClass(line, "background", "activeline");

            // Guardar la línea activa actual
            activeLine = line;
        });

   
  var delay;
  var editorJs = CodeMirror.fromTextArea(document.getElementById('code-js'), {
    lineNumbers: true,
    //tabSize: 2,
    theme: "monokai",
    mode: {name: "javascript", globalVars: true},
    styleActiveLine: true,
    lineWrapping: true,
    indentUnit: 2,
    indentWithTabs: false, // Indentación con espacios en lugar de tabulaciones.
    autoCloseTags: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    matchInMiddle: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    foldGutter: true,
    extraKeys: {"Ctrl-Space": "autocomplete"}
  });

  editorJs.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
  });

// Función para descargar el contenido del editor js
    function downloadJs() {
      // Obtiene el contenido del editor
      var contenido = editorJs.getValue();

      // Crea un elemento <a> para la descarga
      var enlaceDescarga = document.createElement('a');
      enlaceDescarga.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenido);
      enlaceDescarga.download = 'main.js';

      // Agrega el enlace al documento y haz clic para iniciar la descarga
      document.body.appendChild(enlaceDescarga);
      enlaceDescarga.click();
      document.body.removeChild(enlaceDescarga);
    }
 
  function updatePreview() {
    var codeHtml = editorHtml.getValue();
    var codeCss = "<style>" + editorCss.getValue() + "</style>";
    var codeJs = "<scri" + "pt>" + editorJs.getValue() + "</scri" + "pt>";
    var previewFrame = document.getElementById('output');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(codeHtml+codeCss+codeJs);
    preview.close();
  }
  setTimeout(updatePreview, 300);

// Manejar el evento de cambio de archivo
  document.getElementById("fileInputJs").addEventListener("change", function(event) {
    var file = event.target.files[0];

    if (file) {
    // Crear un lector de archivos
      var reader = new FileReader();

    // Definir la lógica para manejar la carga del archivo
      reader.onload = function(e) {
      // Establecer el contenido del editor con el contenido del archivo
        editorJs.setValue(e.target.result);
      };

    // Leer el contenido del archivo como texto
      reader.readAsText(file);
    }
  }); 


// newTab
  function openPreview() {
  // Obtener el contenido del editor
    var codeH = editorHtml.getValue();
    var codeC = "<style>" + editorCss.getValue() + "</style>";
    var codeJ =  "<scri" + "pt>" + editorJs.getValue() + "</scri" + "pt>";

  // Abrir una nueva ventana o pestaña con el contenido
    var newWindow = window.open();
    newWindow.document.write(codeH+codeC+codeJ);
    newWindow.document.close();
  }
 
//======= Función para agregar líneas de indentación ================
    function addIndentGuides(cm, line, element) {
      var lineText = line.text;
      var indentLevel = lineText.match(/^\s+/);  // Detectar la indentación al inicio de la línea

      if (indentLevel) {
        var indentWidth = cm.defaultCharWidth() * cm.getOption("indentUnit");
        var numIndentGuides = Math.floor(indentLevel[0].length / cm.getOption("indentUnit"));

        // Agregar líneas de guía por cada nivel de indentación
        for (var i = 0; i < numIndentGuides; i++) {
          var indentGuide = document.createElement("div");
          indentGuide.className = "indent-guide";
          indentGuide.style.left = (i * indentWidth) + "px";
          element.insertBefore(indentGuide, element.firstChild);
        }
      }
    }

    // Evento que se dispara al renderizar una línea
    editorJs.on("renderLine", function(cm, line, element) {
      addIndentGuides(cm, line, element);
    });

    // Refrescar el editor para aplicar los cambios
    editorJs.refresh();

  //====== Resaltado de linea activa =======
  var activeLine = null;

        // Agregar evento de clic al editor
        editorJs.on("mousedown", function (cm, event) {
            // Obtener el número de línea haciendo clic en la posición del evento
            var line = cm.lineAtHeight(event.clientY, "window");

            // Verificar si ya hay una línea activa
            if (activeLine !== null) {
                // Deshacer el resaltado de la línea activa anterior
                cm.removeLineClass(activeLine, "background", "activeline");
            }

            // Marcar la nueva línea activa
            cm.addLineClass(line, "background", "activeline");

            // Guardar la línea activa actual
            activeLine = line;
        });


//});
