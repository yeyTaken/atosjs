export class Redirect {
  static from: string;
  static to: string;

  static getRedirects() {
    return { from: this.from, to: this.to };
  }
}
