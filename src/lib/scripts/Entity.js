import Tiles from "./Tiles";

class Entity extends Tiles {
  constructor(properties) {
    super(properties);
    this.facing = 4;
    this.x = properties.x || 0;
    this.y = properties.y || 0;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  tryMove(map, x, y) {
    if (map.outOfBounds(x, y)) {
      return false;
    } else {
      if (this.x === x && this.y === y) {
        return true;
      }
      let tile = map.tiles[x][y];
      if (tile.walkable) {
        this.setPosition(x, y);
        return true;
      }
      return false;
    }
  }
}

export default Entity;
