

import { Console } from 'console';
import app from './app';

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Escuchaado desde el puerto: " + PORT)
});