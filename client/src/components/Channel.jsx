import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FieldGroup, FormGroup, ControlLabel, Jumbotron } from 'react-bootstrap';

/**
 * Class representing the React Register Component.
 * @extends Register
 */
 
class Channel extends React.Component {
  constructor(props) {
    super(props)
    this.state({
      message: '';
    })
  }

  onChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  onSubmit () {
    this.props.addNewChannelMessage(this.state.user);
  }

  render () {
    return (
      <div className="container">
        <Jumbotron>
          <FormGroup>
            <ControlLabel>New Message:</ControlLabel>
              <FormControl id='message:' type='text' onChange={this.onChange.bind(this)} placeholder='Username' />
            <Button onClick={this.onSubmit.bind(this)} type='submit'>Submit</Button>
          </FormGroup>
        </Jumbotron>
      </div>
    )
  }
}
export default Channel;