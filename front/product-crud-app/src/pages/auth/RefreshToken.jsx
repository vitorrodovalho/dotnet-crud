import axios from 'axios';

const RefreshToken = () => {
    const handleRefreshToken = async () => {
        try {
            const response = await axios.post('/api/auth/refresh-token', {
                token: localStorage.getItem('token'),
            });

            // Armazena o novo token JWT no armazenamento local do navegador
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error(error);
            alert('Erro ao renovar o token.');
        }
    };

    return (
        <div>
            <button onClick={handleRefreshToken}>Renovar token</button>
        </div>
    );
};
