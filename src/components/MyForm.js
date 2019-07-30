import React from 'react';
import { Build } from './Message.js';
import { GetServerKey } from './Manifest.js';

const axios = require('axios');

const propTypes = {};

const defaultProps = {};

export default class MyForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      message: 'Nova mensagem important de teste',
      tags: '',
      auth: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ auth: GetServerKey() })
  }

  buildConfig = () => {
    const config = {
      headers: {
        Authorization: this.state.auth,
        accept: 'application/json',
        'content-type': 'application/json'
      },
      data: Build(this.state.tags, this.state.message)
    }
    return config
  }

  handleChangeValue = (e) => {
    this.setState({ value: e.target.value })
  }

  handleChangeMessage = (e) => {
    this.setState({ message: e.target.value })
  }

  handleChangeTags = (e) => {
    this.setState({ tags: e.target.value })
  }

  async handleSubmit() {
    axios.post('https://fcm.googleapis.com/fcm/send', null, this.buildConfig())
      .then(response => {
        this.handleResponse(response)
      })
      .catch(response => {
        console.log(response)
      })
  }

  handleResponse = (response) => {
    this.setState({ value: response.data.success })
  }

  render() {
    return (
      <div className="container" >
        <div className="form-group">
          <label>Tags</label>
          <input required onChange={this.handleChangeTags} id="tags" className="form-control" ></input>
          <label>Mensagem</label>
          <textarea onChange={this.handleChangeMessage} id="message" required type="textarea" className="form-control" rows="3" />
        </div>
        <button className="btn btn-flat" type="submit" onClick={this.handleSubmit}>Enviar</button>
        <div className="form-group">
          <label>Resposta</label>
          <input className="form-control" value={this.state.value} onChange={this.handleChangeValue} type="text" />
        </div>
      </div>
    );
  }
}

MyForm.propTypes = propTypes;
MyForm.defaultProps = defaultProps;