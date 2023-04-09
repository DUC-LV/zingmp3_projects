export interface Banner {
	id?: number,
	type?: number,
	banner?: string,
	cover?: string,
}
export interface Playlist {
	id?: number,
	title?: string,
	sort_description?: string,
	thumbnail_m?: string,
	followed?: any,
}
export interface Album {
	id?: number,
	title?: string,
	sort_description?: string,
	thumbnail_m?: string,
	followed?: any,
	thumbnail?: string,
}
export interface Artist {
	id?: number,
	name?: string,
	alias?: string,
	thumbnail?: string,
	thumbnail_m?: string,
	total_follow?: string,
}
export interface MenuVideo {
	id?: number,
	name?: string,
	title?: string,
	alias?: string,
}
export interface DataVideo {
	id?: number,
	title?: string,
	alias?: string,
	duration?: number,
	streaming_status?: number,
	thumbnail_m?: string,
}
