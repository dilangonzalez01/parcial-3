export class HeapMaximo {
  constructor(inicial = []) {
    this.datos = [...inicial];
    if (this.datos.length > 0) {
      this.construirHeap();
    }
  }

  agregar(cancion) {
    this.datos.push(cancion);
    this.subir();
  }

  sacarMayor() {
    if (this.datos.length === 0) return undefined;

    const ultimo = this.datos.length - 1;
    this.intercambiar(0, ultimo);
    const mayor = this.datos.pop();
    this.bajar(0);

    return mayor;
  }

  verMayor() {
    return this.datos[0];
  }

  construirHeap() {
    const inicio = Math.floor((this.datos.length - 2) / 2);
    for (let i = inicio; i >= 0; i--) {
      this.bajar(i);
    }
  }

  subir() {
    let actual = this.datos.length - 1;

    while (actual > 0) {
      const padre = Math.floor((actual - 1) / 2);
      if (this.datos[actual].reproducciones > this.datos[padre].reproducciones) {
        this.intercambiar(actual, padre);
        actual = padre;
      } else {
        break;
      }
    }
  }

  bajar(indice) {
    let actual = indice;

    while (2 * actual + 1 < this.datos.length) {
      const izq = 2 * actual + 1;
      const der = 2 * actual + 2;

      let mayorHijo = izq;
      if (
        der < this.datos.length &&
        this.datos[der].reproducciones > this.datos[izq].reproducciones
      ) {
        mayorHijo = der;
      }

      if (this.datos[mayorHijo].reproducciones > this.datos[actual].reproducciones) {
        this.intercambiar(actual, mayorHijo);
        actual = mayorHijo;
      } else {
        break;
      }
    }
  }

  intercambiar(i, j) {
    const aux = this.datos[i];
    this.datos[i] = this.datos[j];
    this.datos[j] = aux;
  }

  obtenerTop(cantidad) {
    const copia = new HeapMaximo(this.datos);
    const top = [];
    const total = Math.min(cantidad, copia.datos.length);

    for (let i = 0; i < total; i++) {
      top.push(copia.sacarMayor());
    }

    return top;
  }
}