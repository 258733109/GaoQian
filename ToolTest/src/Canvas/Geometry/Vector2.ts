
export class Vector2 {
  get y(): number {
    return this._y;
  }
  get x(): number {
    return this._x;
  }

  public reset(v: Vector2) {
    this._x = v.x;
    this._y = v.y;
  }

  public get magnitude(): number {
    return Math.sqrt(this.x *  this.x +  this.y *  this.y);
  }

  public get sqrMagnitude(): number {
    return(this.x *  this.x +  this.y *  this.y);
  }

  public get normalized(): Vector2 {
    const nVector = new Vector2(this._x, this._y);
    nVector.normalize();
    return nVector;
  }

  private _x: number;
  private _y: number;
  public constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public add(v: Vector2): Vector2 {
    return new Vector2(this._x + v.x, this._y + v.y);
  }

  public subtract(v: Vector2): Vector2 {
    return new Vector2(this._x - v.x, this._y - v.y);
  }

  public divide(d: number): Vector2 {
    return new Vector2(this._x / d, this.y / d);
  }

  public multiply(scalar: number): Vector2 {
    return new Vector2(this._x * scalar, this._y * scalar);
  }
  public dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }

  public cross(v: Vector2): number {
    return (this.x * v.y - this.y * v.x);
  }

  public normalize() {
    if (this.magnitude > 9.99999974737875E-06) {
      this.reset(this.divide(this.magnitude));
    } else {
      this.reset(Vector2.zero);
    }
  }

  public static get zero(): Vector2 {
    return new Vector2(0, 0);
  }

  public static get one(): Vector2 {
    return new Vector2(1, 1);
  }

  public static distance(a: Vector2, b: Vector2) {
    return a.subtract(b).magnitude;
  }
}
