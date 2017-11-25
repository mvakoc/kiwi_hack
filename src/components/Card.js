import React, { Component } from "react";

export default class Card extends Component {
  render() {
    return (
      <div className="flex flex-column items-center">
        <div
          className="w-100"
          style={{
            height: 180,
            backgroundImage: `url('${this.props.item.path}')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="flex items-center justify-center mt1">
          {this.props.item.name}
        </div>
      </div>
    );
  }
}
