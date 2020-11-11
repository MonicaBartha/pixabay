import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Form = ( {setSearch} ) => {

    const [ item, setItem ] = useState('');
    const [ error, setError ] = useState(false);

    const searchImage = e => {
        e.preventDefault();

        // validate form
        if(item.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        // send search item to app.js
        setSearch(item);
    }

    return (
        <form
            onSubmit={searchImage}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Example: landscape, people, coffee"
                        onChange={ e => setItem(e.target.value) }
                    />
                </div>

                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Search"
                    />
                </div>
            </div>
            { error ? <Error message="Add a search item" /> : null} 
        </form>
    )
}

Form.propTypes = {
    setSearch: PropTypes.func.isRequired
}
export default Form;
