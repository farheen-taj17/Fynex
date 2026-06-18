const Message =
require("../models/Message");

const onlineUsers = {};

module.exports = (io)=>{

    io.on(

        "connection",

        (socket)=>{

            console.log(
                "User Connected"
            );

            /* User Login */

            socket.on(

                "user-online",

                (username)=>{

                    onlineUsers[
                        username
                    ] = socket.id;

                    io.emit(
                        "online-users",
                        Object.keys(
                            onlineUsers
                        )
                    );

                }

            );

            /* Send Message */

            socket.on(

                "send-message",

                async(data)=>{

                    await Message.create({

                        sender:
                        data.sender,

                        receiver:
                        data.receiver,

                        message:
                        data.message

                    });

                    const receiverSocket =
                    onlineUsers[
                        data.receiver
                    ];

                    if(receiverSocket){

                        io.to(
                            receiverSocket
                        ).emit(

                            "receive-message",

                            data

                        );

                    }

                }

            );

            /* Typing */

            socket.on(

                "typing",

                (data)=>{

                    const receiverSocket =
                    onlineUsers[
                        data.receiver
                    ];

                    if(receiverSocket){

                        io.to(
                            receiverSocket
                        ).emit(

                            "user-typing",

                            data.sender

                        );

                    }

                }

            );

            /* Disconnect */

            socket.on(

                "disconnect",

                ()=>{

                    for(
                        const user
                        in onlineUsers
                    ){

                        if(
                            onlineUsers[user]
                            === socket.id
                        ){

                            delete onlineUsers[
                                user
                            ];

                        }

                    }

                    io.emit(

                        "online-users",

                        Object.keys(
                            onlineUsers
                        )

                    );

                }

            );

        }

    );

};

socket.on(

"join-group",

(groupId)=>{

socket.join(
groupId
);

}
);

socket.on(

"group-joined",

(data)=>{

io.to(
data.groupId
).emit(

"group-notification",

`${data.username}
joined the group`

);

}
);


socket.on(

"file-message",

(file)=>{

io.emit(

"receive-file",

file

);

}
);

socket.on(

"voice-message",

(audio)=>{

io.emit(

"receive-voice",

audio

);

}
);

socket.on(

"voice-message",

(audio)=>{

io.emit(
"voice-alert",
audio.sender
);

}
);

socket.on(

"voice-alert",

(sender)=>{

console.log(

`${sender}
sent a voice note`

);

}
);


