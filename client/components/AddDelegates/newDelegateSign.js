import React from 'react'

import styles from './AddDelegates.css'
import { Button } from '@material-ui/core';
import sign from './iconmonstr-plus-2.svg'

function newDelegate(props) {
  return (
    <div className='blocks'>        
       <h1>Add a delagate</h1>
       <img src={sign}></img>
    </div>
  )
}

export default newDelegate