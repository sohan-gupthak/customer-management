import React, { Component } from 'react';
import '../styles.css';

class CustomerForm extends Component {
  state = {
    id: null,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.customer) {
      const { id, firstName, lastName, phone, email, address } = this.props.customer;
      this.setState({ id, firstName, lastName, phone, email, address });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    const { firstName, lastName, phone, email } = this.state;
    const errors = {};

    if (!/^[a-zA-Z]+$/.test(firstName)) {
      errors.firstName = '* First name must contain only letters';
    }
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      errors.lastName = '* Last name must contain only letters';
    }
    if (!/^\d{10}$/.test(phone)) {
      errors.phone = '* Phone number must be exactly 10 digits';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '* Email must be a valid email address';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!this.validate()) return;

    const { id, firstName, lastName, phone, email, address } = this.state;
    const { onSubmit } = this.props;

    const url = id ? `http://localhost:5000/customers/${id}` : 'http://localhost:5000/customers';
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, phone, email, address })
      });
      const data = await response.json();
      if (response.ok) {
        onSubmit();
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const { firstName, lastName, phone, email, address, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="customer-form">
        <h1>{this.state.id ? 'Update' : 'Add'} Customer</h1>
        <div className="form-group">
          <label className='label-name'>First Name:</label>
          <input
            type="text"
            name="firstName"
            className='input-field'
            value={firstName}
            onChange={this.handleChange}
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>
        <div className="form-group">
          <label className='label-name'>Last Name:</label>
          <input
            type="text"
            name="lastName"
            className='input-field'
            value={lastName}
            onChange={this.handleChange}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>
        <div className="form-group">
          <label className='label-name'>Phone:</label>
          <input
            type="text"
            name="phone"
            className='input-field'
            value={phone}
            onChange={this.handleChange}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label className='label-name'>Email:</label>
          <input
            type="text"
            name="email"
            className='input-field'
            value={email}
            onChange={this.handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label className='label-name'>Address:</label>
          <input
            type="text"
            name="address"
            className='input-field'
            value={address}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    );
  }
}

export default CustomerForm;
