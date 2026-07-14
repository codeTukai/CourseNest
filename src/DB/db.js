import mongoose from "mongoose";
const connectedDB = async () => {

     try {
        const databaseInstance = await mongoose.connect("")
        // console.log(databaseInstance);
        

        console.log(`\n Database successfully Connected !! DB HOST: ${databaseInstance.connection.host}`);

    } catch (error) {
        console.log("Mongodb connection Failed", error);
        process.exit(1)
    }

}

export {connectedDB}