import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const HTTPOPTIONS = {
	headers: new HttpHeaders({
		'Authorization' : localStorage.getItem('#token'),
		'Content-Type': 'application/json',
		// 'Access-Control-Allow-Origin' : 'http://localhost:4200',
		// 'Origin': 'http://localhost:4200',
		// 'Access-Control-Allow-Credentials': 'true'
	})
};

export const PATH = environment.PATH;
// query size for reference data requests.  Let's the request return all app data so it can be cached
export const QUERYSIZE = 250;
// application queue uri
// tslint:disable-next-line:max-line-length
export const QUEUEPATH = '####################';
export const CLEAR = 'CLEAR';
export const EMAILRELAYPATH = '#############################';
export const EMAILRELAYKEY = '########################';
