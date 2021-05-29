import React from 'react'

import styles from './AddDelegates.css'
import { Button } from '@material-ui/core';

function AddDelegate(props) {
  return (
    <div className='blocks'>        
        <form>
        <p>Enter name of the co-operative farm</p>
        <input
          type="text"
        />
         <p>Enter Wallet Address:</p>
        <input
          type="text"
        />
        <button className='button'>Submit</button>
      </form>
    </div>
  )
}

export default AddDelegate