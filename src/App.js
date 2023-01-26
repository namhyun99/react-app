import React, { Component } from 'react';
import Toc from "./components/Toc"
import Content from "./components/Content"
import Subject from "./components/Subject"
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello, React!!
        <Subject title="WEB" sub="world wide web!"></Subject>
        <Subject title="React" sub="For UI"></Subject>
        <Toc></Toc>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    );
  }
}

export default App;
