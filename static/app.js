const BASE_URL = "http://localhost:5000/api";

function cupcakeHTML(cupcake) {
    return `
            <div data-cupcake-id=${cupcake.id} class="col-2 align-self-end">
                <img src="${cupcake.image}" class="cupcake_img">
                <ul>
                <li>Flavor: ${cupcake.flavor}</li>
                <li>Size: ${cupcake.size}</li>
                <li>Rating: ${cupcake.rating}</li>
                </ul>
                <button class ="delete-btn btn btn-danger">Delete</button>
            </div>`;
};

async function showInitialCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(cupcakeHTML(cupcakeData));
        $("#cupcakes-list").append(newCupcake);
    };
};

$("#new-cupcake-form").on("submit", async function (evt) {
    evt.preventDefault();

    let flavor = $("#form-flavor").val();
    let rating = $("#form-rating").val();
    let size = $("#form-size").val();
    let image = $("#form-image").val();
    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {flavor, rating,  size, image});
    let newCupcake = $(cupcakeHTML(newCupcakeResponse.data.cupcake));
    $("#cupcakes-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");
});

$("#cupcakes-list").on("click", ".delete-btn", async function (evt) {
    evt.preventDefault();
    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

$(showInitialCupcakes);
