import { Schema, model } from 'mongoose';

interface IList {
	title: string;
	artist: string;
	lyricsKey: string;
	datetime: string;
	videoArr: [];
}

const listSchema = new Schema<IList>({
	title: { type: String, required: true },
	artist: { type: String, required: true },
	lyricsKey: String,
	datetime: String,
	videoArr: [{}],
});

export default model('List', listSchema);
// module.exports = mongoose.model('list', listSchema);
