import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	constructor() {
		//
	}

	getHello(name: string) {
		return `Hello World ${name}`;
	}
}
