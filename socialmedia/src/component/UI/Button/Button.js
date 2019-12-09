import React from 'react';

import classes from './button.css';

const button = (props) => (
    <input
        className={classes.input}
        type='submit'
        value={props.value}
        onClick={props.clicked} />
);

export default button;