
import { useState } from 'react';
import { useSerieslist } from './Service/serieService'
import { show_alert } from '../functions'
import axios from 'axios';




const ShowSeries = () => {


    const { data, idSeries } = useSerieslist();
    const [idSerie, setIdSerie] = useState();
    const [nombre, setNombre] = useState();
    const [genero, setGenero] = useState();
    const [anioEstreno, setAnioEstreno] = useState();
    const [numeroTemporadas, setNumeroTemporadas] = useState();
    const [estado, setEstado] = useState();
    const [descripcion, setDescripcion] = useState();
    const [title, setTitlle] = useState();
    const [operation, setOperation] = useState();





    const openModal = (op,idSerie,nombre, descripcion, numeroTemporadas, genero, anioEstreno) => {

        setTitlle('')
        setIdSerie('')
        setNombre('');
        setDescripcion('');
        setNumeroTemporadas('');
        setGenero('');
        setAnioEstreno('');
        setEstado('');
        setOperation(op);
        if (op == 1) {
            setTitlle('registrar serie')
        }
        else if (op == 2) {
            setTitlle('editar serie')
            setIdSerie(idSerie);
            setNombre(nombre);
            setDescripcion(descripcion);
            setNumeroTemporadas(numeroTemporadas);
            setGenero(genero);
            setAnioEstreno(anioEstreno);
            setEstado(estado);

        }
        window.setTimeout(function () {
            document.getElementById('nombre').focus();
        }, 500)
    }

    const validar = () => {
        var parametros;
        var metodo;
        var url;
        if (idSerie.trim() === '') {
            show_alert('Escribe el nombre de la serie', 'warning')
        }
        if (idSeries.includes(idSerie)) {
            console.log('entro')
            show_alert('Ya exite este id', 'warningg')
        }

        if (nombre.trim() === '') {
            show_alert('Escribe el nombre de la serie', 'warning')
        }
        else if (descripcion.trim() === '') {
            show_alert('Escribe la descripcion de la serie', 'warning')
        }
        else if (!numeroTemporadas) {
            show_alert('Escribe las temporadas de la serie', 'warning')
        }
        else if (genero.trim() === '') {
            show_alert('Escribe el genero de la serie', 'warning')
        }
        else if (descripcion.trim() === '') {
            show_alert('Escribe la descripcion de la serie', 'warning')
        }
        else if (descripcion.trim() === '') {
            show_alert('Escribe el año de estreno de la serie', 'warning')
        } else if (operation === 1) {
            url = 'http://localhost:5026/api/Series/GuardarSeries'
            parametros = {
               idSerie, nombre: nombre.trim(), descripcion: descripcion.trim(), numeroTemporadas: numeroTemporadas.trim(),
                genero: genero.trim(), anioEstreno: anioEstreno.trim()

            }

            metodo = 'POST'
        } else {

            url = 'http://localhost:5026/api/Series/EditarSeries'
            parametros = {
                idSerie,  nombre: nombre.trim(), descripcion: descripcion.trim(), numeroTemporadas: numeroTemporadas.trim(),
                genero: genero.trim(), anioEstreno: anioEstreno.toString().trim()
            }
            metodo = 'PUT'
        }
        enviarsolicitud(metodo, parametros, url);
    }
    


    const enviarsolicitud = async (metodo, parametros, url) => {

        console.log('Data1:', parametros);
        await axios({ method: metodo, url: url, data: parametros }).then(function (result) {
            var tipo = result.data[0];
            var msj = result.data[1];

            show_alert(msj, tipo)
            if (tipo === 'success') {
                
                document.getElementById('btncerrar').click();

            }
        }).catch((error) => {
            show_alert('Error', 'error')
            console.log(error)
        });;

    }
    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modal'>
                                <i className='fa-solid fa-circle-plus'></i> añadir
                            </button>
                        </div>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#ID</th><th>NOMBRE</th><th>GENERO</th><th>DESCRIPCION</th><th>TEMPORADAS</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {data && Array.isArray(data.response) && data.response.map((serie, i) => (
                                        <tr key={serie.idSerie}>
                                            <td>{serie.idSerie}</td>
                                            <td>{serie.nombre}</td>
                                            <td>{serie.genero}</td>
                                            <td>{serie.descripcion}</td>
                                            <td>{serie.numeroTemporadas}</td>
                                            <td>
                                                <button onClick={() => openModal(2, serie.idSerie, serie.nombre, serie.descripcion, serie.numeroTemporadas, serie.genero, serie.anioEstreno)}
                                                    className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modal'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button className='btn btn-warning'>
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className='modal fade' id='modal' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>{title}</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id' value={idSerie}></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-message'></i>
                                </span>
                                <input type='number' id='idserie' className='form-control' placeholder='idserie' value={idSerie} onChange={(e) => setIdSerie(e.target.value)} ></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-message'></i>
                                </span>
                                <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-pencil'></i>
                                </span>
                                <input type='text' id='descripcion' className='form-control' placeholder='descripcion' value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-book'></i>
                                </span>
                                <input type='number' id='nombre' className='form-control' placeholder='Temporadas' value={numeroTemporadas} onChange={(e) => setNumeroTemporadas(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-question'></i>
                                </span>
                                <input type='text' id='nombre' className='form-control' placeholder='genero' value={genero} onChange={(e) => setGenero(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'>
                                    <i className='fa-solid fa-splotch'></i>
                                </span>
                                <input type='number' id='nombre' className='form-control' placeholder='Año de estreno' value={anioEstreno} onChange={(e) => setAnioEstreno(e.target.value)}></input>


                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={() => validar()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i>
                                </button>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary'
                                id='btncerrar' data-bs-dismiss='modal'>cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default ShowSeries;
