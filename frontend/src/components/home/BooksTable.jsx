import React from 'react';
import {Link} from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({books}) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr className="bg-blue-900 text-slate-200">
          <th className="p-2 border border-slate-600 rounded-md">No</th>
          <th className="p-2 border border-slate-600 rounded-md">Title</th>
          <th className="p-2 border border-slate-600 rounded-md max-md:hidden">Author</th>
          <th className="p-2 border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
          <th className="p-2 border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr 
            key={book._id} 
            className="h-10 hover:bg-slate-100 transition-colors duration-150"
          >
            <td className="p-2 border border-slate-300 rounded-md text-center">
              {index + 1}
            </td>
            <td className="p-2 border border-slate-300 rounded-md text-center font-medium">
              {book.title}
            </td>
            <td className="p-2 border border-slate-300 rounded-md text-center max-md:hidden">
              {book.author}
            </td>
            <td className="p-2 border border-slate-300 rounded-md text-center max-md:hidden">
              {book.publishYear}
            </td>
            <td className="p-2 border border-slate-300 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link 
                  to={`/books/details/${book._id}`} 
                  className="hover:scale-110 transition-transform"
                >
                  <BsInfoCircle className="text-2xl text-green-600 hover:text-green-800" />
                </Link>
                <Link 
                  to={`/books/edit/${book._id}`} 
                  className="hover:scale-110 transition-transform"
                >
                  <AiOutlineEdit className="text-2xl text-yellow-500 hover:text-yellow-700" />
                </Link>
                <Link 
                  to={`/books/delete/${book._id}`} 
                  className="hover:scale-110 transition-transform"
                >
                  <MdOutlineDelete className="text-2xl text-red-500 hover:text-red-700" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BooksTable
