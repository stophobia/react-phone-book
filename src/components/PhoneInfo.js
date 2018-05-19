import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      id: 0,
      name: 'Name',
      phone: '000-0000-0000'
    }
  }
  state = {
    editing: false,
    name: '',
    phone: ''
  }
  handleRemove = () => {
    const { info, onRemove } = this.props
    onRemove(info.id)
  }
  handleToggleEdit = () => {
    const { editing } = this.state
    this.setState({ editing: !editing })
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  componentDidUpdate(prevProps, prevState){
    const { info, onUpdate } = this.props
    if(!prevState.editing && this.state.editing){
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }
    if(prevState.editing && !this.state.editing){
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if(!this.state.editing
      && !nextState.editing
      && nextProps === this.props.info
    ) {
      return false
    }
    return true
  }
  render() {
    const style = {
      border: '1px solid #000',
      padding: '10px',
      margin: '10px'
    }
    const { editing } = this.state
    if(editing){
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name='name'
              placeholder={this.state.name}
              onChange={this.handleChange}
            />
            <input
              value={this.state.phone}
              name='phone'
              placeholder={this.state.phone}
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>Apply</button>
          <button onClick={this.onRemove}>Delete</button>
        </div>
      )
    }
    const {
      name, phone
    } = this.props.info
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>Update</button>
        <button onClick={this.hadleRemove}>Delete</button>
      </div>
    );
  }
}

export default PhoneInfo;
