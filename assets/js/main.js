
/*Conexión a la Api*/
// Definir variables para el paginador
var elementosPorPagina = 10;
var currentPage = 1;
var totalPages = 0;

// Función para mostrar los elementos de una página específica
function showPage(page) {
  // Calcular los índices de los elementos a mostrar
  var startIndex = (page - 1) * elementosPorPagina;
  var endIndex = startIndex + elementosPorPagina;

  // Ocultar todas las filas
  $("table tbody tr").hide();

  // Mostrar solo las filas de la página actual
  $("table tbody tr").slice(startIndex, endIndex).show();

  // Actualizar el número de página actual
  currentPage = page;

  // Actualizar los botones de navegación
  updatePagination();
}

// Función para actualizar los botones de navegación
function updatePagination() {
  // Calcular el número total de páginas
  totalPages = Math.ceil($("table tbody tr").length / elementosPorPagina);

  // Ocultar o mostrar los botones según sea necesario
  if (currentPage === 1) {
    $("#previous-page-btn").prop("disabled", true);
  } else {
    $("#previous-page-btn").prop("disabled", false);
  }

  if (currentPage === totalPages) {
    $("#next-page-btn").prop("disabled", true);
  } else {
    $("#next-page-btn").prop("disabled", false);
  }

  // Actualizar el texto con el número de página actual y el número total de páginas
  $("#current-page-text").text("Página " + currentPage + " de " + totalPages);
}

// Conexión a la API
$.ajax({
  type: "GET",
  url: "https://digimon-api.vercel.app/api/digimon",
  dataType: "JSON",
  success: function (response) {
    $.each(response, function (i, data) {
      $("tbody").append(`
            <tr>
            <th scope="row">${i + 1}</th>
            <td>${data.name}</td>
            <td>${data.level}</td>
            <td><img src="${data.img}" alt="${data.name}"></td>
            </tr>
            `);
    });

    // Mostrar la primera página
    showPage(1);
  },
});

// Añadir los botones de navegación al DOM
$("#pagination").append(`
  <button id="previous-page-btn" class="btn btn-primary" disabled>Anterior</button>
  <span id="current-page-text"></span>
  <button id="next-page-btn" class="btn btn-primary">Siguiente</button>
`);

// Añadir los eventos para los botones de navegación
$("#previous-page-btn").click(function () {
  showPage(currentPage - 1);
});

$("#next-page-btn").click(function () {
  showPage(currentPage + 1);
});


//Barra de busqueda
$("#barraBusqueda").on("keyup", function () {
    var texto = $(this).val().toLowerCase();
    $("table tbody tr").each(function () {
    var fila = $(this).text().toLowerCase();
    if (fila.indexOf(texto) === -1) {
    $(this).hide();
    } else {
    $(this).show();
    }
    });
    // Agregar mensaje de error si no se encuentran resultados
var numResultados = $("table tbody tr:visible").length;
if (numResultados === 0) {
    $("table tbody").append("<tr><td colspan='3' class='text-center'>No se encontraron resultados</td></tr>");
} else {
    $("table tbody tr:last-child").remove();
}
});







/*<tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>*/
