import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IBox extends Document {
    _id: ObjectId;
    box: {
        useWish: String | null;
        cardsId: ObjectId | null;
        cashLimitMax: Number | null;
        cashLimitCurrency: String | null;
        cashLimitMin: Number | null;
        inviteLink: String | null;
        logo: String | null;
        nameBox: String | null;
        participantsNumber: Number | null;
        picture: String | null;
        useCashLimit: Boolean | null;
        useNames: Boolean | null;
    };
    admin: {
        email: String | null;
        username: String | null;
    };
    isAdmin: Boolean | null;
    canCreateCards: Boolean | null;
}

const BoxSchema: Schema = new Schema({
    box: {
        useWish: { type: Boolean },
        cardsId: { type: Schema.Types.ObjectId, ref: 'Card' },
        cashLimitMax: { type: Number },
        cashLimitCurrency: { type: String },
        cashLimitMin: { type: Number },
        inviteLink: { type: String },
        logo: { type: String, default: null },
        nameBox: { type: String },
        participantsNumber: { type: Number, default: 0 },
        picture: { type: String, default: null },
        useCashLimit: { type: Boolean },
        useNames: { type: Boolean },
        usePhone: { type: Boolean },
        useEmail: { type: Boolean }
    },
    admin: {
        email: { type: String },
        username: { type: String },
    },
    canCreateCards: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
},
    { timestamps: true, collection: "boxes" }
);

export default mongoose.model<IBox>('Box', BoxSchema);

