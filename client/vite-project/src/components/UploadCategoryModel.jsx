import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import uploadImage from '../utils/UploadImage'
const UploadCategoryModel = ({close}) => {
    const [data, setData] = useState({
        name : "",
        image : ""
    })

    const handleOnChange =(e)=> {
        const {name, value} = e.target

        setData((prev)=> {
            return {
                ...prev,
                [name] : value
            }
        })
    }
    const handleSubmit =(e)=> {
        e.preventDefault()
    }
    const handleUploadCategory = async(e)=>{
        const file = e.target.files[0]

        if(!file) {
            return
        }

        const uploadImage = await uploadImage
    }

  return (
    <section className='fixed top-0 bottom-0  left-0 right-0 bg-neutral-800 opacity-60 p-4 flex items-center justify-center'>
        <div className='bg-white max-w-4xl w-full p-4 rounded'>
            <div className='flex items-center justify-center'>
                <h1 className='font-semibold'>Category</h1>
                <button className='w-fit block ml-auto'>
                    <IoClose className='cursor-pointer' onClick={close} size={25}/>
                </button>
            </div>
            <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor='categoryName'>Name</label>
                    <input type='text' id='categoryName' placeholder='Enter Category name'
                    name='name'
                    value={data.name}
                    onChange={handleOnChange}
                    className='bg-blue-50 p-2 border border-blue-100 focus-within:border-amber-400 outline-none rounded'
                    />
                </div>
                <div>
                    <p>Image</p>
                    <div className='flex gap-6 flex-wrap items-center justify-center flex-col lg:flex-row'>
                    <div className='border bg-blue-50 h-40 w-full lg:w-36 outline-none border-amber-400 flex items-center justify-center rounded'>
                        <p className='text-sm text-neutral-600'>No Image</p>
                    </div>
                    <label htmlFor='UploadCategoryImage'>
                    <div disabled={!data.name} className={`
                        ${!data.name  ? "bg-gray-400" : "bg-yellow-400"}
                        px-4 py-2 rounded
                        
                        `}>Upload Image</div>
                        <input 
                        onChange={handleUploadCategory}
                        id='UploadCategoryImage' className='hidden' type='file'/>
                    </label>
                    
                    </div>
                </div>
            </form>
        </div>
    </section>
  )
}

export default UploadCategoryModel