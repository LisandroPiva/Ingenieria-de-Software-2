import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'wouter';
import { formatFechaSolicitud } from '../utils';
import '../styles/EmployeeView.css';
import { baseURL } from '../api/trueque.api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function EmployeeView() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [trueques, setTrueques] = useState(false);
    const [error, setError] = useState(null);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const isAdminValue = localStorage.getItem('isAdmin');
        if (isAdminValue === 'true') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('userEmail', '');
        window.location.href = '/Login-worker';
    };

    const loadSolicitudes = async () => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const userEmail = localStorage.getItem('userEmail'); // Obtener el email del localStorage
            if (loggedIn === 'true') {
                try {
                    console.log(`${baseURL}employee/solicitudes/`);
                    const response = await axios.get(`${baseURL}employee/solicitudes/`, {
                        headers: {
                            'X-User-Email': userEmail
                        }
                    });
                    console.log(response.data);
                    setSolicitudes(response.data);
                    setTrueques(true); // Asegúrate de activar la visualización de trueques
                    return response.data;
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    setErrorMessage('Error al obtener las solicitudes.');
                    setOpenError(true);
                }
            } else {
                setErrorMessage('Debes iniciar sesión para ver las solicitudes.');
                setOpenError(true);
                setTimeout(() => {
                    window.location.href = '/Login-worker';
                }, 1500);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            setErrorMessage('Error desconocido al obtener las solicitudes.');
            setOpenError(true);
        }
    };

    const loadSolicitudesExitosas = async () => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const userEmail = localStorage.getItem('userEmail');
            if (loggedIn === 'true') {
                try {
                    console.log(`${baseURL}employee/solicitudes/`);
                    const response = await axios.get(`${baseURL}employee/solicitudes/success`, {
                        headers: {
                            'X-User-Email': userEmail
                        }
                    });
                    console.log(response.data);
                    setSolicitudes(response.data);
                    setTrueques(true);
                    return response.data;
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    setErrorMessage('Error al obtener las solicitudes.');
                    setOpenError(true);
                }
            } else {
                setErrorMessage('Debes iniciar sesión para ver las solicitudes.');
                setOpenError(true);
                setTimeout(() => {
                    window.location.href = '/Login-worker';
                }, 1500);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            setErrorMessage('Error desconocido al obtener las solicitudes.');
            setOpenError(true);
        }
    };

    const loadSolicitudesFallidas = async () => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const userEmail = localStorage.getItem('userEmail');
            if (loggedIn === 'true') {
                try {
                    console.log(`${baseURL}employee/solicitudes/`);
                    const response = await axios.get(`${baseURL}employee/solicitudes/failure`, {
                        headers: {
                            'X-User-Email': userEmail
                        }
                    });
                    console.log(response.data);
                    setSolicitudes(response.data);
                    setTrueques(true);
                    return response.data;
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    setErrorMessage('Error al obtener las solicitudes.');
                    setOpenError(true);
                }
            } else {
                setErrorMessage('Debes iniciar sesión para ver las solicitudes.');
                setOpenError(true);
                setTimeout(() => {
                    window.location.href = '/Login-worker';
                }, 1500);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            setErrorMessage('Error desconocido al obtener las solicitudes.');
            setOpenError(true);
        }
    };

    const loadSolicitudesDelDia = async () => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const userEmail = localStorage.getItem('userEmail');
            if (loggedIn === 'true') {
                try {
                    console.log(`${baseURL}employee/solicitudes/today/`);
                    const response = await axios.get(`${baseURL}employee/solicitudes/today/`, {
                        headers: {
                            'X-User-Email': userEmail
                        }
                    });
                    console.log(response.data);
                    setSolicitudes(response.data);
                    setTrueques(true); // Asegúrate de activar la visualización de trueques
                    return response.data;
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    setErrorMessage('Error al obtener las solicitudes.');
                    setOpenError(true);
                }
            } else {
                setErrorMessage('Debes iniciar sesión para ver las solicitudes de hoy.');
                setOpenError(true);
                setTimeout(() => {
                    window.location.href = '/Login-worker';
                }, 1500);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            setErrorMessage('Error desconocido al obtener las solicitudes.');
            setOpenError(true);
        }
    };

    const handlePublicaciones = async () => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const isAdminValue = localStorage.getItem('isAdmin');
            if (loggedIn === 'true' && isAdminValue === 'true') {
                window.location.href = '/PostList';
            } else {
                setErrorMessage('Debes iniciar sesión para ver las publicaciones.');
                setOpenError(true);
                setTimeout(() => {
                    window.location.href = '/Login-worker';
                }, 1500);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            setErrorMessage('Error desconocido al redirigir a ver publicaciones.');
            setOpenError(true);
        }
    };

    const handleEmpleados = async () => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const isAdminValue = localStorage.getItem('isAdmin');
            if (loggedIn === 'true' && isAdminValue === 'true') {
                window.location.href = '/adminview/employees';
            } else {
                setErrorMessage('Debes iniciar sesión para ver los empleados.');
                setOpenError(true);
                setTimeout(() => {
                    window.location.href = '/Login-worker';
                }, 1500);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            setErrorMessage('Error desconocido al redirigir a ver empleados.');
            setOpenError(true);
        }
    };

    const handleSucursales = async () => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const isAdminValue = localStorage.getItem('isAdmin');
            if (loggedIn === 'true' && isAdminValue === 'true') {
                window.location.href = '/adminview/sucursales';
            } else {
                setErrorMessage('Debes iniciar sesión para ver las sucursales.');
                setOpenError(true);
                setTimeout(() => {
                    window.location.href = '/Login-worker';
                }, 1500);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            setErrorMessage('Error desconocido al redirigir a ver sucursales.');
            setOpenError(true);
        }
    };

    const handleUsuarios = async () => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const isAdminValue = localStorage.getItem('isAdmin');
            if (loggedIn === 'true' && isAdminValue === 'true') {
                window.location.href = '/adminview/Users';
            } else {
                setErrorMessage('Debes iniciar sesión para ver a los usuarios.');
                setOpenError(true);
                setTimeout(() => {
                    window.location.href = '/Login-worker';
                }, 1500);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            setErrorMessage('Error desconocido al redirigir a ver a los usuarios.');
            setOpenError(true);
        }
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    return (
        <div className="employee-panel">
            <div className="employee-navigation-bar">
                <div>
                    {isAdmin ? (
                        <div className='admin-elements'>
                            <h1 className="admin-nav-titulo"> Panel de administrador </h1>
                            <hr className='employee-separador' style={{ borderBlockColor: '#5050ff' }} />

                            <button className="admin-nav-button" onClick={handleLogout}>Cerrar Sesión</button>
                            <button className="admin-nav-button" onClick={loadSolicitudes}>Ver Trueques activos</button>
                            <button className="admin-nav-button" onClick={loadSolicitudesDelDia}>Ver Trueques del día</button>
                            <button className="admin-nav-button" onClick={loadSolicitudesExitosas}>Ver trueques exitosos</button>
                            <button className="admin-nav-button" onClick={loadSolicitudesFallidas}>Ver trueques fallidos</button>
                            {/*<button className="admin-nav-button" onClick={loadVentas}>Ver ventas</button>*/}
                            <button className="admin-nav-button" onClick={handlePublicaciones}>Ver publicaciones</button>
                            <button className="admin-nav-button" onClick={handleUsuarios}>Ver usuarios</button>
                            <button className="admin-nav-button" onClick={handleEmpleados}>Ver empleados</button>
                            <button className="admin-nav-button" onClick={handleSucursales}>Ver sucursales</button>
                        </div>
                    ) : (
                        <div className='employee-elements'>
                            <h1 className="employee-nav-titulo"> Panel de empleado </h1>
                            <hr className='employee-separador' style={{ borderBlockColor: '#2bb469' }} />

                            <button className="employee-nav-button" onClick={handleLogout}>Cerrar Sesión</button>
                            <button className="employee-nav-button" onClick={loadSolicitudes}>Ver Trueques activos</button>
                            <button className="employee-nav-button" onClick={loadSolicitudesDelDia}>Ver Trueques del día</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="employee-elements">
                {trueques && (
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>1er Articulo</th>
                                <th>2do Articulo</th>
                                <th>Fecha del trueque</th>
                                <th>Truequeros</th>

                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map((solicitud) => (
                                <tr key={solicitud.id}>
                                    <td>
                                        {solicitud.publicacion_a_intercambiar.titulo}
                                    </td>
                                    <td>
                                        {solicitud.publicacion_deseada.titulo}
                                    </td>
                                    <td>{formatFechaSolicitud(solicitud.fecha_del_intercambio)}</td>
                                    <td>
                                        {solicitud.publicacion_a_intercambiar.usuario_propietario.email} - {solicitud.publicacion_deseada.usuario_propietario.email}

                                    </td>
                                    <Link href={`/tradeCheck/${solicitud.id}`}>
                                        <button className="employee-gestionar-button employee-gestionar-button-margin">Gestionar Trueque</button>
                                    </Link>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseError} severity="error">
                    {errorMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default EmployeeView;
