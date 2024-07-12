import React from 'react';
import TopMenu from '../TopMenu';
import Footer from '../Footer';

const Page = () => {
  return (
    <section>
      <TopMenu />
      <div className='p-20'>
        <h1>Contact Us !</h1>
        <h2 style={{ textAlign: 'center' }}>Welcome to <span id="W_Name"> Sound Bite</span>!</h2>

        <p style={{ fontSize: '17px' }}>Please email us if you have any queries about the site, advertising, or anything else.</p>

        <div style={{ textAlign: 'center' }}>
          <img 
            alt="contact-us" 
            height="87" 
            loading="lazy" 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcLPYLvBhQspUwGqwYdt1VcsaLeNn5tGh2EycKOIFQJN3UbGNdtuxqjZyArvangz-kgxJPl_li2g2T0G2ZvsjC7YDC6mbqPaG9dSw1uzK-r6ekNQfcTzM-bM7CKnnygPDhFNZ-E4Gipqo/w320-h87-rw/email-us-1805514__480.webp" 
            width="320" 
          />

          <p style={{ marginLeft: '25%' }}>
            <i className="fas fa-envelope-open-text" style={{ color: '#2c3e50', fontSize: '20px' }}></i> 
            <b><i> <span id="W_Email"><a href="mailto:admin@soundbite.com">admin@soundbite.com</a></span></i></b><br />

            <i className="fab fa-whatsapp-square" style={{ color: '#3edc81', fontSize: '20px' }}></i> 
            <b><span id="W_whatsapp"><a href="tel:"></a></span></b><br />
          </p>    

          <h3 style={{ color: '#3e005d' }}>We will revert you as soon as possible...!</h3>
          <p style={{ color: '#3e005d', textAlign: 'center' }}>
            Thank you for contacting us! <br /><b>Have a great day</b>
          </p>
          
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Page;
