import React, { useState } from 'react'
import './LandingPage.scss'

const LandingPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [shouldRefetch, setShouldRefetch] = useState(false)


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.trim())
    } 

    const handleSubmit = async () => {
        if (!searchTerm) return

        const isLocal = import.meta.env.dev
        const endpoint = isLocal ? '/api/proxy/service-submit' : "???"

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ url: searchTerm })
            })

            if (!response.ok) {
                throw new Error('Failed to submit')
            }

            console.log("✅ Submitted successfully")
            setShouldRefetch(prev => !prev)
        }
        catch (error) {
            console.error("❌ API call failed:", error)
        }
    }
    
    return (
        <div className='landing-page'>
            <div className='landing-page--content'>
                <h1 className='landing-page--content-title'>Add Your business quickly with AI</h1>
                <input
                    className='landing-page--content-input'
                    placeholder='Enter your website URL'
                    onChange={handleInput}
                    value={searchTerm}
                />

                <button className='landing-page--content-submit' onClick={handleSubmit}>Submit</button>
            </div>
            

        </div>
    )
}

export default LandingPage
