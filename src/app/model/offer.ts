export class Offer {
  agent : string;
  autor : string;
  book_id : string;
  expiration_date : string;
  offer : string;
  timestamp : string;
  accepted: boolean;
  active: boolean;

  constructor(
    agent: string = "",
    autor: string = "",
    book_id: string = "",
    expiration_date: string = "",
    offer: string = "",
    timestamp: string = "",
    accepted: boolean = false,
    active: boolean = true
  ) {
    this.agent = agent;
    this.autor = autor;
    this.book_id = book_id;
    this.expiration_date = expiration_date;
    this.offer = offer;
    this.timestamp = timestamp;
    this.accepted = accepted;
    this.active = active;
  }
}
