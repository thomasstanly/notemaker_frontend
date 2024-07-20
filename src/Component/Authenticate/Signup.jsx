import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from '../../Axios'
import './Style.css'



const Signup = () => {

   const [Show1, setShow1] = useState(false)
   const [Show2, setShow2] = useState(false)

   const toggle = (value) => {
      if (value === 1) {
         setShow1(prevState => !prevState);
      }
      else {
         setShow2(prevState => !prevState);
      }

   }
   const [formdata, setFormdata] = useState({
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      password2: "",
      phone_number: ""
   })

   const navigate = useNavigate()


   const handleOnchange = (e) => {
      setFormdata({ ...formdata, [e.target.name]: e.target.value })
   }
   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!formdata.username.trim() || !formdata.first_name.trim() || !formdata.last_name.trim()) {
         return toast.success('all fields are required')

      }
      else if (!/^[a-zA-Z0-9]+$/.test(formdata.username.trim())) {
         return toast.warning("Username can only contain letters and numbers.");
      }
      else if (!/^[A-Za-z]+$/.test(formdata.first_name.trim())) {
         return toast.warning('First name can only contain letters')
      }
      else if (!/^[A-Za-z]+$/.test(formdata.last_name.trim())) {
         return toast.warning('Last name can only contain letters')
      }
      else if (!formdata.password.trim() || !formdata.password2.trim()) {
         return toast.warning('password required')
      }
      else if (formdata.password !== formdata.password2) {
         return toast.warning('password not matching')
      }
      else if (formdata.password.length < 6) {
         console.log(formdata.password.length)
         return toast.warning('password min length 6')
      }
      else if (!/^\d{10}$/.test(formdata.phone_number.trim())) {
         toast.error("Phone number should be exactly 10 digits.");
         return;
      }

      else if (!/^\d+$/.test(formdata.phone_number.trim())) {
         toast.error("Phone number should contain only digits");
         return;
      }

      else if (/^(.)\1{9}$/.test(formdata.phone_number.trim())) {
         toast.error("Phone number cannot be all the same digit.");
         return;
      }
      else {
         console.log(formdata)
         try {
            await axios.post("signup/", formdata)
            toast.success('Account created successfully')
            navigate('/login')

         } catch (error) {
            if (error.response.status === 400) {
               console.log(error.response.data)
               if (error.response.data.username?.[0] && error.response.data.phone_number?.[0]) {
                  toast.warning(error.response.data.username[0])
                  toast.warning(error.response.data.phone_number[0])
               } else if (error.response.data.username?.[0] && error.response.data.non_field_errors?.[0]) {
                  toast.warning(error.response.data.username[0])
                  toast.warning(error.response.data.non_field_error[0])
               } else if (error.response.data.username?.[0]) {
                  toast.warning(error.response.data.username[0])
               } else if (error.response.data.phone_number?.[0]) {
                  toast.warning(error.response.data.phone_number[0])
               } else {
                  toast.warning(error.response.data.non_field_errors[0])
               }

            }
            else {
               console.log(error);

            }
         }
      }

   }

   return (
      <div>
         <div className='Container'>
            <div className='row'>
               <span>Register</span>
               <form action="" onSubmit={handleSubmit}>
                  <div className='username'>
                     <label className='label' htmlFor="">username</label>
                     <input className='form-control' type="text" value={formdata.username} name='username' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label' htmlFor="">First Name</label>
                     <input className='form-control' type="text" value={formdata.first_name} name='first_name' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Last Name</label>
                     <input className='form-control' type="text" value={formdata.last_name} name='last_name' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Phone Number</label>
                     <input className='form-control' type="number" value={formdata.phone_number} name='phone_number' onChange={handleOnchange} />
                  </div>
                  <div>
                     <label className='label' htmlFor="">Password</label>
                     <input className='form-control' type={Show1 ? "text" : "password"} value={formdata.password} name='password' onChange={handleOnchange} />
                     {Show1 ? <FaEye className='eye' onClick={() => toggle(1)} /> : <FaEyeSlash className='eye' onClick={() => toggle(1)} />}
                  </div>
                  <div>
                     <label className='label' htmlFor="">Confirm Password</label>
                     <input className='form-control' type={Show2 ? "text" : "password"} value={formdata.password2} name='password2' onChange={handleOnchange} />
                     {Show2 ? <FaEye className='eye' onClick={() => toggle(2)} /> : <FaEyeSlash className='eye' onClick={() => toggle(2)} />}
                  </div>
                  <div>
                     <button className='form-control' type='submit'>SignUp</button>
                  </div>

               </form>
               <div>
                  <p onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Already have an account? login</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Signup
