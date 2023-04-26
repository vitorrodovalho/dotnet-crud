import api from '../../api/default';

export default function Logout() {
    localStorage.removeItem('token'); // Remove o token JWT do armazenamento local
    window.location.href = '/login';
}
