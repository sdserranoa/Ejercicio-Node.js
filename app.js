const fs = require("fs");
const http = require("http");
const axios = require("axios");
const url = "https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/9ed13fd53a144528568d1187c1d34073b36101fd/categories.json";

let aux = `<div class="accordion" id="accordionExample">`;
let aux1 = "";

let i = 0;

http.createServer((req, res)=>{
    fs.readFile("./Pagina.html",(err,datos)=>{
        axios.get(url).then(response=>{
            response.data.forEach(element => {
                aux= aux + `
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#coll`+ i +`" aria-expanded="false" aria-controls="collapseOne">
                                `+ element.name +`
                            </button>
                        </h2>
                    </div>
                    <div id="coll`+ i +`" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                            <div class="card-deck">
                                <div class="row">
                                `;
                                element.products.forEach(element2 => {
                                    aux= aux+`
                                    <div class="col-6 col-md-4 col-lg-3 col-xl-2">
                                        <div class="card">
                                            <img src="`+ element2.image +`" class="card-img-top" alt="No se puede cargar la imagen">
                                            <div class="card-body">
                                                <h5 class="card-title">`+ element2.name +`</h5>
                                                <p class="card-text">`+ element2.description +`</p>
                                                <p class="card-text"><strong>`+ element2.price +`</strong></p>
                                                <button type="button" class="btn btn-primary">Add to car</button>
                                            </div>
                                        </div>
                                    </div>
                                    `;
                                });
                                aux = aux+`
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                i++;
            });
            aux= aux + `</div>`;
            aux1 = datos.toString();
            aux1 = aux1.replace("{{PlaceHolder}}",aux);
            res.write(aux1);
            res.end();
        });
    });
}).listen(8080);