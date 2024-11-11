import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const echo = new Echo({
    broadcaster: 'pusher',
    key: 'ed18c03acfecb57914e4', // Asegúrate de que estas variables estén disponibles
    cluster: 'us2',
    encrypted: true
})
// Manejar eventos de conexión
echo.connector.pusher.connection.bind('error', function(err) {
    console.error('Error de conexión:', err);
});


export default ({ app }) => {
    // Si estás usando Vue 3, la instancia se pasa como 'app'
    app.config.globalProperties.$echo = echo; // Agrega Echo a las propiedades globales de Vue
};