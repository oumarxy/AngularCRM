import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpResponse,
  HttpInterceptor, HttpHandler
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { startWith, tap } from 'rxjs/operators';

import { RequestCache } from './request-cache.service';
import { QUEUEPATH } from './services.config';
// import { searchUrl } from './package-search.service';


/**
 * If request is cachable (e.g., package search) and
 * response is in cache return the cached response as observable.
 * If has 'x-refresh' header that is true,
 * then also re-run the package search, using response from next(),
 * returning an observable that emits the cached response first.
 *
 * If not in cache or not cachable,
 * pass request through to next()
 */
@Injectable()
export class CachingInterceptor implements HttpInterceptor {
	constructor(private cache: RequestCache) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		// check if clear cache request
		if (req.method === 'PUT' || req.method === 'POST' || req.method === 'DELETE') {
			this.cache.clear();
			return next.handle(req);
		}
		// continue if not cachable.
		if (!isCachable(req)) {
			return next.handle(req);
		}
		const cachedResponse = this.cache.get(req);
		// cache-then-refresh
		if (req.headers.get('x-refresh')) {
			const results$ = sendRequest(req, next, this.cache);
			return cachedResponse ?
			results$.pipe( startWith(cachedResponse) ) :
			results$;
		}
		// cache-or-fetch
		return cachedResponse ? of(cachedResponse) : sendRequest(req, next, this.cache);
	}
}


/** Is this request cachable? */
function isCachable(req: HttpRequest<any>) {
	// if request is to queueStats, ignore
	if (req.url === QUEUEPATH) {
		return false;
	}
	// Only GET requests are cachable
	return req.method === 'GET';
}

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest(
	req: HttpRequest<any>,
	next: HttpHandler,
	cache: RequestCache): Observable<HttpEvent<any>> {

	// No headers allowed in npm search request
	// const noHeaderReq = req.clone({ headers: new HttpHeaders() });

	// return next.handle(noHeaderReq).pipe(
	return next.handle(req).pipe(
		tap(event => {
			// There may be other events besides the response.
			if (event instanceof HttpResponse) {
			cache.put(req, event); // Update the cache.
			}
		})
	);
}

