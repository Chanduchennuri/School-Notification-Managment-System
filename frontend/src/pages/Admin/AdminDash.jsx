import React from 'react'
import Layout from './components/Layout';

function AdminDash({user}) {
  console.log(user)
  return (
    <Layout>
      <div className='bg-white items-center justify-center m-8 mb-0 flex rounded-lg'>
        <p className='p-4 text-2xl font-semibold'>{user?.google?.emails[0]?.value}</p>
      </div>
      <div className='bg-white flex-1 m-8 flex rounded-lg'>

      </div>
    </Layout>
  )
}

export default AdminDash;