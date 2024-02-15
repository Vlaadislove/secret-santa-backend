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
        }
    },
    { timestamps: true },
)

export default mongoose.model('Randomize', RandomizeSchema)