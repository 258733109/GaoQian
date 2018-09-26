import {Color} from './Utils/Color';
import * as PIXI from 'pixi.js';

export class Scene2D {
  public static getInstance(): Scene2D {
    if (!this._instance) {
      this._instance = new Scene2D();
    }
    return this._instance;
  }

  private static _instance: Scene2D;

  private app: PIXI.Application;

  private isMoving: boolean;
  private startP;
  private endP;

  private bunny: any;
  public constructor() {
    // Create a Pixi Application
   this.app = new PIXI.Application(800,  600, {backgroundColor: Color.DeepSkyBlue});
// Add the canvas that Pixi automatically created for you to the HTML document
   document.body.appendChild(this.app.view);
   (window as any).TEST = () => {
      this.TEST();
    };
   document.onmousedown = event => this.onMouseDown(event);
   document.onmousemove = event => this.onMouseMove(event);
   document.onmouseup = event => this.onMouseUp(event);
  }

  public init() {
  }
  public creatBunny(x: number, y: number) {
    const texture = PIXI.Texture.fromImage('src/assets/bunny.png');
    texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    const bunny = new PIXI.Sprite(texture);
    bunny.interactive = true;
    bunny.buttonMode = true;
    bunny.anchor.set(0.5);
    bunny.scale.set(3);
    // bunny
    //   .on('pointerdown', this.onDragStart)
    //   .on('pointerup', this.onDragEnd)
    //   .on('pointerupoutside', this.onDragEnd)
    //   .on('pointermove', this.onDragMove);
    bunny.x = x;
    bunny.y = y;
    this.app.stage.addChild(bunny);
  }
  private onMouseDown(event) {
    this.isMoving = true;
    this.startP = this.mouseConvertCanvas(event);
    // this.drawCircle(this.startP,5);
  }

  /**
   *@desc 鼠标坐标转换为canvas坐标
   *@author ybb
   *@date 2018/09/24/ 21:27:19
   */
  private mouseConvertCanvas(event) {
    const {clientX: tmpx, clientY: tmpy} = event;
    const rect = event.target.getBoundingClientRect();
    const x = tmpx - rect.left;
    const y = (tmpy - rect.top);
    return {x, y};
  }

  private onMouseUp(event) {
    this.isMoving = false;
  }

  private onMouseMove(event) {
    if (this.isMoving) {
      this.endP = this.mouseConvertCanvas(event);
      this.drawLine(this.startP, this.endP);
      this.startP =  this.endP;
    }
  }

  private TEST() {
    this.drawLine({x: 100, y: 100}, {x: 200, y: 100});
    this.drawLine({x: 200, y: 100}, {x: 200, y: 200});
    this.drawLine({x: 200, y: 200}, {x: 100, y: 200});
    this.drawLine({x: 100, y: 200}, {x: 100, y: 100});
  }
  private drawLine(start, end) {
    const line = new PIXI.Graphics();
    line.lineStyle(1, Color.Red, 1);
    line.moveTo(start.x, start.y);
    line.lineTo(end.x, end.y);
    this.app.stage.addChild(line);
  }

  private drawCircle(pos, radius: number) {
    const circle = new PIXI.Graphics();
    circle.beginFill(Color.Red);
    circle.drawCircle(pos.x, pos.y, radius);
    circle.endFill();
    this.app.stage.addChild(circle);
  }

  private onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.bunny.data = event.data;
    this.bunny.alpha = 0.5;
    this.bunny.dragging = true;
  }

  private onDragEnd() {
    this.bunny.alpha = 1;
    this.bunny.dragging = false;
    // set the interaction data to null
    this.bunny.data = null;
  }

  private onDragMove() {
    if (this.bunny.dragging) {
      const newPosition = this.bunny.data.getLocalPosition(this.bunny.parent);
      this.bunny.x = newPosition.x;
      this.bunny.y = newPosition.y;
    }
  }
}
