import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { useParams } from "wouter";
import { Link } from 'wouter';
import { getUserInfo } from '../api/trueque.api';
import CommentList from './CommentList';
import '../styles/PostDetailStyle.css';
import { formatFecha } from '../utils';

function PostDetail() {
    const [post, setPost] = useState(null);
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [comments, setComments] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [sucursal, setSucursal] = useState(null);


    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const token = localStorage.getItem('token');
                const postResponse = await axios.get(`${baseURL}post/${params.postId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                const userInfoResponse = await getUserInfo();
                setPost(postResponse.data);
                setUserInfo(userInfoResponse.data);

                console.log(postResponse.data)
                const sucursalResponse = await axios.get(`${baseURL}sucursal/${postResponse.data.sucursal_destino.id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                setSucursal(sucursalResponse.data);
                console.log(sucursalResponse.data)
                const commentsResponse = await axios.get(`${baseURL}post/${params.postId}/comments_list/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [params.postId]);

    const handleInputChange = (event) => {
        setNuevoComentario(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (nuevoComentario.trim() === '') {
            setErrorMessage('No es posible publicar una pregunta vacía');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseURL}post/${params.postId}/comments/`, {
                contenido: nuevoComentario
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            if (response.status === 201 && response.data) {
                setComments(prevComments => [...prevComments, response.data]);
                setNuevoComentario('');
                setErrorMessage('');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message || 'Algo salió mal');
        }
    };

    const updateComments = (comentarioId, respuesta) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === comentarioId ? { ...comment, respuesta } : comment
            )
        );
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="background-image-published">
            <div className="post-container-detail">
                <div className="post-card">
                    <p className="post-date">{formatFecha(post.fecha)}</p> <h5>Sucursal destino: {sucursal ? `${sucursal.nombre} - ${sucursal.direccion}` : 'Cargando...'}</h5>

                    <hr />
                    <h3>Subido por: {post.usuario_propietario.username}</h3>
                    <h1 className="post-title">{post.titulo}</h1>
                    <p className="post-description">{post.descripcion}</p>
                    {post.imagen && <img src={`http://127.0.0.1:8000${post.imagen}`} alt="Imagen del post" className='imagen-preview-detail' />}
                </div>
                <div className="post-comments">
                    <h2>Comentarios:</h2>
                    <CommentList
                        comments={comments}
                        postId={params.postId}
                        userInfo={userInfo}
                        updateComments={updateComments}
                        postOwnerId={post.usuario_propietario.id}

                    />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                value={nuevoComentario}
                                onChange={handleInputChange}
                                placeholder="Escribe un comentario..."
                                className="input-field-comment"
                                maxLength={200}
                            />
                        </div>
                        <button type="submit" className="comment-button">Enviar</button>
                        <p>Caracteres ingresados: {nuevoComentario.length}/200</p>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </form>
                </div>
            </div>
            <Link to="/SignIn" className={"signin-link-from-postdetail"}>Volver al inicio</Link>
        </div>
    );
}

export default PostDetail;
