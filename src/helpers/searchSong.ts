import { songs } from "../constants";
import { Song } from "../types/song";

export function searchSong(searchTerm: string): Song[] {
  searchTerm = searchTerm.toLowerCase();

  return songs
    .filter((song: Song) => {
      const songName = song.name.toLowerCase();
      //const songArtist = song.artist.toLowerCase();

      if (
        //songArtist.includes(searchTerm) ||
        songName.includes(searchTerm)
      ) {
        return song;
      }
    })
    .sort((a :Song, b :Song) =>{
      const opts = { sensitivity: "base", numeric: true };

      const nameCompare = a.name.localeCompare(b.name, undefined, opts);
      if (nameCompare !== 0) return nameCompare;

      const artistCompare = a.artist.localeCompare(b.artist, undefined, opts);
      if (artistCompare !== 0) return artistCompare;

      return a.youtubeId.localeCompare(b.youtubeId, undefined, opts);
    })
    .slice(0, 5);
}
