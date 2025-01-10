import YTMusic from "ytmusic-api";

async function fetchMusic(query: string) {
    const ytmusic = new YTMusic();
    await ytmusic.initialize();

    const searchResults = await ytmusic.search(query);
    return searchResults; // Response type: Array of search results
}

async function getSong(songId: string) {
    const ytmusic = new YTMusic();
    await ytmusic.initialize();

    const song = await ytmusic.getSong(songId);
    return song; // Response type: Song object
}

async function getPlaylist(playlistId: string) {
    const ytmusic = new YTMusic();
    await ytmusic.initialize();

    const playlist = await ytmusic.getPlaylist(playlistId);
    return playlist; // Response type: Playlist object
    // response structure: {title: string, author: string, description: string, thumbnail: string, songs: Array<Song>}
}

async function getAlbum(albumId: string) {
    const ytmusic = new YTMusic();
    await ytmusic.initialize();

    const album = await ytmusic.getAlbum(albumId);
    return album; // Response type: Album object
}

async function getHome() {
    const ytmusic = new YTMusic();
    await ytmusic.initialize();

    const home = await ytmusic.getHomeSections();
    return home; // Response type: Home section object
}

async function getLyrics(songId: string) {
    const ytmusic = new YTMusic();
    await ytmusic.initialize();

    const lyrics = await ytmusic.getLyrics(songId);
    return lyrics; // Response type: Lyrics object
}

export {
    fetchMusic,
    getSong,
    getPlaylist,
    getAlbum,
    getHome,
    getLyrics
};
