from flask import Flask, jsonify
from ytmusicapi import YTMusic

# Initialize YTMusic with OAuth credentials
ytmusic = YTMusic('oauth.json')

app = Flask(__name__)

@app.route('/playlists', methods=['GET'])
def get_playlists():
    playlists = ytmusic.get_library_playlists(limit=5)
    return jsonify(playlists)

@app.route('/songs', methods=['GET'])
def get_songs():
    songs = ytmusic.get_library_songs(limit=5)
    return jsonify(songs)

@app.route('/albums', methods=['GET'])
def get_albums():
    albums = ytmusic.get_library_albums(limit=5)
    return jsonify(albums)

if __name__ == "__main__":
    app.run(debug=True)
