import React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string;
    phone: string;
    insurance: string;
    message: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ name, email, phone, insurance, message }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#F8EEEE', borderRadius: '8px', border: '1px solid #CD252B' }}>
            <header style={{ backgroundColor: '#CD252B', color: '#ffffff', padding: '10px', textAlign: 'center', borderRadius: '8px 8px 0 0' }}>
                <h1 style={{ margin: '0', fontSize: '24px' }}>New Contact Form Submission</h1>
            </header>

            <section style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '0 0 8px 8px' }}>
                <h2 style={{ color: '#CD252B', fontSize: '20px', marginBottom: '10px' }}>Contact Information</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Insurance:</strong> {insurance}</p>

                {message && (
                    <>
                        <h3 style={{ color: '#CD252B', fontSize: '18px', marginTop: '20px' }}>Message</h3>
                        <p style={{ fontStyle: 'italic', color: '#333333' }}>{message}</p>
                    </>
                )}

                <footer style={{ marginTop: '30px', borderTop: '1px solid #CD252B', paddingTop: '10px', textAlign: 'center', color: '#777777', fontSize: '14px' }}>
                    <p>G2 Business & Auto Insurance</p>
                    <p>3350 Shelby St, Ste 200 Ontario CA 91764</p>
                    <p>Email: veronica@getg2insurance.com | Phone: 909-493-3220</p>
                </footer>
            </section>
        </div>
    );
};

export default EmailTemplate;
