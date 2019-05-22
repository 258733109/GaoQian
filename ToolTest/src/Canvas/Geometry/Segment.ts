import {Vector2} from './Vector2';
import {Rect} from './Rect';
import {Geometry} from 'three';

export class Segment {

     public static defaultAccuracy: number = 1e-6; public f;

    private  _a: Vector2;

    private  _b: Vector2;

// region Calculations;

    public alwaysCalculate: boolean = true;

    public _normal: Vector2;
    public get normal(): Vector2 {
      if (this._normal === Vector2.zero || this.alwaysCalculate) {
        this.calculateNormal();
      } // Lazy calculation or force calculate on every access
      return this._normal;
    }

  private _perpendicular: Vector2;
  public get perpendicular(): Vector2 {
      if (this._perpendicular === Vector2.zero || this.alwaysCalculate) {
        this.calculatePerpendicular();
      } // Lazy calculation or force calculate on every access
      return this._perpendicular;
  }

  public calculateNormal() {
    this._normal = this.perpendicular.normalized;
  }

  public calculatePerpendicular() {
    const translated = (this._b.subtract(this._a)); // Translate to origin
    this._perpendicular = new Vector2( -translated.y, translated.x); // Rotate CCW
  }

// endregion;

// region; Accessors;

  public get bounds(): Rect {

    const bounds: Rect = Rect.defaultRect();

    // Set bounds.
    bounds.xMin = Math.min(this._a.x, this._b.x);
    bounds.xMax = Math.max(this._a.x, this._b.x);
    bounds.yMin = Math.min(this._a.y, this._b.y);
    bounds.yMax = Math.max(this._a.y, this._b.y);

    return bounds;
  }

  public Rect; public ExpandedBounds(accuracy: number) {
    const treshold = accuracy / 2.0;
    const bounds = this.bounds;
    return Rect.MinMaxRect(
      bounds.xMin - treshold,
      bounds.yMin - treshold,
      bounds.xMax + treshold,
      bounds.yMax + treshold);
  }

  public  ContainsPoint( point: Vector2): boolean {
    return this.ContainsPointWithAccuracy(point, Segment.defaultAccuracy);
  }

  public ContainsPointWithAccuracy( point: Vector2,  accuracy: number): boolean {
    const treshold: number = accuracy / 2.0;

    // Expanded bounds containment test.
    const expandedBounds: Rect = this.ExpandedBounds(accuracy);
    const expandedBoundsContainment: boolean = expandedBounds.Contains(point);
    if (expandedBoundsContainment === false) { return false; } // Only if passed

    // Line distance test.
    const distance: number = this.DistanceToPoint(point);
    const lineDistanceTest: boolean = distance < treshold;
    if (lineDistanceTest === false) { return false; } // Only if passed

    // Perpendicular segment.
    const normalizedHalf: Vector2 = (this._b.subtract( this._a)).divide(2.0);
    const halfLength: number = normalizedHalf.magnitude;
    const normalizedHalfPerpendicular: Vector2 = new Vector2( -normalizedHalf.y, normalizedHalf.x );
    const perpendicular_a: Vector2  = this._a .add(normalizedHalf);
    const perpendicular_b: Vector2 = this._a.add(normalizedHalf.add(normalizedHalfPerpendicular));

    // Perpendicular line distance test.
    const perpendicularDistance: number = Geometry.PointDistanceFromLine(point, perpendicular_a, perpendicular_b);
    const perpendicularDistanceTest: boolean = perpendicularDistance < halfLength;

    // Endpoint distance test if previous failed.
    if (perpendicularDistanceTest === false) {
      const distanceFromEndPoints: number = Math.min( Vector2.distance(this._a, point), Vector2.distance(this._b, point) );
      const endpointDistanceTest: boolean = distanceFromEndPoints < treshold;
      if (endpointDistanceTest === false) { return false; } // Only if passed
    }

    // All passed.
    return true;
  }

  public IsPointLeft( point: Vector2): boolean {
    return Geometry.PointIsLeftOfSegment(point, this.a, this.b);
  }

// endregion;

// region; Geometry; features;

  /// <summary>
  /// True when the two segments are intersecting. Not true when endpoints
  /// are equal, nor when a point is contained by other segment.
  /// Can say this algorithm has infinite precision.
  /// </summary>
public bool; public IsIntersectingWithSegment(Segment segment);
{
    // No intersecting if bounds don't even overlap (slight optimization).
    bool; boundsOverlaps = this.bounds.Overlaps(segment.bounds);
    if (boundsOverlaps == false) { return false; }

    // Do the Bryce Boe test.
    return Geometry.AreSegmentsIntersecting(this.a, this.b, segment.a, segment.b);
  }

  /// <summary>
  /// Returns intersection when the two segments are intersecting. Not returns anything when endpoints
  /// are equal, nor when a point is contained by other segment.
  /// Can say this algorithm has infinite precision.
  /// </summary>
public bool; IntersectionWithSegment(Segment segment, out Vector2 intersectionPoint);
{ return IntersectionWithSegmentWithAccuracy(segment, 0.0f, out intersectionPoint); }

public bool; IntersectionWithSegmentWithAccuracy(Segment segment, float accuracy, out Vector2 intersectionPoint);
{ return IntersectionWithSegmentWithAccuracy(segment, accuracy, defaultContainmentMethod, out intersectionPoint); }

public bool; IntersectionWithSegmentWithAccuracy(Segment segment, ContainmentMethod containmentMethod, out Vector2 intersectionPoint);
{ return IntersectionWithSegmentWithAccuracy(segment, defaultAccuracy, containmentMethod, out intersectionPoint); }

public bool; IntersectionWithSegmentWithAccuracy(Segment segment, float accuracy, ContainmentMethod containmentMethod, out Vector2 intersectionPoint);
{
    intersectionPoint = Vector2.zero; // Default

    // No intersecting if bounds don't even overlap.
    Rect; expandedBounds = this.ExpandedBounds(accuracy);
    Rect; otherExpandedBounds = segment.ExpandedBounds(accuracy);
    bool; boundsOverlaps = expandedBounds.Overlaps(otherExpandedBounds);
    if (boundsOverlaps == false) {
      return false; // No intersection
    }

    if (accuracy > 0.0 {f; }) // Only any accuracy is given
    {
      // Look up point containments.
      bool; containsA = this.ContainsPoint (segment.a, accuracy, containmentMethod);
      if (containsA) {
        intersectionPoint = segment.a;
        return true; // Intersecting
      }

      bool; containsB = this.ContainsPoint (segment.b, accuracy, containmentMethod);
      if (containsB) {
        intersectionPoint = segment.b;
        return true; // Intersecting
      }

      bool; otherContainsA = segment.ContainsPoint (this.a, accuracy, containmentMethod);
      if (otherContainsA) {
        intersectionPoint = this.a;
        return true; // Intersecting
      }

      bool; otherContainsB = segment.ContainsPoint (this.b, accuracy, containmentMethod);
      if (otherContainsB) {
        intersectionPoint = this.b;
        return true; // Intersecting
      }
    }

    // Do the Bryce Boe test.
    bool; isIntersecting = Geometry.AreSegmentsIntersecting(this.a, this.b, segment.a, segment.b);
    if (isIntersecting == false) {
      return false; // No intersection
    }

    // All fine, intersection point can be determined.
    intersectionPoint = Geometry.IntersectionPointOfLines(this.a, this.b, segment.a, segment.b); // Actually the intersection of lines defined by segments
    return true; // Intersecting
  }

public float; DistanceToPoint(Vector2 point_);
{
    return Geometry.PointDistanceFromLine(point_, this.a, this.b);
  }

#endregion;

}
