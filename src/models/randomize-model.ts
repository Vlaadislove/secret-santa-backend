import mongoose from 'mongoose'

const RandomizeSchema = new mongoose.Schema(
    {
        create: {
            name: { type: String, required: true },
            email: { type: String, required: true },
        },
        pairs: [
            {
                gifter: {
                    name: { type: String, required: true },
                    email: { type: String, required: true },
                    type: Object, required: true
                },
                recipient: {
                    name: { type: String, required: true },
                    email: { type: String, required: true },
                    type: Object, required: true
                }
            }
        ],
        partyLink: {
            type: String,
            required: true
        },
        // expiresAt: {
        //     type: Date,
        //     default: () => {
        //         const date = new Date();
        //         date.setMinutes(date.getMinutes() + 1);
        //         date.setSeconds(0);
        //         return date;
        //     },
        // },
    },
    { timestamps: true },
)

export default mongoose.model('Randomize', RandomizeSchema)