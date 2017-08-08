import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FieldGroup, FormGroup, ControlLabel, Jumbotron } from 'react-bootstrap';

/**
 * Class representing the React Channel Component.
 * @extends Channel
 */
 
class ChannelList extends React.Component {
  constructor(props) {
    super(props)
    this.state({
      message: '',
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

    var messages = this.props.messages.map((message, i) => { 
      return <ChannelListEntry message={message} key={i} />
    });

    return (
      <div className="container">
        <Jumbotron>
          {messages}
        </Jumbotron>
      </div>
    )
  }
}
export default ChannelList;