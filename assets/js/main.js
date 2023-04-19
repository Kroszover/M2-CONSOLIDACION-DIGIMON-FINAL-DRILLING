
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
            <th scope="row"> <button type="button" id="btn${data.name}" class="btn btn-dark">Ampliar</button> </th>
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

//Barra de busqueda y primer evento.
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



//Botón y segundo evento.
$(document).on("click", "button", function() {
    console.log("click");
    var id = $(this).attr("id");
    var nombre = $(this).closest("tr").find("#dname2").text();
    var nivel = $(this).closest("tr").find("#dlevel2").text();
    var imagen = $(this).closest("tr").find("#dimg2").attr("src");
    var numero = $(this).closest("tr").find("#numero2").text();
    
    $("#modalDigimon").modal("show");
    console.log("modal abierto");
    
    $("#modalDigimon").find("#nombreDigimon").text(nombre);
    $("#modalDigimon").find("#nivelDigimon").text(nivel);
    $("#modalDigimon").find("#imagenDigimon").attr("src", imagen);
    $("#modalDigimon").find("#numeroDigimon").text(numero);
    });

// Función para cerrar el modal
$("#cerrarModal").on("click", function () {
    $("#modalDigimon").modal("hide");
    }
    );

// Función para cerrar el modal con la tecla ESC
$(document).on("keyup", function (e) {
    if (e.key === "Escape") {
    $("#modalDigimon").modal("hide");
    }
    }
    );

    


