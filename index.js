var React = require('react');
var ReactDOM = require('react-dom');

class TodoItem extends React.Component {
    render() {
        return (
            <div>{this.props.item}</div>
        );
    }
}

class TodoList extends React.Component {
    render() {
        var items = this.props.items.map((item) => {
            return (
                <li>
                    <TodoItem item={item} />
                </li>);
        })

        return (
            <ul>{items}</ul>
        );
    }
}

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.itemName).focus();
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input ref="itemName" type="text" />
            </form>
        );
    }
    onSubmit(e) {
        e.preventDefault();
        var input = ReactDOM.findDOMNode(this.refs.itemName);
        var value = input.value
        this.props.addEvent({ value });
        input.value = '';
    }
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.addEvent = this.addEvent.bind(this);
        this.state = {
            items: []
        }
    }
    render() {
        return (
            <div>
                <TodoList items={this.state.items} />
                <TodoForm addEvent={this.addEvent} />
            </div>
        );
    }

    addEvent(todoItem) {
        var allItems = this.state.items;
        allItems.push(todoItem.value);
        this.setState({ allItems });
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));