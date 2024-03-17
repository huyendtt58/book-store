import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`)
        .then((res) => {
            setAuthor(res.data.author);
            setTitle(res.data.title);
            setPublishYear(res.data.publishYear);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            alert('Something is wrong. Please check console!');
            console.log(error);
        })
    }, []);
    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book edited successfully', {variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                // alert('Something wrong, please check console.');
                enqueueSnackbar('Error', {variant: 'error'});
                console.log(error);
            });
    };
  return (
    <div className='p-4'>
        <BackButton />
        <h1 className="text-3x1 my-4">Edit Book</h1>
        {loading ? <Spinner /> : ''}
        <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto">
            <label className="text-x mr-4 text-gray-500">Title</label>
            <input type="text" value={title}
                onChange={(e) => setTitle(e.target.value)}
             className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto">
            <label className="text-x mr-4 text-gray-500">Author</label>
            <input type="text" value={author}
                onChange={(e) => setAuthor(e.target.value)}
             className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto">
            <label className="text-x mr-4 text-gray-500">Publish Year</label>
            <input type="text" value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
             className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Save</button>
    </div>
  )
}

export default EditBook