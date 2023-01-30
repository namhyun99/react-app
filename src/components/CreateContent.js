import React, { Component } from 'react';

class CreateContent extends Component {
  render() {
    return (
      <article>
        <h2>Create</h2>
        <form method="post" action="/create_process"
          onSubmit = {function (e) { 
            e.preventDefault();
            // debugger;
            this.props.onSubmit(
              e.target.title.value,
              e.target.desc.value
            );
          }.bind(this)}
        >
          <p><input type="text" name="title" placeholder="제목을 입력을 해주세요."></input></p>
          <p>
            <textarea name="desc" placeholder="내용을 입력해주세요."></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;