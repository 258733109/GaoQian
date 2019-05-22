//
// Copyright (c) 2017 Geri Borbás http://www.twitter.com/_eppz
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import {Polygon} from './Polygon';
import {Vector2} from './Vector2';
import {Edge} from "./Edge";

export class Vertex {
  get bisector(): Vector2 {
    if (this._bisector === Vector2.zero || this.alwaysCalculate) {
      this.CalculateBisector();
    } // Lazy calculation or force calculate on every access
    return this._bisector;
  }
  get normal(): Vector2 {
    if (this._normal === Vector2.zero || this.alwaysCalculate) {
      this.CalculateNormal();
    } // Lazy calculation or force calculate on every access
    return this._normal;
  }
  get polygon(): Polygon {
    return this._polygon;
  }
  get index(): number {
    return this._index;
  }

  private _index: number;
  private _polygon: Polygon;

  // If `alwaysCalculate` is on, every `normal` and `bisector` property access invokes recalculation of values based on actual topology.
  public alwaysCalculate: boolean = true;

  private _normal: Vector2;

  // Bisector is simply the sum of the neighbouring edge normals (not normalized).
  private _bisector: Vector2;

  public  CalculateNormal(){
    this._normal = this.bisector.normalized;
  }

  public CalculateBisector(){
    this._bisector = this.previousEdge.normal + this.nextEdge.normal;
  }

  // region Factory

  public static Vertex; VertexAtIndexInPolygon(int index, Polygon polygon);
{
    Vertex; instance = new Vertex();
    instance._index = index;
    instance._polygon = polygon;
    return instance;
  }

  // endregion

  // region Accessors

  private Vertex; _previousVertex;
  public virtual; Vertex; previousVertex; { get; { return _previousVertex; } } // Readonly
  public void SetPreviousVertex(Vertex vertex); { _previousVertex = vertex; } // Explicit setter (injected at creation time)

  private Vertex; _nextVertex;
  public virtual; Vertex; nextVertex;  { get; { return _nextVertex; } } // Readonly
  public void SetNextVertex(Vertex vertex); { _nextVertex = vertex; } // Explicit setter (injected at creation time)

  private _previousEdge:Edge;
  public void SetPreviousEdge(Edge edge); { _previousEdge = edge; } // Explicit setter (injected at creation time)

  private Edge; _nextEdge;
  public virtual; Edge; nextEdge;  { get; { return _nextEdge; } } // Readonly
  public void SetNextEdge(Edge edge); { _nextEdge = edge; } // Explicit setter (injected at creation time)

  public virtual; Vector2; point; { get; { return polygon.points[index]; } } // Readonly
  public float; x; { get; { return point.x; } } // Readonly
  public float; y; { get; { return point.y; } } // Readonly
// endregion
}
