
// Conexión a la API
$.ajax({
  type: "GET",
  url: "https://digimon-api.vercel.app/api/digimon",
  dataType: "JSON",
  success: function (response) {
    $.each(response, function (i, data) {
      $("tbody").append(`
            <tr>
            <th scope="row"><p id="numero2">${i + 1}</p></th>
            <td id="dname"> <p id="dname2">${data.name}</p></td>
            <td id="dlevel"><p id="dlevel2">${data.level}</p></td>
            <td id="dimg"><img id="dimg2" src="${data.img}" alt="${data.name}"></td>
            </tr>
            `);
    });
    },
    error: function (error) {
    console.log(error);
    },
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
