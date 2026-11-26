class NodoPrefijo {
  constructor(letra = null) {
    this.letra = letra;
    this.esFinPalabra = false;
    this.hijos = {};
    this.cancion = null;
  }
}

export class ArbolPrefijos {
  constructor() {
    this.raiz = new NodoPrefijo(null);
  }

  insertar(cancion) {
    const titulo = cancion.titulo.toLowerCase();
    let actual = this.raiz;

    for (const letra of titulo) {
      if (actual.hijos[letra] === undefined) {
        actual.hijos[letra] = new NodoPrefijo(letra);
      }
      actual = actual.hijos[letra];
    }

    actual.esFinPalabra = true;
    actual.cancion = cancion;
  }

  buscar(titulo) {
    const texto = titulo.toLowerCase();
    let actual = this.raiz;

    for (const letra of texto) {
      if (actual.hijos[letra] === undefined) {
        return false;
      }
      actual = actual.hijos[letra];
    }

    return actual.esFinPalabra;
  }

  sugerirPorPrefijo(prefijo) {
    const texto = prefijo.toLowerCase();
    let actual = this.raiz;

    for (const letra of texto) {
      if (actual.hijos[letra] === undefined) {
        return [];
      }
      actual = actual.hijos[letra];
    }

    const sugerencias = [];
    this._recorrer(actual, sugerencias);
    return sugerencias;
  }

  _recorrer(nodo, sugerencias) {
    if (nodo.esFinPalabra && nodo.cancion) {
      sugerencias.push(nodo.cancion);
    }

    for (const clave in nodo.hijos) {
      this._recorrer(nodo.hijos[clave], sugerencias);
    }
  }
}