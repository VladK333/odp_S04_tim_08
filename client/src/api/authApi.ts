const API_URL = 'http://localhost:5000/api/auth';

export async function signUp(user: { email: string; password: string; firstName: string; lastName: string; dateOfBirth: string; 
    phoneNumber: string; imgSrc: string; type: 'regular' | 'premium'}) {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error signing up');
    return data.user;
}
