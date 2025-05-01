export class Agent {
  name: string;
  genres: string;
  profileLink: string;
  similarity: number;

  constructor(name: string, genres: string, profileLink: string, similarity: number) {
    this.name = name;
    this.genres = genres;
    this.profileLink = profileLink;
    this.similarity = similarity;
  }
}
