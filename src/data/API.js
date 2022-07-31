export class API {
    static categorias = [];

    static comprar() {
        return new Promise( () => {
            
        })
    }
 
    static getCategoriaById(id) {
        let categoriasEncontradas = API.categorias.find(
            c => c.id == id
        )
        return categoriasEncontradas
    }

    static async getProductos() {
        let response = await fetch("http://localhost:8000/api/productos");
        return await response.json();
    }

    static async getCategorias() {
        let response = await fetch("http://localhost:8000/api/categorias");
        return await response.json();
    }

    static async cacheCategorias() {
       API.categorias = await this.getCategorias();
    }

    static async registrar(usuario) {
        let response = await fetch("http://localhost:8000/api/registrar", {
            "method": "POST",
            headers: {
                "content-type": "application/json",
            },
            "body": JSON.stringify(usuario)
        })
        return await response.json()
    }

    static async login(usuario) {
        let response = await fetch("http://localhost:8000/api-token/", {
            "method": "POST",
            headers: {
                "content-type": "application/json",
            },
            "body": JSON.stringify(usuario)
        })
        return await response.json()
    }

    static async enviarPedido(pedido) {
        let response = await fetch("http://localhost:8000/api/comprar", {
            "method": "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": "Token " + localStorage.getItem("token")
            },
            "body": JSON.stringify(pedido)
        })
        return await response.json()
    }
}

API.cacheCategorias();

/*     static async getProductos() {
    let response = await fetch("http://localhost:8000/api3/producto/?format=json");
    return await response.json();
}*/