export class jwtConstants {
	// secret: process.env.JWT_SECRET,
	public secret: string;
	constructor() {
		this.secret = process.env.JWT_SECRET;
	}
}

// console.log('abc', process.env.JWT_SECRET);
