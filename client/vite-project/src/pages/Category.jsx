import React, { useState } from 'react'
import UploadCategoryModel from '../components/uploadCategoryModel'

const Category = () => {
    const [openCategoryModel, setOpenCategoryModel] = useState(false)
  return (
    <section>
        <div className='p-2 bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Category</h2>
            <button onClick={()=> setOpenCategoryModel(true)} className='text-sm border border-yellow-400 hover:bg-amber-400 px-3 py-1 rounded '>Add Category</button>
        </div>
        {
            openCategoryModel && (
                <UploadCategoryModel close={()=> setOpenCategoryModel(false)}/>
            )
        }
    </section>
  )
}

export default Category