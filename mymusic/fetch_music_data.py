from ytmusicapi import YTMusic

def fetch_playlists():
    ytmusic = YTMusic()
    playlists = ytmusic.get_library_playlists(limit=5)
    return playlists

def fetch_songs():
    ytmusic = YTMusic()
    songs = ytmusic.get_library_songs(limit=5)
    return songs

def fetch_albums():
    ytmusic = YTMusic()
    albums = ytmusic.get_library_albums(limit=5)
    return albums

if __name__ == "__main__":
    playlists = fetch_playlists()
    print("Playlists:", playlists)

    songs = fetch_songs()
    print("Songs:", songs)

    albums = fetch_albums()
    print("Albums:", albums)
