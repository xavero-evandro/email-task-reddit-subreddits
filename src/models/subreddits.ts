import { Column } from 'typeorm';

export class SubReddits {
  @Column()
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
