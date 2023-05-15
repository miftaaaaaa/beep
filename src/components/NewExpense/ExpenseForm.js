import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const [enteredTotal, setEnteredTotal] = useState('');
  const [enteredFile, setEnteredFile] = useState('');
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
    enteredTotal:'',
    enteredFile:'',
  });

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
    setUserInput({
      ...userInput,
      enteredTitle: event.target.value,
    });
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    setUserInput({
      ...userInput,
      enteredAmount: event.target.value,
    });
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    setUserInput({
      ...userInput,
      enteredDate: event.target.value,
    });
  };

  const totalChangeHandler = (event) => {
    setEnteredTotal(event.target.value);
    setUserInput({
      ...userInput,
      enteredTotal: event.target.value,
    });
  };

  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    setEnteredFile(e.target.value);
    setUserInput({
      ...userInput,
      enteredTotal: e.target.value,
    });
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    // 👇 Uploading the file using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
      total: enteredTotal,
      file: enteredFile,
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
    setEnteredTotal('');
    setEnteredFile('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>jumlah</label>
          <input
            type='text'
            value={enteredTotal}
            onChange={totalChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Upload</label>
          <input type="file" onChange={handleFileChange} />
          <div>{file && `${file.name} - ${file.type}`}</div>
          <button onClick={handleUploadClick}>Upload</button>
        </div>
      </div>
      
      <div className='new-expense__actions'>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Tambah Data</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
