import * as PIXI from "pixi.js";

export class Scene2D {

  private static _instance: Scene2D;
  public static getInstance(): Scene2D {
    if (!this._instance) {
      this._instance = new Scene2D();
    }
    return this._instance;
  }

  private app: PIXI.Application;
  public constructor() {
    //Create a Pixi Application
   this.app = new PIXI.Application({width: 256, height: 256});
//Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(this.app.view)
  }

  public init() {

  }
}


