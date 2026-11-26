import { useMemo, useState } from "react";
import { ArbolPrefijos } from "./estructuras/ArbolPrefijos";
import { HeapMaximo } from "./estructuras/HeapMaximo";
import { GrafoCanciones } from "./estructuras/GrafoCanciones";
import { cancionesIniciales, relacionesCanciones } from "./datos/canciones";
import "./estilos/panel.scss";

export default function App() {
  const [vista, setVista] = useState("inicio"); // "inicio" | "mas-escuchadas"
  const [busqueda, setBusqueda] = useState("");
  const [cancionActiva, setCancionActiva] = useState("DtMF");

  const { arbol, heap, grafo } = useMemo(() => {
    const nuevoArbol = new ArbolPrefijos();
    const nuevoHeap = new HeapMaximo();
    const nuevoGrafo = new GrafoCanciones();

    for (const cancion of cancionesIniciales) {
      nuevoArbol.insertar(cancion);
      nuevoHeap.agregar(cancion);
      nuevoGrafo.agregarNodo(cancion.titulo);
    }

    for (const [origen, destino] of relacionesCanciones) {
      nuevoGrafo.conectar(origen, destino);
    }

    return {
      arbol: nuevoArbol,
      heap: nuevoHeap,
      grafo: nuevoGrafo,
    };
  }, []);

  const sugerencias =
    busqueda.trim() === "" ? [] : arbol.sugerirPorPrefijo(busqueda);
  const topCanciones = heap.obtenerTop(9);
  const relacionadas = grafo.obtenerRelacionadas(cancionActiva);

  return (
    <div className="app-spotify">
      <div className="app-spotify__cabecera">
        <h1 className="app-spotify__titulo">Spotify</h1>

        <div className="app-spotify__acciones">
          {vista === "inicio" ? (
            <button
              type="button"
              className="app-spotify__boton"
              onClick={() => setVista("mas-escuchadas")}
            >
              Más escuchadas
            </button>
          ) : (
            <button
              type="button"
              className="app-spotify__boton app-spotify__boton--secundario"
              onClick={() => setVista("inicio")}
            >
              Volver a inicio
            </button>
          )}
        </div>
      </div>

      {vista === "inicio" ? (
        <>
          <div className="app-spotify__buscador">
            <label htmlFor="campo-busqueda">Buscar canción</label>
            <input
              id="campo-busqueda"
              type="text"
              placeholder="Escribe un prefijo, ej: dt, nue, a ca..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            {sugerencias.length > 0 && (
              <ul className="app-spotify__sugerencias">
                {sugerencias.map((cancion) => (
                  <li
                    key={cancion.id}
                    onClick={() => {
                      setCancionActiva(cancion.titulo);
                      setBusqueda(cancion.titulo);
                    }}
                  >
                    <strong>{cancion.titulo}</strong>
                    <span>{cancion.artista}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="app-spotify__relacionadas">
            <h2>Relacionadas con {cancionActiva}</h2>
            {relacionadas.length === 0 ? (
              <span>No hay canciones relacionadas.</span>
            ) : (
              <ul>
                {relacionadas.map((item) => (
                  <li key={item} onClick={() => setCancionActiva(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <div className="app-spotify__ranking">
          <div className="app-spotify__ranking-encabezado">
            <h2>Más escuchadas</h2>
            <button
              type="button"
              className="app-spotify__boton app-spotify__boton--secundario"
              onClick={() => setVista("inicio")}
            >
              Volver
            </button>
          </div>

          <ol>
            {topCanciones.map((cancion) => (
              <li
                key={cancion.id}
                onClick={() => {
                  setCancionActiva(cancion.titulo);
                  setVista("inicio");
                }}
              >
                <div>
                  <strong>{cancion.titulo}</strong>{" "}
                  <span className="app-spotify__tema-pista">
                    — {cancion.artista}
                  </span>
                </div>
                <strong>{cancion.reproducciones} reprod.</strong>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}GPUBindGroup