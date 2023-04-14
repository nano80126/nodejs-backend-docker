export interface KWCarNaviDirectiosDTO {
	waypoints: KWWaypoints[];
	routes: KWRoute[];
	errorMessage: string | null;
	status: string;
}

export interface KWWaypoints {
	geocoderStatus: string;
	placeId: string;
	types: string[];
}

export interface KWRoute {
	bounds: {
		northeast: {
			lat: number;
			lng: number;
		};
		southwest: {
			lat: number;
			lng: number;
		};
	};
	legs: KWRouteLeg[];
	copyrights: string;
	overviewPolyline: {
		points: string;
	};
	summary: string;
	waypointOrder: number[];
}

export interface KWRouteLeg {
	distance: { text: string; value: number };
	duration: { text: string; value: number };
	startAddress: string;
	startLocation: { lat: number; lng: number };
	endAddress: string;
	endLocation: { lat: number; lng: number };
	steps: KWRouteLegStep[];
}

export interface KWRouteLegStep {
	maneuver: string | null;
	instructions: string;
	polyline: {
		points: string;
	};
	distance: {
		text: string;
		value: number;
	};
	duration: {
		text: string;
		value: number;
	};
	startLocation: {
		lat: number;
		lng: number;
	};
	endLocation: {
		lat: number;
		lng: number;
	};
	travelMode: string;
}
