const port = async (app) => {
try {
const PORT = process.env.PORT ;


    if (!app) {
        console.log("Express app is missing");
        return;
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

} catch (err) {
    console.log(err.message);
    console.log("Error in the server");
}


};

module.exports = port;
