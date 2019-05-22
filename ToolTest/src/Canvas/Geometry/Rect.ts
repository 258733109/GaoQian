export class Rect {
  get height(): number {
    return this._height;
  }
  get width(): number {
    return this._width;
  }
  set xMin(value: number) {
    const xMax = this.xMax;
    this._xMin = value;
    this._width = xMax - this._xMin;
  }

  set yMin(value: number) {
    const yMax = this.yMax;
    this._yMin = value;
    this._height = yMax - this._yMin;
  }

  public get yMax() {
    return this._height + this._yMin;
  }
  public set yMax(value: number) {
    this._height = value - this._yMin;
  }

  public get xMax(): number {
    return this._width + this._xMin;
  }
  public set xMax(value: number) {
    this._width = value - this._xMin;
  }
  private _xMin: number;
  private _yMin: number;
  private _width: number;
  private _height: number;

  public constructor  (x: number, y: number, width: number, height: number) {
    this._xMin = x;
    this._yMin = y;
    this._width = width;
    this._height = height;
  }
  public static get zero(): Rect {
    return new Rect(0, 0, 0, 0);
  }

  public static defaultRect(): Rect {
    return new Rect(0, 0, 0, 0);
  }
  public static MinMaxRect( xmin: number,  ymin: number,  xmax: number,  ymax: number): Rect {
    return new Rect(xmin, ymin, xmax - xmin, ymax - ymin);
  }
}
