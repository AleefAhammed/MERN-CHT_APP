const messageModel = require('../Model/messageModel')


module.exports.addMessage = async (req, res, next) => {

    try {

        // console.log(req.body);

        const { from, to, message } = req.body;
        const data = await messageModel.create({

            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) {

            return res.json({ msg: "Message added Successfully to DB" });
        } else {

            return res.json({ msg: "Failed to added message to DB" });

        }

    } catch (ex) {

        next(ex)
    }
}

module.exports.getAllMessage = async (req, res, next) => {

    try {

        console.log(req.body);

        const { from, to } = req.body;
        const messages = await messageModel.find({

            users: {

                $all: [from, to]
            },
        }).sort({ updatedAt: 1 });


        const projectMessages = messages.map((msg) => {

            return {

                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })

        
        console.log("your messages", projectMessages);
        return res.json(projectMessages);

    } catch (ex) {

        next(ex)
    }
}
// const messages = await messageModel.aggregate([

        //     {
        //         $match: {

        //             _id: {

        //                 $in: from, to
        //             }
        //         }
        //     },
        //     {
        //         $sort: {

        //             timestamp: 1
        //         }
        //     }
        // ])