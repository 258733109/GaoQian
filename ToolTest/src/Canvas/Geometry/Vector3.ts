export class Vector3 {
  get z(): number {
    return this._z;
  }
  get y(): number {
    return this._y;
  }
  get x(): number {
    return this._x;
  }

  public reset(v: Vector3) {
    this._x = v.x;
    this._y = v.y;
    this._z = v.z;
  }

  public get magnitude(): number {
    return Math.sqrt(this.x *  this.x +  this.y *  this.y + this._z * this._z);
  }

  public get sqrMagnitude(): number {
    return(this.x *  this.x +  this.y *  this.y + this._z * this._z);
  }

  public get normalized(): Vector3 {
    const nVector = new Vector3(this._x, this._y, this._z);
    nVector.normalize();
    return nVector;
  }

  private _x: number;
  private _y: number;
  private _z: number;
  public constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  public add(v: Vector3): Vector3 {
    return new Vector3(this._x + v.x, this._y + v.y, this._z + v.z);
  }

  public subtract(v: Vector3): Vector3 {
    return new Vector3(this._x - v.x, this._y - v.y, this._z - v.z);
  }

  public divide(d: number): Vector3 {
    return new Vector3(this._x / d, this._y / d, this._z / d);
  }

  public multiply(scalar: number): Vector3 {
    return new Vector3(this._x * scalar, this._y * scalar, this._z * scalar);
  }

  public dot(v: Vector3): number {
    return this._x * v.x + this._y * v.y + this._z * v.z;
  }

  public cross(v: Vector3): Vector3 {
    return new Vector3( ( this.y *  v.z -  this.z *  v.y),
      ( this.z *  v.x -  this.x *  v.z),
      ( this.x *  v.y -  this.y *  v.x));
  }

  public normalize() {
    if (this.magnitude > 9.99999974737875E-06) {
      this.reset(this.divide(this.magnitude));
    } else {
      this.reset(Vector3.zero);
    }
  }

  public static get zero(): Vector3 {
    return new Vector3(0, 0, 0);
  }

  public static get one(): Vector3 {
    return new Vector3(1, 1, 1);
  }
}
