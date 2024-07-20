import React, { useEffect, useState } from 'react';
import axios from '../../Axios'

const Sidebar = ({ isSidebarOpen, load, handleEdit }) => {

  const [rows, setRows] = useState([])

  const handleLogout = async () => {

    const refresh_token = JSON.parse(localStorage.getItem('refresh'))
    const access = JSON.parse(localStorage.getItem('access'))

    try {
      await axios.post('logout/', { refresh_token: refresh_token }, {
        headers: {
          'Authorization': `Bearer ${access}`
        }
      })
      localStorage.clear()
      window.location.href = '/login'
    } catch (error) {
      console.log(error)
    }

  }

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this note?');

    if (!userConfirmed) {
      return;
    }
    
    const access = JSON.parse(localStorage.getItem('access'))
    try {
      const res = await axios.delete(`notes/${id}/`, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      })
      console.log(res.data)
      fetch()
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const fetch = async () => {
    const access = JSON.parse(localStorage.getItem('access'))

    try {
      const res = await axios.get('notes/', {
        headers: {
          'Authorization': `Bearer ${access}`
        }
      })
      setRows(res.data)
    } catch (error) {
      console.log(error.reponse.data)
    }
  }

  useEffect(() => {
    fetch()
  }, [load])



  return (
    <div id="view" className="h-full flex flex-row">

      <div
        id="sidebar"
        className={`bg-white h-screen shadow-xl px-3 w-44 md:w-60 lg:w-96 overflow-x-hidden transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >

        <div className="space-y-6 md:space-y-10 mt-24">
          <button
            onClick={handleLogout}
            className="justify-end p-2 border-2 hover:bg-gray-700 text-gray-500 hover:text-white rounded-md border-gray-200   absolute top-10 right-8 "
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 17V15H7V9H16V7L21 12L16 17ZM14 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H14C15.1 22 16 21.1 16 20V17H14V20H4V4H14V7H16V4C16 2.9 15.1 2 14 2Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div id="menu" className="flex flex-col space-y-2">
            {rows.map((row) => (
              <div key={row.id}
                className="flex justify-between text-sm font-medium cursor-pointer text-green-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
              >
                <p className="max-w-xs truncate overflow-hidden whitespace-nowrap" onClick={() => { handleEdit(row.id) }}>
                  <span>
                    {row.title}
                  </span>
                </p>
                <div className="flex">
                  {/* <div className="px-1 md:px-3" >
                    <svg
                      className="w-6 h-6 fill-current inline-block"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.414 2.586a2 2 0 00-2.828 0L5 12.172V15h2.828l9.586-9.586a2 2 0 000-2.828zM14.5 4.5l1 1L6.828 14H5v-1.828L14.5 4.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4 17a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div> */}
                  <div className="px-1 md:px-3" onClick={() => { handleDelete(row.id) }}>
                    <svg
                      className="w-6 h-6 fill-current inline-block"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.5 2a1 1 0 00-1 1V3H4a1 1 0 100 2h12a1 1 0 100-2h-1.5v-1a1 1 0 00-1-1h-5zM4.285 6l.956 10.57a2 2 0 001.99 1.857h5.538a2 2 0 001.99-1.857L15.714 6H4.285z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
