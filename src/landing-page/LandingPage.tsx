import { useState, type ChangeEvent, type FormEvent } from 'react'
import './LandingPage.scss'
import girl from "../assets/images/Dramatic Hair Transformation Before and After Comparison Poster.png"
import logo from "../assets/images/image 1.png"


const LandingPage = () => {

    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setStatus('');
        }
    };


const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (!file) {
    setStatus('❌ Please select a file.');
    return;
  }

  // Read file content as text
  const textContent = await file.text();

  try {
    const res = await fetch('https://landing-page-tisume-backend-production.up.railway.app/api/proxy/service-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ textContent }), // send raw text as JSON
    });

    if (!res.ok) {
      throw new Error('Upload failed');
    }

    const result = await res.json();
    setStatus(`✅ ${result.message || 'Upload successful!'}`);
  } catch (error) {
    console.error(error);
    setStatus('❌ Upload failed. Check console.');
  }
};
    
    return (
        <div className='landing-page'>
          <div className='landing-page__header'>
            <img className= "landing-page__header-image" src={logo} alt="logo of tisume"/>
            <nav className="landing-page__header__nav">
              <a className="landing-page__header__nav-link" href="#">Home</a>
              <a className="landing-page__header__nav-link" href="#">About Us</a>
              <a className="landing-page__header__nav-link" href="#">Contact Us</a>
            </nav>
          </div>
          <div className='landing-page__content'>
            <form onSubmit={handleSubmit} className='landing-page__content__form'>
              <h3 className='landing-page__content__form-title'>Book the look. <span className="landing-page__content__form-title-span">Grow your chair.</span></h3>
              <p className='landing-page__content__form-text'>Tisume turns your existing booking link into a premium storefront in minutes — no spreadsheets, no headaches.</p>
              <div className='landing-page__content__form-input-container'> 
                <h3 className='landing-page__content__form-input-container-title'>Let's Get you Live on Tisume!</h3>
                <label
                  htmlFor='file-upload'
                  className='landing-page__content__form-input-container-label'
                >
                  Upload File
                </label>
                <input
                  className='landing-page__content__form-input-container-input'
                  type="file"
                  accept=".txt,.docx"
                  onChange={handleFileChange}
                  id="file-upload"
                />
                <button type="submit" className='landing-page__content__form-input-container-submit'>Submit</button>

              </div>
              <div>{status}</div>
              </form>
            <img className='landing-page__content-image' src={girl} alt="picture of girl with nice hair"/>
            
          </div>
          <div className="landing-page__footer">Copyright @ 2025 Tisume - All Rights Reserved</div>
              
        </div>
            
    )
}

export default LandingPage
