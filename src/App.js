import React, { Component } from 'react';
import Toc from "./components/Toc"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.max_content_id = 3; //UI에 영향을 주는 아이가 아니기 때문에 state에 넣지 않아도 됨. contents추가 비교를 위한 값
    this.state = {
      mode: 'welcome',
      selected_content_id: 2, //default contents id
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for information' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for information' }
      ]
    }
  }

  getReadContent() {
    var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i++;
      }
  }

  getContent() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) { 
        //add content to this.state.contents
        // console.log(_title, _desc);
        this.max_content_id++;
        // push = 기존 데이터도 함께 바꾸기 때문에 state 추가 시 사용하지 말 것
        // 성능을 개선할 때 굉장히 까다로움.
        // this.state.contents.push(
        //   { id: this.max_content_id, title: _title, desc: _desc }
        // );
        //concat 은 기존 데이터를 바꾸지 않기 때문에 성능 개선하기에 편함.
        var _contents = this.state.contents.concat(
          { id: this.max_content_id, title: _title, desc: _desc }
        );
        this.setState({
          contents: _contents,
          mode: 'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>

    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function (_id, _title, _desc) {
          //배열이나 객체를 수정하려고할 땐, 원본을 쓰지 말고 복제하여 쓰는 것이 좋다.
          //Array.from은 원본배열을 그대로 두고, 원본 배열을 복재한다.
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i < _contents.length) {
            if (_contents[i].id === _id) {
              _contents[ i] = { id: _id, title: _title, desc: _desc };
              break;
            }
            i++;
          }

          this.setState({
            contents: _contents,
            mode:'read'
        });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        >
        </Subject>
        <Toc
          data={this.state.contents}
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
        >
        </Toc>
        <Control onChangeMode={function (_mode) {
          if (_mode === 'delete') {
            if (window.confirm('really?')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while (i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i++;
              }
              this.setState({
                mode: 'welcome',
                contents: _contents
              });
              alert('deleted!')
            }
            
          } else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)}>
        </Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
