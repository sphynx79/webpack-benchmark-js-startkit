// src/model/app.js

import stream from "mithril/stream";

class App {
  constructor() {
    this._modelName = this.constructor.name;
  }

  dispatch(action, args) {
    this[action].apply(this, args || []);
    // requestAnimationFrame(function() {
    //     localStorage["transmission"] = JSON.stringify(this)
    // })
  }

  toggleSidebar(type) {
    if (type == "left") {
      this.sidebarLeft ? (this.sidebarLeft = false) : (this.sidebarLeft = true);
    } else {
      this.sidebarRight
        ? (this.sidebarRight = false)
        : (this.sidebarRight = true);
    }
  }
}

window.appState = new App();

