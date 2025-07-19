import { useState, type ChangeEvent, type FormEvent } from 'react'
import './LandingPage.scss'

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

                <form onSubmit={handleSubmit} className='landing-page--content'>
                    <h3 className='landing-page--content-title'>Upload Services Document</h3>
                    <input
                        className='landing-page--content-input'
                        type="file"
                        accept=".txt,.docx"
                        onChange={handleFileChange}
                        
                    />
                    <button type="submit"className='landing-page--content-submit'>Upload</button>
                    <div>{status}</div>
                </form>
        </div>
            
    )
}

export default LandingPage
