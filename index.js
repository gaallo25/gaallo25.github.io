let departamentos = [];
let ciudades = [];

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("mc-embedded-subscribe-form")
    .addEventListener("submit", EnviarDatosFormulario);
});

const deparments = [
  "Amazonas",
  "Antioquia",
  "Arauca",
  "Atlántico",
  "Bolívar",
  "Boyacá",
  "Caldas",
  "Caquetá",
  "Casanare",
  "Cauca",
  "Cesar",
  "Chocó",
  "Córdoba",
  "Cundinamarca",
  "Guainía",
  "Guaviare",
  "Huila",
  "La Guajira",
  "Magdalena",
  "Meta",
  "Nariño",
  "Norte de Santander",
  "Putumayo",
  "Quindío",
  "Risaralda",
  "San Andrés y Providencia",
  "Santander",
  "Sucre",
  "Tolima",
  "Valle del Cauca",
  "Vaupés",
  "Vichada",
];

function EnviarDatosFormulario() {
  let clienteNombre = document.getElementById("mce-EMPRESA").value;
  let celularNumero = document.getElementById("mce-TELEFONO").value;
  let email = document.getElementById("mce-EMAIL").value;
  let departamentoID = parseInt(
    document.getElementById("mce-DEPARTAMEN").value
  );
  let ciudadID = parseInt(document.getElementById("mce-MUNICIPIO").value);

  let ciudad = $("#mce-MUNICIPIO").find("option:selected").text();
  let empresa = document.getElementById("mce-NOMBRE").value;

  console.log(ciudad);
  Swal.fire({
    title: "Espera",
    text: "Estamos registrando tu información",
    imageUrl: "https://c.tenor.com/K2UGDd4acJUAAAAC/load-loading.gif",
    imageWidth: 150,
    imageHeight: 150,
    imageAlt: "Custom image",
  });
  fetch("https://panacaservices.azurewebsites.net/api/corporativo", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clienteNombre: clienteNombre,
      clienteApellido: ".",
      celularNumero: celularNumero,
      email: email,
      departamentoID: departamentoID,
      ciudadID: ciudadID,
      contactoNombre: empresa,
      documentoNumero: ciudad,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      RegistroCliente(data);
    });
}

function RegistroCliente(data) {
  Swal.fire({
    icon: "success",
    title: "Registrado",
    text: "La información fue registrada correctamente",
  });
}

const getDepartment = async () => {
  try {
    // let response = await fetch('https://panacaservices.azurewebsites.net/api/departamento',{ method: 'GET'});
    //let json = await response.json();
    for (let index = 0; index < deparments.length; index++) {
      let option = document.createElement("option");
      option.value = index + 1;
      option.textContent = deparments[index];
      option.className = "font-[Arial]";
      document.getElementById("mce-DEPARTAMEN").appendChild(option);
    }
  } catch (err) {
    console.log("ocurrio un error " + err);
  }
};

function ObtenerCiudades(departamentoId) {
  $("#mce-MUNICIPIO").empty();
  fetch(
    "https://panacaservices.azurewebsites.net/api/ciudad?departamentoId=" +
      departamentoId
  )
    .then((response) => response.json())
    .then((data) => {
      ObtenerCiudad(data);
    });
}

function ObtenerCiudad(data) {
  console.log(data);
  data.forEach(function (ciudades) {
    let option = document.createElement("option");
    option.value = ciudades.ciudadID;
    option.id = ciudades.ciudadID;
    option.textContent = ciudades.ciudadName;
    option.className = "font-[Arial]";
    document.getElementById("mce-MUNICIPIO").appendChild(option);
  });
}

const removeOptions = () => {
  let municipalities = document.querySelector("#mce-MUNICIPIO"),
    optionMunicipality = municipalities.querySelectorAll("option");

  for (let index = 0; index < optionMunicipality.length; index++) {
    municipalities.removeChild(optionMunicipality[index]);
  }
};
document.addEventListener("change", (e) => {
  if (e.target.matches("#mce-DEPARTAMEN")) {
    let municipalities = document.querySelector("#mce-MUNICIPIO"),
      optionMunicipality = municipalities.querySelectorAll("option");

    if (optionMunicipality.length > 0) {
      removeOptions();
    }

    ObtenerCiudades(e.target.value);
  }
});
