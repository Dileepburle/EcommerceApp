import React from 'react'
import Layout from './../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About us -Ecommerce App"}>
      <div className='row contactus'>
        <div className='col-md-6'>
         <img 
           src='/images/about.jpg'
           alt='contactus'
           style={{ width: "100%" }}
         />
        </div>
        <div className='col-md-4'>
          <p>
          Ecommerce is a method of buying and selling goods and services online. 
          The definition of ecommerce business can also include tactics like affiliate marketing. 
          You can use ecommerce channels such as your own website,
           an established selling website like Amazon, or social media to drive online sales.

          </p>

        </div>
      </div>
    </Layout>
  );
};

export default About
