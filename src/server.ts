import app from './app';
import sequelize from "./db/db_config";

const PORT = process.env.PORT || 5000;

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
