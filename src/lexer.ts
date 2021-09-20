import error from './error';
import { Token } from './token';

const isNumber = (c: string) => /^[0-9]$/.test(c);
const isLetter = (c: string) => /^[a-zA-Z]$/.test(c);
const isSpace = (c: string) => /^\s$/.test(c);

export class LexerError implements Error {
  public message: string;

  public constructor(filename: string, private _details: string, line: number, startPos: number, endPos: number) {
    this.message = error(filename, _details, line, startPos, endPos);
  }

  public get name(): string {
    return 'Lexical Analyzer Error';
  }
}

export class Lexer {
  private _position: number;
  private _index: number;
  private _current: string;
  private _line: number;

  public constructor(private _filename: string, private _text: string) {
    this._index = 0;
    this._position = 0;
    this._line = 1;
    this._current = '';
    this.advance();
  }

  private advance(): void {
    this._current = this._text.charAt(this._index++);
    this._position++;

    if (this._current === '\n') {
      this._line += 1;
      this._position = 0;
    }
  }

  public nextToken(): Token | undefined {
    if (this._current === '') {
      return undefined;
    }

    let token: Token;

    const characterToken = (type: typeof token.type, value?: typeof token.value) => ({
      type: type,
      value: value,
      line: this._line,
      startPos: this._position,
      endPos: this._position,
    });

    this.skipSpace();

    switch (this._current) {
      case '<':
        token = characterToken('LARROW');
        break;
      case '>':
        token = characterToken('RARROW');
        break;
      case '{':
        token = this.getExpression();
        break;
      default:
        if (isLetter(this._current)) {
          token = this.getIdentifier();
        } else {
          token = characterToken('IGNORE', this._current);
        }
        break;
    }

    this.advance();
    return token;
  }

  private getIdentifier(): Token {
    const startPos = this._position;

    while (isLetter(this._current) || isNumber(this._current)) {
      this.advance();
    }

    return {
      type: 'IDENTIFIER',
      value: this._text.substring(startPos - 1, this._position - 1),
      line: this._line,
      startPos: startPos,
      endPos: this._position,
    };
  }

  private getExpression(): Token {
    const startPos = this._position;
    let expr = '';

    while (this._current !== '' && this._current !== '}') {
      expr += this._current;
      this.advance();
    }

    if (this._current !== '}') {
      throw new LexerError(this._filename, 'Expression must have an ending of "}"', this._line, startPos, this._position);
    }

    if (expr === '') {
      throw new LexerError(this._filename, 'Expression must have a value', this._line, startPos, this._position);
    }

    return {
      type: 'IGNORE',
      value: expr,
      line: this._line,
      startPos: startPos,
      endPos: this._position
    };
  }

  private skipSpace(): void {
    while (isSpace(this._current)) {
      this.advance();
    }
  }
}
