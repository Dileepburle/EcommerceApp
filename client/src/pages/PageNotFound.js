import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const PageNotFound = () => {
  return (
    <Layout title={"go back page not found"}>
        <div className='pnf'>
           <h1 className='pnf-title'>404</h1>
           <h1 className='pnf-heading'>oops ! Page Not Found</h1>
           <Link to="/" className='pnf-btn'>
              Go Back
           </Link>
        </div>
    </Layout>
  )
}

export default PageNotFound;
