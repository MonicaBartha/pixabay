import React from 'react';

const Error = ({message}) => {
    return (
        <p className="my-3 p4 text-center alert alert-primary"> {message} </p>
    )
}

export default Error;
