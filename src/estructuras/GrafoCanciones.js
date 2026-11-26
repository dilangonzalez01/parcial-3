export class GrafoCanciones {
  constructor() {
    this.nodos = [];
    this.adyacencia = {};
  }

  agregarNodo(cancion) {
    if (!this.buscarNodo(cancion)) {
      this.nodos.push(cancion);
      this.adyacencia[cancion] = [];
    }
  }

  buscarNodo(cancion) {
    if (this.nodos.length === 0) return undefined;
    return this.nodos.find((n) => n === cancion);
  }

  conectar(cancionA, cancionB) {
    if (!this.buscarNodo(cancionA)) this.agregarNodo(cancionA);
    if (!this.buscarNodo(cancionB)) this.agregarNodo(cancionB);

    if (!this.adyacencia[cancionA].includes(cancionB)) {
      this.adyacencia[cancionA].push(cancionB);
    }
    if (!this.adyacencia[cancionB].includes(cancionA)) {
      this.adyacencia[cancionB].push(cancionA);
    }
  }

  obtenerRelacionadas(cancion) {
    if (!this.buscarNodo(cancion)) return [];
    return this.adyacencia[cancion];
  }
}