import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  return (
    <li>
      <Card className='expense-item'>
        <ExpenseDate date={props.date} />
        <div className='expense-item__description'>
          <h2>{props.title}</h2>
          <div className='expense-item__price'>Harga = ${props.amount}</div>
          <div className='expense-item__price'>Total = {props.total}</div>
          <div className='expense-item__price'>Gambar = {props.file}</div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
