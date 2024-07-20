import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from '../../Axios'

const InputArea = ({ setLoad, update, setUpdate }) => {

   const [formData, setFormDate] = useState({
      title: '',
      description: '',
   })

   const handleOnChange = (e) => {
      setFormDate({ ...formData, [e.target.name]: e.target.value })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      if (!formData.title.trim() && !formData.description.trim()){
         return toast.error('Empty note')
      }
      if(!formData.title.trim()){
         return toast.error('Title is required')
      }
      if (!formData.description.trim()){
         return toast.error('Description is required')
      }
      const token = JSON.parse(localStorage.getItem('access'));
      try {
         const response = update
            ? await axios.put(`notes/${update.id}/`, formData, {
               headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               }
            })
            : await axios.post('notes/', formData, {
               headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               }
            });
         const result = update ? 'updated' : 'created'
         console.log(`Note ${result} successfully`, response.data);
         toast.success(`Note ${result} successfully`)
         setFormDate({
            title: '',
            description: '',
         })
         setLoad(true)
         setUpdate(null)
      } catch (error) {
         console.error('Error creating note:', error.response ? error.response.data : error.message);
      }

   }

   const handleCancel = () => {
      setFormDate({
         title: '',
         description: ''
      })
      setUpdate(null)
   }

   useEffect(() => {
      if (update) {
         setFormDate({
            title: update.title || '',
            description: update.description || '',
         });
      }
   }, [update]);
   return (
      <>
         <form onSubmit={handleSubmit}>
            <div className="bg-indigo-50 h-screen md:px-20 pt-6">
               <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
                  <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">ADD NOTE</h1>
                  <div className="space-y-4">
                     <div>
                        <label htmlFor="title" className="text-lx font-serif">Title:</label>
                        <input value={formData.title} name='title' type="text" placeholder="title" id="title" className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                           onChange={handleOnChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="description" className="block mb-2 text-lg font-serif">Description:</label>
                        <textarea id="description" cols="30" rows="10" value={formData.description} name='description' placeholder="whrite here.." className="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
                           onChange={handleOnChange}
                        ></textarea>
                     </div>
                     <div className='flex justify-center gap-10'>
                        <button
                           type="submit"
                           className="px-6 py-2 rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600"
                        >
                           {update ? 'Update' : 'Save'}
                        </button>
                        {update && (
                           <button
                              type="button"
                              onClick={handleCancel}
                              className="px-6 py-2 rounded-md text-lg font-semibold text-gray-600 bg-gray-300"
                           >
                              Cancel
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </>
   )
}

export default InputArea