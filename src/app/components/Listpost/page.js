// src/app/components/Listpost/page.js

"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function ListPost() {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState('-published_at');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [pageNumber, pageSize, sortOrder]);

  const fetchPosts = async () => {
    const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
      params: {
        'page[number]': pageNumber,
        'page[size]': pageSize,
        'append[]': ['small_image', 'medium_image'],
        'sort': sortOrder,
      }
    });

    setPosts(response.data.data);
    setTotalPages(Math.ceil(response.data.meta.total / pageSize));
  };

  console.log(posts);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setPageNumber(1); // Reset to first page when page size changes
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const maxVisiblePages = 6;

  const getVisiblePages = () => {
    let start = Math.max(0, pageNumber - Math.ceil(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages);

    if (end - start < maxVisiblePages) {
      start = Math.max(0, end - maxVisiblePages);
    }

    return [...Array(totalPages).keys()].slice(start, end);
  };

  // Define a loader function
  const myLoader = ({ src }) => {
    return src;
  };

  return (
    <div className="mt-20 w-full sm:w-[80%] mx-auto px-4 py-0 sm:py-8 border-0">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div>
          <p>Showing {pageSize * (pageNumber - 1) + 1} - {Math.min(pageSize * pageNumber, pageSize * totalPages)} of {pageSize * totalPages}</p>
        </div>

        <div className="mt-1 w-full sm:w-fit flex flex-row justify-center items-center space-x-4 border-0">
          <div className='flex flex-col sm:flex-row justify-center sm:justify-between border-0 items-center gap-x-5 text-sm text-center'>
            <p className='text-[15px]'>Show per page:</p>
            <select className="border-2 rounded-full border-gray-300 pl-3 py-2 pr-5" value={pageSize} onChange={handlePageSizeChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className='flex flex-col sm:flex-row justify-center sm:justify-between border-0 items-center gap-x-5 text-sm text-center'>
            <p className='text-[15px]'>Sort by: </p>
            <select className="border-2 border-gray-300 pl-3 py-2 pr-5 rounded-full" value={sortOrder} onChange={handleSortChange}>
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>


      </div>

      {/* Post Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white shadow-xl rounded overflow-hidden">
            <div className="relative w-full h-48">
              <Image
                loader={myLoader}
                src={
                  post.medium_image && post.medium_image.length > 0 ? post.medium_image[0].url : 
                  post.small_image && post.small_image.length > 0 ? post.small_image[0].url : 
                  '/banner.png'
                }
                alt={post.title || 'Post Image'}
                width={20}
                height={20}
                className="lazyload"
              />
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-500">{new Date(post.published_at).toLocaleDateString()}</p>
              <h2 className="text-lg font-semibold mb-2 line-clamp-3">{post.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* page */}
      <div className="flex flex-row justify-between sm:justify-center items-center mt-14 mb-5 border-0 mx-auto w-full sm:w-1/2">
        <button className="p-2" disabled={pageNumber <= 1} onClick={() => handlePageChange(pageNumber - 1)}>&laquo;</button>

        <div className="flex justify-center items-center overflow-auto w-full sm:max-w-[40%]">
          {getVisiblePages().map(page => (
            <button key={page} className={`text-sm shrink-0 border-0 p-2 px-3 ${page + 1 === pageNumber ? 'bg-orange-500 text-white rounded-lg' : ''}`} onClick={() => handlePageChange(page + 1)}
            >{page + 1}</button>
          ))}
        </div>

        <button className="p-2 rounded" disabled={pageNumber >= totalPages} onClick={() => handlePageChange(pageNumber + 1)}>&raquo;</button>
      </div>
    </div>
  );
}
