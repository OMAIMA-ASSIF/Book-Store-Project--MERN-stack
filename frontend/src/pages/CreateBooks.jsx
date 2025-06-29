import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {useSnackbar} from 'notistack'

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar} = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.post(`http://localhost:5555/books`, data)
    .then(()=> {
      setLoading(false);
      enqueueSnackbar('the book is created successfully', {variant: 'success'});
      navigate('/');
    }).catch((err)=> {
      setLoading(false)
      // alert('An error happened, check your console');
      enqueueSnackbar('Error', {variant: 'error'})
      console.log(err.message)
    })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-2xl font-bold text-center mb-6 text-blue-900'> Create a book</h1>
      {loading? <Spinner/>: ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-2xl w-120 p-4 mx-auto bg-blue-00'>
        <div className='my-4'>
          <label className='text-md mr-4 text-gray-500 '>Title</label>
          <input 
          type='text' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className='border-2 border-gray-500 px-4 py-2 w-full rounded-2xl my-2'
          />
        </div>
        <div className='my-4'>
          <label className='text-md mr-4 text-gray-500'>Author</label>
          <input 
          type='text' 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          className='border-2 border-gray-500 px-4 py-2 w-full rounded-2xl my-2'
          />
        </div> 
        <div className='my-4'>
          <label className='text-md mr-4 text-gray-500 '>Publish year</label>
          <input 
          type='number' 
          value={publishYear} 
          onChange={(e) => setPublishYear(e.target.value)} 
          className='border-2 border-gray-500 px-4 py-2 w-full rounded-2xl my-2'
          />
        </div>
        <button className='p-2 bg-blue-300 m-5 rounded-2xl w-40 text-blue-900 font-bold cursor-pointer' onClick={handleSaveBook}>Save</button>
      </div>
    </div>
  )
}

export default CreateBooks
