export interface UnistNode {
  type: string;
  data?: UnistData;
  position?: UnistPosition;
}

export interface UnistPosition {
  start: UnistPoint;
  end: UnistPoint;
  indent?: number[]; // >= 1
}

export interface UnistPoint {
  line: number; // >= 1
  column: number; // >= 1
  offset?: number; // >= 0
}

export interface UnistData {}

export interface UnistParent extends UnistNode {
  children: Node[];
}

export interface UnistLiteral extends UnistNode {
  value: any;
}

export interface Parent {
  children: Array<Element | Doctype | Comment | Text>;
}

export interface Literal extends UnistLiteral {
  value: string;
}

export interface Root extends Parent {
  type: 'root';
}

export interface Element extends Parent {
  type: 'element';
  tag: string; // tagName
  properties?: Properties;
  content?: Root;
  children: Array<Element | Comment | Text>;
}

export interface Properties {}

export type PropertyName = string;
export type PropertyValue = any;

export interface Doctype extends Node {
  type: 'doctype';
}

export interface Comment extends Literal {
  type: 'comment';
}

export interface Text extends Literal {
  type: 'text';
}
