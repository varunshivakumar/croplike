let what = 0;
console.log(what ? true : false);
console.log(what++);
console.log(what ? true : false);

let thefuck = 0;
console.log(thefuck ? true : false);
console.log(++thefuck);
console.log(thefuck ? true : false);

class papa {
  constructor(name) {
    this.name = name;
  }
  canYell() {
    console.log(this.name);
  }
}

let bob = new papa("b");
console.log(() => {
  let arr = [];
  for (let key in bob) {
    arr.push(key);
  }

  console.log(arr);
});
