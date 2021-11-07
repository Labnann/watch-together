const handleSocketIo = (io)=>{
 io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("disconnect", ()=>{
            console.log("A user disconnected");
        });

        socket.on("object", (object) => {
            console.log(object);
        })
    }
    );

}


module.exports={
    handleSocketIo
}