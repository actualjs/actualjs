export interface Token {
  type: TokenType;
  value?: string;
  startPos: number;
  endPos: number;
  line: number;
}

export type TokenType =
  | 'IDENTIFIER'
  | 'STRING'
  | 'LARROW'
  | 'RARROW'
  | 'LBRACE'
  | 'RBRACE'
  | 'SLASH'
  | 'IGNORE'
  | 'EOF';
