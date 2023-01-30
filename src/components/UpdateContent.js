import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFromSubmit(e) {
    alert("A name was submitted : " + this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <article>
        <h2>Update</h2>
        <form method="post" action="/create_process"
          onSubmit = {function (e) { 
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
            );
          }.bind(this)}
        >
          <input type="hidden" name="id" value={this.state.id}></input>
          <p>
            <input
              type="text"
              name="title"
              placeholder="제목을 입력을 해주세요."
              value={this.state.title}
              onChange={this.handleInputChange}
            ></input>
          </p>
          <p>
            <textarea
              name="desc"
              placeholder="내용을 입력해주세요."
              value={this.state.desc}
              onChange={this.handleInputChange}
            ></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;