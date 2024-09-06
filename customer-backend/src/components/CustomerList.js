// import React, { Component } from 'react';
// import ReactPaginate from 'react-paginate';
// import CustomerForm from './CustomerForm';
// import { MdDeleteOutline } from "react-icons/md";
// import { CiEdit } from "react-icons/ci";
// import { IoMdPersonAdd } from "react-icons/io";
// import '../styles.css';

// class CustomerList extends Component {
//   state = {
//     customers: [],
//     totalPages: 0,
//     currentPage: 0,
//     editingCustomer: null,
//     showForm: false
//   };

//   componentDidMount() {
//     this.fetchCustomers(0); // Fetch the first page
//   }

//   fetchCustomers = async (page) => {
//     const limit = 5;
//     const offset = page * limit;

//     try {
//       const response = await fetch(`http://localhost:5000/customers?limit=${limit}&offset=${offset}`);
//       const data = await response.json();
//       if (response.ok) {
//         this.setState({
//           customers: data.customers,
//           totalPages: data.totalPages,
//           currentPage: page
//         });
//       } else {
//         console.error('Error fetching customers:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//     }
//   };

//   handlePageClick = (event) => {
//     const selectedPage = event.selected;
//     this.fetchCustomers(selectedPage);
//   };

//   handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this customer?')) {
//       try {
//         const response = await fetch(`http://localhost:5000/customers/${id}`, {
//           method: 'DELETE'
//         });
//         if (response.ok) {
//           this.fetchCustomers(this.state.currentPage);
//         } else {
//           console.error('Error deleting customer');
//         }
//       } catch (error) {
//         console.error('Error deleting customer:', error);
//       }
//     }
//   };

//   handleEdit = (customer) => {
//     this.setState({ editingCustomer: customer, showForm: true });
//   };

//   handleFormSubmit = () => {
//     this.setState({ showForm: false, editingCustomer: null });
//     this.fetchCustomers(this.state.currentPage);
//   };

//   render() {
//     const { customers, totalPages, currentPage, showForm, editingCustomer } = this.state;

//     return (
//       <div>
//         <div className='customer-list-container'>
//           <h1>Customer List</h1>
//           <button className="button-success" onClick={() => this.setState({ showForm: true })}>
//             Add Customer <IoMdPersonAdd />
//           </button>
//         </div>
//         {showForm && (
//           <CustomerForm
//             customer={editingCustomer}
//             onSubmit={this.handleFormSubmit}
//           />
//         )}

//         {customers.length === 0 ? (
//           <div className="empty-state">No customers available</div>
//         ) : (
//           <ul className="customer-list">
//             {customers.map(customer => (
//               <li key={customer.id}>
//                 <span className='item-name-margin'>{customer.firstName}</span>
//                 <span className='item-name-margin'>{customer.lastName}</span>
//                 <span className='item-name-margin'>{customer.email}</span>
//                 <div>
//                   <button className="button-primary" onClick={() => this.handleEdit(customer)}>
//                     Edit <CiEdit />
//                   </button>
//                   <button className="button-danger" onClick={() => this.handleDelete(customer.id)}>
//                     Delete <MdDeleteOutline />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}

//         <ReactPaginate
//           previousLabel={"← Previous"}
//           nextLabel={"Next →"}
//           pageCount={totalPages}
//           onPageChange={this.handlePageClick}
//           containerClassName={"pagination"}
//           activeClassName={"active"}
//         />
//       </div>
//     );
//   }
// }

// export default CustomerList;

import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import CustomerForm from './CustomerForm';
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import '../styles.css';

class CustomerList extends Component {
  state = {
    customers: [],
    totalPages: 0,
    currentPage: 0,
    editingCustomer: null,
    showForm: false,
    searchTerm: ''
  };

  componentDidMount() {
    this.fetchCustomers(0); // Fetch the first page
  }

  fetchCustomers = async (page) => {
    const limit = 5;
    const offset = page * limit;

    try {
      const response = await fetch(`http://localhost:5000/customers?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      if (response.ok) {
        this.setState({
          customers: data.customers,
          totalPages: data.totalPages,
          currentPage: page
        });
      } else {
        console.error('Error fetching customers:', data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  handlePageClick = (event) => {
    const selectedPage = event.selected;
    this.fetchCustomers(selectedPage);
  };

  handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const response = await fetch(`http://localhost:5000/customers/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          this.fetchCustomers(this.state.currentPage);
        } else {
          console.error('Error deleting customer');
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  handleEdit = (customer) => {
    this.setState({ editingCustomer: customer, showForm: true });
  };

  handleFormSubmit = () => {
    this.setState({ showForm: false, editingCustomer: null });
    this.fetchCustomers(this.state.currentPage);
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  filterCustomers = () => {
    const { customers, searchTerm } = this.state;
    return customers.filter(customer =>
      `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  render() {
    const { totalPages, currentPage, showForm, editingCustomer, searchTerm } = this.state;
    const filteredCustomers = this.filterCustomers();

    return (
      <div>
        <div className='customer-list-container'>
          {/* <h1>Customer List</h1> */}
          <button className="button-success" onClick={() => this.setState({ showForm: true })}>
            Add Customer <IoMdPersonAdd />
          </button>
          <input
            type="text"
            className="search-bar"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={this.handleSearch}
          />
        </div>
        {showForm && (
          <CustomerForm
            customer={editingCustomer}
            onSubmit={this.handleFormSubmit}
          />
        )}

        {filteredCustomers.length === 0 ? (
          <div className="empty-state">No customers available</div>
        ) : (
          <ul className="customer-list">
            {filteredCustomers.map(customer => (
              <li key={customer.id}>
                <span className='item-name-margin'>{customer.firstName}</span>
                <span className='item-name-margin'>{customer.lastName}</span>
                <span className='item-name-margin'>{customer.email}</span>
                <div>
                  <button className="button-primary" onClick={() => this.handleEdit(customer)}>
                    Edit <CiEdit />
                  </button>
                  <button className="button-danger" onClick={() => this.handleDelete(customer.id)}>
                    Delete <MdDeleteOutline />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={totalPages}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default CustomerList;
