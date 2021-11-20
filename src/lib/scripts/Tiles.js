import ColorSwatch from "./ColorSwatch";

class Tiles {
  constructor(properties) {
    this.bg = properties.bg || ColorSwatch.bgDark;
    this.char = properties.char || "";
    this.explored = false;
    this.fg = properties.fg || ColorSwatch.red[4];
    this.lightPasses = properties.lightPasses || false;
    this.name = properties.name || "todo";
    this.walkable = properties.walkable || false;
  }
}

Tiles.nullTILE = new Tiles({
  char: "%",
  fg: ColorSwatch.bgDark,
  name: "Null"
});

Tiles.floorTILE = new Tiles({
  char: ".",
  fg: ColorSwatch.red[9],
  lightPasses: true,
  name: "Empty Floor",
  walkable: true,
});

Tiles.wallTILE = new Tiles({
  char: "#",
  fg: ColorSwatch.red[9],
  name: "Unbroken Wall"
});

export default Tiles;
