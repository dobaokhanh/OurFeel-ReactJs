import React from 'react';

import classes from './input.module.css';

const input = (props) => (
    <input 
        className={classes.input}
        {...props.inputConfig}
        value={props.value}
        onChange={props.changed} />
);

export default input;