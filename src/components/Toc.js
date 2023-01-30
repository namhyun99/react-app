import React, { Component } from "react";

class Toc extends Component {
	//shouldComponentUpdate는 아래 두개의 파라미터를 기본적으로 받는다.
	//return 값이 false면 render가 호출되지 않음
	shouldComponentUpdate(newProps, newState) {
		console.log(' ==== TOC render shouldComponentUpdate ===='); 
		if (this.props.data === newProps.data) { //기존데이터가 새로운 데이터가 같다면..
			return false;
		}
		return true;
	}

	render() {
		var lists = [];
		var data = this.props.data;
		var i = 0;
		while (i < data.length) {
			lists.push(
				<li key={data[i].id}>
					<a
						href={"/content/" + data[i].id}
						// data-id={data[i].id}
						onClick={function (id, e) {
							e.preventDefault();
							// var id = e.target.dataset.id;
							this.props.onChangePage(id);
						}.bind(this, data[i].id)}
					>
						{data[i].title}
					</a>
				</li>
			);
			i++;
		}
		return (
			<nav>
				<ul>{lists}</ul>
			</nav>
		);
	}
}

export default Toc;
