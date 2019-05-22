//
// Copyright (c) 2017 Geri Borbás http://www.twitter.com/_eppz
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

  import {Vector2} from './Vector2';
  import {Rect} from './Rect';
  import {Polygon} from './Polygon';

  export static class Geometry {

  // region Point

    // Determine if points are equal with a given accuracy.
  public static ArePointsEqualWithAccuracy( a: Vector2,  b: Vector2,  accuracy: number): boolean {
      return Vector2.distance(a, b) <= accuracy;
  }

  // Determine winding direction of three points.
  public static ArePointsCCW( a: Vector2, b: Vector2, c: Vector2): boolean {
    return ((c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x));
  }

// endregion

// region Rect / Bounds

    // Determine if `rect2.size` fits into `rect1` with a given accuracy.
  public static IsRectContainsRectSizeWithAccuracy(rect1: Rect, rect2: Rect, accuracy: number = 0.0): boolean {// Compare sizes only
      return ( Math.abs(rect1.width + accuracy * 2.0) >= Math.abs(rect2.width)) &&
      (Math.abs(rect1.height + accuracy * 2.0) >= Math.abs(rect2.height));
  }

  // Determine if `rect2` is contained by `rect1` (even if permiters are touching) with a given accuracy.
  public static IsRectContainsRectWithAccuracy(rect1: Rect, rect2: Rect,  accuracy: number = 0.0): boolean {
    const xMin: boolean = (rect1.xMin - accuracy <= rect2.xMin);
    const xMax: boolean = (rect1.xMax + accuracy >= rect2.xMax);
    const yMin: boolean = (rect1.yMin - accuracy <= rect2.yMin);
    const yMax: boolean = (rect1.yMax + accuracy >= rect2.yMax);
    return xMin && xMax && yMin && yMax;
  }

// endregion

// region Line

    /**
     *@desc
     *@author ybb
     *@date 2018/10/14/ 18:31:27
     */
    public static IntersectionPointOfLines(segment1_a: Vector2 , segment1_b: Vector2, segment2_a: Vector2, segment2_b: Vector2): Vector2 {
      const crossProduct = (segment1_a.x - segment1_b.x) * (segment2_a.y - segment2_b.y) - (segment1_a.y - segment1_b.y) * (segment2_a.x - segment2_b.x);
      if (crossProduct === 0.0 ) {
        return Vector2.zero;
      }

      const x: number = ((segment2_a.x - segment2_b.x) * (segment1_a.x * segment1_b.y - segment1_a.y * segment1_b.x) - (segment1_a.x - segment1_b.x) * (segment2_a.x * segment2_b.y - segment2_a.y * segment2_b.x)) / crossProduct;
      const y: number = ((segment2_a.y - segment2_b.y) * (segment1_a.x * segment1_b.y - segment1_a.y * segment1_b.x) - (segment1_a.y - segment1_b.y) * (segment2_a.x * segment2_b.y - segment2_a.y * segment2_b.x)) / crossProduct;

      // Skip segmental tests.
      // if (x < Math.Min(a1.x, b1.x) || x > Math.Max(a1.x, b1.x)) return Vector2.zero;
      // if (x < Math.Min(a2.x, b2.x) || x > Math.Max(a2.x, b2.x)) return Vector2.zero;

      return new Vector2(x, y);
  }

  // Determine point distance from line (defined by segment endpoints).
  public static PointDistanceFromLine(point: Vector2 , segment_a: Vector2 , segment_b: Vector2 ): number {
    const a_: number = point.x - segment_a.x;
    const b_: number = point.y - segment_a.y;
    const c_: number = segment_b.x - segment_a.x;
    const d_: number = segment_b.y - segment_a.y;
    return Math.abs(a_ * d_ - c_ * b_) / Math.sqrt(c_ * c_ + d_ * d_);
  }

// endregion

// region Segment

  // Determine if a given point lies on the left side of a segment (line beneath).
  public static PointIsLeftOfSegment(point: Vector2 ,  segment_a: Vector2 ,  segment_b: Vector2 ): boolean {
    const crossProduct: number = (segment_b.x - segment_a.x) * (point.y - segment_a.y) - (segment_b.y - segment_a.y) * (point.x - segment_a.x);
    return (crossProduct > 0.0);
  }

  // Determine if segments (defined by endpoints) are equal with a given accuracy.
  public static AreSegmentsEqualWithAccuracy(segment1_a: Vector2, segment1_b: Vector2, segment2_a: Vector2, segment2_b: Vector2, accuracy: number): boolean {
    return (
      (Geometry.ArePointsEqualWithAccuracy(segment1_a, segment2_a, accuracy) && Geometry.ArePointsEqualWithAccuracy(segment1_b, segment2_b, accuracy)) ||
      (Geometry.ArePointsEqualWithAccuracy(segment1_a, segment2_b, accuracy) && Geometry.ArePointsEqualWithAccuracy(segment1_b, segment2_a, accuracy))
    );
  }

  // Determine if segments (defined by endpoints) have common points with a given accuracy.
  public static HaveSegmentsCommonPointsWithAccuracy(segment1_a: Vector2, segment1_b: Vector2, segment2_a: Vector2, segment2_b: Vector2, accuracy: number): boolean {
    return (
      Geometry.ArePointsEqualWithAccuracy(segment1_a, segment2_a, accuracy) ||
      Geometry.ArePointsEqualWithAccuracy(segment1_a, segment2_b, accuracy) ||
      Geometry.ArePointsEqualWithAccuracy(segment1_b, segment2_a, accuracy) ||
      Geometry.ArePointsEqualWithAccuracy(segment1_b, segment2_b, accuracy)
    );
  }

  /// <summary>
  /// Determine if two segments defined by endpoints are intersecting (defined by points).
  /// True when the two segments are intersecting. Not true when endpoints
  /// are equal, nor when a point is contained by other segment.
  /// From http://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/
  /// </summary>
  public static AreSegmentsIntersecting(segment1_a: Vector2, segment1_b: Vector2, segment2_a: Vector2, segment2_b: Vector2): boolean {
    return (
      (Geometry.ArePointsCCW(segment1_a, segment2_a, segment2_b) !== Geometry.ArePointsCCW(segment1_b, segment2_a, segment2_b)) &&
      (Geometry.ArePointsCCW(segment1_a, segment1_b, segment2_a) !== Geometry.ArePointsCCW(segment1_a, segment1_b, segment2_b))
    );
  }

// endregion

// region Polygon

  /// <summary>
  /// Test if a polygon contains the given point (checks for sub-polygons recursive).
  /// Uses the same Bryce boe algorythm, so considerations are the same.
  /// From https://en.wikipedia.org/wiki/Point_in_polygon// Ray_casting_algorithm
  /// </summary>
  public static IsPolygonContainsPoint(polygon:Polygon , point:Vector2 ): boolean {
    // Winding ray left point.
    Vector2; left = new Vector2(polygon.bounds.xMin - polygon.bounds.width, point.y);

    // Enumerate polygon segments.
    int; windingNumber = 0;
    polygon.EnumerateEdgesRecursive((Edge eachEdge); =>
    {
      // Test winding ray against each polygon segment.
      if (AreSegmentsIntersecting(left, point, eachEdge.a, eachEdge.b)) { windingNumber++; }
    })

    bool; isOdd = (windingNumber % 2 != 0); // Odd winding number means point falls outside
    return isOdd;
  }

  public static CentroidOfPolygons(Polygon[] polygons): Vector2 {
    // From https://en.wikipedia.org/wiki/Centroid// By_geometric_decomposition
    float; ΣxA = 0.0; f;
    float; ΣyA = 0.0; f;
    float; ΣA = 0.0; f;
    foreach (Polygon eachPolygon in polygons);
    {
      // Get centroid.
      Vector2; eachCentroid = eachPolygon.centroid;

      // Sum weighted.
      ΣxA += eachCentroid.x * eachPolygon.area;
      ΣyA += eachCentroid.y * eachPolygon.area;
      ΣA += eachPolygon.area;
    }

    // "Remove" area.
    float; x = ΣxA / ΣA;
    float; y = ΣyA / ΣA;

    return new Vector2(x, y);
  }

// endregion

}
