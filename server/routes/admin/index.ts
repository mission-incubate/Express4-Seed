/// <reference path="../../typings.d.ts" />
import {IRoute, RequestHandler}  from 'express';

export class Admin implements IRoute {
	path: string;
	stack: any;
	constructor() {
		this.path = '/Admin';
	}
	all(handler: RequestHandler) {
		return <IRoute>this;
	}
	get(handerl: RequestHandler): any {
		return {'Message' : 'all'};
	}
	post(handerl: RequestHandler): any {
		return <IRoute>this;
	}
	put(handerl: RequestHandler): any {
		return <IRoute>this;
	}
	delete(handerl: RequestHandler): any {
		return <IRoute>this;
	}
	patch(handerl: RequestHandler): any {
		return <IRoute>this;
	}
	options(handerl: RequestHandler): any {
		return <IRoute>this;
	}
	head(handerl: RequestHandler): any {
		return <IRoute>this;
	}
}
