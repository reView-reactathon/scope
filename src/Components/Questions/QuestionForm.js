import React from 'react';

// Language
const languages =  [
  'Javascript',
  'Java',
  'PHP',
  'Python',
  'Objective-C',
  'Ruby'
];

class QuestionForm extends React.Component {

  // Create
  constructor(props) {
    super(props);
    this.state = {
      language: languages[0]
    };
  }

  // Handle change
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // Submit
  handleSubmit(event) {
    // Stop the submit
    event.preventDefault();

    // Send data to firebase
    const key = window.firebase.database().ref().child('questions').push().key;
    window.firebase.database().ref().child(`questions/${key}`).set({
      email: this.state.email,
      language: this.state.language,
      title: this.state.title,
      body: this.state.body
    });
  }

  // Render
  render() {
    const options = languages.map((key) => <option value={key}>{key}</option>)
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <fieldset>
          <label>Email</label>
          <input type="email"
            name="email"
            value={this.state.email}
            onChange={(event) => this.handleChange(event)} />
        </fieldset>
        <fieldset>
          <select
            name="language"
            value={this.state.language}
            onChange={(event) => this.handleChange(event)}>{options}
          </select>
        </fieldset>
        <fieldset>
          <label>Question Title</label>
          <input type="text"
            name="title"
            value={this.state.title}
            onChange={(event) => this.handleChange(event)} />
        </fieldset>
        <fieldset>
          <label>Question Body</label>
          <textarea
            name="body"
            value={this.state.body}
            onChange={(event) => this.handleChange(event)} />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default QuestionForm;