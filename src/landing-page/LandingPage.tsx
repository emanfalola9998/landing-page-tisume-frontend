import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import './LandingPage.scss'

const LandingPage = () => {
    // const [searchTerm, setSearchTerm] = useState<string>("")
    // const [shouldRefetch, setShouldRefetch] = useState(false)


    // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(e.target.value.trim())
    //     console.log(shouldRefetch)
    // } 

    // const handleSubmit = async () => {
    //     if (!searchTerm) return

    //     const isLocal = import.meta.env.dev
    //     const endpoint = isLocal ? '/api/proxy/service-submit' : "https://landing-page-tisume-backend-production.up.railway.app/api/proxy/service-submit"

    //     try {
    //         const response = await fetch(endpoint, {
    //             method: 'POST',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({ url: searchTerm })
    //         })

    //         if (!response.ok) {
    //             throw new Error('Failed to submit')
    //         }

    //         console.log("✅ Submitted successfully")
    //         setShouldRefetch(prev => !prev)
    //     }
    //     catch (error) {
    //         console.error("❌ API call failed:", error)
    //     }
    // }

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

    const formData = new FormData();
    formData.append('data', file); // 'data' must match the n8n binary field

    try {
        const res = await fetch('https://your-n8n-domain/webhook/upload-services-doc', {
        method: 'POST',
        body: formData,
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
            {/* <div className='landing-page--content'>
                <h1 className='landing-page--content-title'>Add Your business quickly with AI</h1>
                <input
                    className='landing-page--content-input'
                    placeholder='Enter your website URL'
                    onChange={handleInput}
                    value={searchTerm}
                />

                <button className='landing-page--content-submit' onClick={handleSubmit}>Submit</button> */}


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
